import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URI || "";


/**
 * Mongoose mantiene un cache de la conexión para evitar múltiples conexiones
 * durante el desarrollo con hot reload.
 */
let cached =
  global.mongoose ?? (global.mongoose = { conn: null, promise: null });

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
