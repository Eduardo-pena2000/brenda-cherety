import db from './database.js';

const KNOWN_STREAM_MAP = [
  {
    matchTitle: 'ingredientes',
    matchVideo: 'video 01',
    uid: '009c6ff9ef3930091edcc3c78bf344c1',
    customerCode: 'zerkefquutt3frbz',
    duration: 2
  },
  {
    matchTitle: 'porciones',
    matchVideo: 'video 02',
    uid: '52cc6f24121361675bda2935a7019b15',
    customerCode: 'zerkefquutt3frbz',
    duration: 6
  },
  {
    matchTitle: 'edulcorantes',
    matchVideo: 'video 03',
    uid: '47b495b09dbfe51a27aa05192c571f00',
    customerCode: 'zerkefquutt3frbz',
    duration: 3
  },
  {
    matchTitle: 'aditivos',
    matchVideo: 'video 04',
    uid: 'f37155d234e66b9527b1743de1f59260',
    customerCode: 'zerkefquutt3frbz',
    duration: 2
  },
  {
    matchTitle: 'engañan',
    matchVideo: 'video 05',
    uid: '390d5c3b993d02552268aa331b90cac0',
    customerCode: 'zerkefquutt3frbz',
    duration: 3
  }
];

export function runStreamMigration() {
  try {
    const lessons = db.prepare('SELECT id, title, video_path, duration FROM lessons').all();
    let migratedCount = 0;

    for (const lesson of lessons) {
      let currentPath = lesson.video_path || '';
      let shouldUpdate = false;
      let newPath = currentPath;
      let newDuration = lesson.duration;

      // 1. Limpiar ?tusv2=true si existiera
      if (newPath.includes('?tusv2=true')) {
        newPath = newPath.replace('?tusv2=true', '');
        shouldUpdate = true;
      }

      // 2. Si todavía es una ruta de archivo local/R2, mapear a Cloudflare Stream
      const titleLower = (lesson.title || '').toLowerCase();
      const pathLower = currentPath.toLowerCase();

      for (const item of KNOWN_STREAM_MAP) {
        if (
          !newPath.startsWith('cf_stream:') &&
          (titleLower.includes(item.matchTitle) || pathLower.includes(item.matchVideo))
        ) {
          newPath = `cf_stream:${item.uid}:${item.customerCode}`;
          if (!newDuration) newDuration = item.duration;
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate && newPath !== currentPath) {
        db.prepare('UPDATE lessons SET video_path = ?, duration = COALESCE(?, duration) WHERE id = ?').run(
          newPath,
          newDuration,
          lesson.id
        );
        migratedCount++;
        console.log(`[Stream Migration] Lección ${lesson.id} (${lesson.title}) actualizada a: ${newPath}`);
      }
    }

    if (migratedCount > 0) {
      console.log(`[Stream Migration] Se actualizaron exitosamente ${migratedCount} lecciones a Cloudflare Stream.`);
    } else {
      console.log('[Stream Migration] Todas las lecciones ya se encuentran en Cloudflare Stream.');
    }

    return { success: true, migratedCount };
  } catch (error) {
    console.error('[Stream Migration] Error ejecutando migración:', error);
    return { success: false, error: error.message };
  }
}

