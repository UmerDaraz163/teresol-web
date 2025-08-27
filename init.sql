-- init.sql

-- This script will run after the database schema is created.
-- It updates the password hash for the default admin user.
UPDATE users 
SET password_hash = '$2b$10$jABjl3f2.x42b5Nfh7jVxeqdrb6GQiMzj62w41MZUnt..YcLhEpm.' 
WHERE email = 'admin@teresol.com';

