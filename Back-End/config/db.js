// import mongoose, { connect } from "mongoose";


// export const connectDB = async ()=> {
//     await mongoose.connect('mongodb+srv://akashkumar62061:sky123@cluster0.bvhnq.mongodb.net/Major-Project').then(()=>console.log("DB connected"))
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://akashkumar62061:sky123@cluster0.bvhnq.mongodb.net/Major-Project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};





// Import Mongoose
// import mongoose from "mongoose";

// // Function to connect to the database
// export const connectDB = async () => {
//   try {
//     // Connection string for local MongoDB
//     const mongoURI = 'mongodb://localhost:27017/food-del';

//     // Connect to MongoDB
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // Optional: Additional options
//       // useCreateIndex: true, // Deprecated in Mongoose 6+
//       // useFindAndModify: false, // Deprecated in Mongoose 6+
//     });

//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1); // Exit process with failure
//   }
// };
