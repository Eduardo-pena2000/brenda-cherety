CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  password    TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  role        TEXT    NOT NULL DEFAULT 'student' CHECK(role IN ('student','admin')),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS courses (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT    NOT NULL,
  slug          TEXT    NOT NULL UNIQUE,
  description   TEXT    NOT NULL DEFAULT '',
  price_cents   INTEGER NOT NULL,
  currency      TEXT    NOT NULL DEFAULT 'usd',
  thumbnail     TEXT,
  is_published  INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lessons (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title       TEXT    NOT NULL,
  description TEXT    NOT NULL DEFAULT '',
  video_path  TEXT,
  file_path   TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  duration    INTEGER,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS purchases (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id               INTEGER NOT NULL REFERENCES users(id),
  course_id             INTEGER NOT NULL REFERENCES courses(id),
  stripe_session_id     TEXT,
  stripe_payment_intent TEXT,
  amount_cents          INTEGER NOT NULL,
  status                TEXT    NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','completed','refunded')),
  created_at            TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_purchases_user   ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_course ON purchases(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course   ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug     ON courses(slug);
