import mongoose from 'mongoose';

describe('MongoDB Connection', () => {
  it('should connect to MongoDB', async () => {
    await expect(mongoose.connect(process.env.MONGO_URI)).resolves.not.toThrow();
    await mongoose.disconnect();
  });
});