import bcrypt from 'bcrypt';
import db from './database.js';

const adminEmail = 'admin@brenda.com';
const adminPassword = 'admin123';
const adminName = 'Administrador';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);

if (existing) {
  console.log('El usuario admin ya existe.');
} else {
  const hash = await bcrypt.hash(adminPassword, 10);
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
    adminEmail, hash, adminName, 'admin'
  );
  console.log('Usuario admin creado:');
  console.log(`  Email: ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
}

console.log('Base de datos lista.');

// --- Provisional Course: Alimentación Consciente ---
const courseSlug = 'alimentacion-consciente';
const existingCourse = db.prepare('SELECT id FROM courses WHERE slug = ?').get(courseSlug);

if (existingCourse) {
  console.log(`Curso "${courseSlug}" ya existe (id: ${existingCourse.id}).`);
} else {
  const result = db.prepare(
    `INSERT INTO courses (title, slug, description, price_cents, currency, is_published)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    'Alimentación Consciente',
    courseSlug,
    'Aprende a escuchar tu cuerpo, nutrir tu mente y transformar tu relación con la comida. Un programa completo basado en ciencia y amor propio.',
    49900,
    'mxn',
    1
  );
  const courseId = result.lastInsertRowid;

  const lessons = [
    {
      title: 'Introducción a la Alimentación Consciente',
      description: 'Descubre qué es la alimentación consciente, por qué las dietas restrictivas fallan y cómo este enfoque puede cambiar tu vida para siempre.',
      sort_order: 1
    },
    {
      title: 'Escucha las Señales de tu Cuerpo',
      description: 'Aprende a distinguir el hambre real del hambre emocional. Ejercicios prácticos para reconectar con las señales de saciedad.',
      sort_order: 2
    },
    {
      title: 'Plan Semanal Sin Restricciones',
      description: 'Diseña tu plan alimenticio personalizado sin contar calorías. Incluye lista de compras y recetas fáciles para toda la semana.',
      sort_order: 3
    }
  ];

  const insertLesson = db.prepare(
    `INSERT INTO lessons (course_id, title, description, sort_order)
     VALUES (?, ?, ?, ?)`
  );

  for (const lesson of lessons) {
    insertLesson.run(courseId, lesson.title, lesson.description, lesson.sort_order);
  }

  console.log(`Curso "${courseSlug}" creado con ${lessons.length} lecciones (id: ${courseId}).`);
}
