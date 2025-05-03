import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI not set in .env.local');

  try {
    await mongoose.connect(mongoUri, {
      dbName: 'aktudb',
      serverSelectionTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      console.log('✅ MongoDB connected and ready');
    } else {
      throw new Error('MongoDB connection not in ready state');
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

export default connectDB;
