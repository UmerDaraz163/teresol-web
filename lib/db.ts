// lib/db.ts
import mysql from "mysql2/promise";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

if (!global.mysqlPool) {
  try {
    const dbUrl = new URL(process.env.DATABASE_URL!);

    // 👇 Switch hostname when running locally
    const host =
      dbUrl.hostname === "db" ? "localhost" : dbUrl.hostname;

    global.mysqlPool = mysql.createPool({
      host,
      port: Number(dbUrl.port),
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.replace("/", ""),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log(`✅ MySQL pool connected to ${host}:${dbUrl.port}`);
  } catch (error) {
    console.error("❌ Failed to create MySQL connection pool:", error);
    throw new Error("Failed to initialize database connection pool.");
  }
}

const pool = global.mysqlPool!;
export default pool;
