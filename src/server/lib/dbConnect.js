import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  if (!process.browser) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

if (!mongoose.models) {
  mongoose.models = {};
}

async function dbConnect() {
  if (cached.conn) {
    // console.log('inside cached.conn.models: ', cached.conn.models)
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: false,
      // useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  // console.log('cached.conn.connection: ', cached.conn.connection);

  return cached.conn;
}

export default dbConnect;
