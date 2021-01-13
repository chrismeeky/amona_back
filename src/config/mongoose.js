const mongoose = require("mongoose");
const connectDatabaase = async () => {
  try {
    const connected = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connected) {
      console.log("connection has been established");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabaase();
