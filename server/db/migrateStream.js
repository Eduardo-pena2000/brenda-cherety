import db from './database.js';

export function runStreamMigration() {
  try {
    const lessons = db.prepare('SELECT id, title, video_path FROM lessons').all();
    let migratedCount = 0;

    for (const lesson of lessons) {
      const currentPath = lesson.video_path || '';
      if (currentPath.includes('?tusv2=true')) {
        const newPath = currentPath.replace('?tusv2=true', '');
        db.prepare('UPDATE lessons SET video_path = ? WHERE id = ?').run(newPath, lesson.id);
        migratedCount++;
        console.log(`[Stream Migration] Lección ${lesson.id} (${lesson.title}) limpiada.`);
      }
    }

    if (migratedCount > 0) {
      console.log(`[Stream Migration] Se actualizaron ${migratedCount} lecciones.`);
    }

    return { success: true, migratedCount };
  } catch (error) {
    console.error('[Stream Migration] Error ejecutando migración:', error);
    return { success: false, error: error.message };
  }
}
