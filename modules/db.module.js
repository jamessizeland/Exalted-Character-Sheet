const mongoose = require("mongoose");

const connectDB = async (password) => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://logUser:${password}@cluster0.83hmw.mongodb.net/Exalted?retryWrites=true&w=majority`,
      {
        // options object
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
