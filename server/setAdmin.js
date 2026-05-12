const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'factsstar@gmail.com';
    const password = '123456';

    let admin = await User.findOne({ email });

    if (admin) {
      admin.password = password;
      admin.role = 'Admin';
      await admin.save();
      console.log('✅ Admin user updated successfully');
    } else {
      admin = new User({
        name: 'TaskPilot Admin',
        email,
        password,
        role: 'Admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

createAdmin();
