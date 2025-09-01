// hash-password.js
import bcrypt from 'bcrypt';

const password = 'Teresol@321';
const saltRounds = 10; // Standard salt rounds

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("Your hashed password is:");
    console.log(hash);
});