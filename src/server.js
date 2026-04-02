const path = require("path");
const dotenv = require("dotenv");

// dotenv.config({path: path.resolve(__dirname, "../.env")})
dotenv.config();

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();

        app.listen(PORT, ()=>{
            console.log("Server is running...");
        });
    } catch(error){
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
};

startServer();