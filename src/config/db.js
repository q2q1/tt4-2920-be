const mongoose = require("mongoose");

const connectDB = async () => {

    const mongoUri = "mongodb+srv://renancavalcanti_db_user:mcMhLcYMVzaQZObD@cluster0.msfqe8t.mongodb.net/?appName=Cluster0/tt4-2920";

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully!");

};

module.exports = { connectDB };