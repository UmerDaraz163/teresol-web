// lib/db.ts

import mysql from 'mysql2/promise';

// Create a connection pool. This is more efficient than creating a new
// connection for every request. The pool manages multiple connections.
const pool = mysql.createPool(process.env.DATABASE_URL!);

// Export the pool so you can use it in your server actions and API routes.
export default pool;
