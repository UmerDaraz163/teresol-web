// lib/db.ts

import mysql from 'mysql2/promise';

// This prevents TypeScript errors if 'global.mysqlPool' is used
declare global {
  var mysqlPool: mysql.Pool | undefined;
}

/**
 * Singleton pattern for the MySQL connection pool.
 * This ensures only one pool is created and reused across the application,
 * which is crucial for performance and stability in a serverless environment.
 */
if (!global.mysqlPool) {
  try {
    global.mysqlPool = mysql.createPool(process.env.DATABASE_URL!);
    console.log("MySQL connection pool created successfully.");
  } catch (error) {
    console.error("Failed to create MySQL connection pool:", error);
    // Throw an error to prevent the application from starting in a broken state.
    throw new Error('Failed to initialize database connection pool.');
  }
}

const pool = global.mysqlPool;

// This final check ensures we never export an undefined pool and satisfies TypeScript.
if (!pool) {
  throw new Error('Database connection pool is not available.');
}

export default pool;
