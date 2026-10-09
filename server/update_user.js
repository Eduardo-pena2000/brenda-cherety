import db from './db/database.js';
import bcrypt from 'bcrypt';

async function run() {
  const email = 'Brendacheretynutricion@gmail.com';
  let user = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(email);
  
  if (!user) {
    console.log('User not found. Creating user...');
    const hash = await bcrypt.hash('password123', 10);
    const result = db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(email, hash, 'Brenda Cherety', 'student');
    user = { id: result.lastInsertRowid };
    console.log('User created with ID:', user.id);
  } else {
    console.log('User found with ID:', user.id);
  }

  // Find old purchases
  const purchases = db.prepare('SELECT * FROM purchases WHERE user_id = ?').all(user.id);
  console.log('Existing purchases:', purchases);

  // Delete old purchases
  const deleteResult = db.prepare('DELETE FROM purchases WHERE user_id = ?').run(user.id);
  console.log('Deleted purchases:', deleteResult.changes);

  // Get new course
  const newCourse = db.prepare('SELECT * FROM courses ORDER BY id DESC LIMIT 1').get();
  if (newCourse) {
    console.log('Giving new course:', newCourse.title, 'ID:', newCourse.id);
    db.prepare('INSERT INTO purchases (user_id, course_id, amount_cents, status) VALUES (?, ?, ?, ?)').run(user.id, newCourse.id, 0, 'completed');
    console.log('Granted new course successfully.');
  } else {
    console.log('No courses found!');
  }
}

run().catch(console.error);
