-- init.sql

-- This script will now INSERT the admin user if they don't exist,
-- or UPDATE their password if they already exist.
-- NOTE: This requires a UNIQUE constraint on the 'email' column in your 'users' table.

INSERT INTO users (email, password_hash, first_name, last_name, role)
VALUES (
    'admin@teresol.com', 
    '$2b$10$jABjl3f2.x42b5Nfh7jVxeqdrb6GQiMzj62w41MZUnt..YcLhEpm.',
    'Admin',
    'User',
    'admin'
)
ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash);

