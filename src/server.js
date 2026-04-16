const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

// dotenv.config({path: path.resolve(__dirname, "../.env")})
dotenv.config();

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();

        const server = http.createServer(app);

        const io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",") : true,
                credentials: true
            },
            transports: ["websocket", "polling"]
        });

        io.use((socket, next) => {
            try {
                const token =
                    socket.handshake.auth?.token ||
                    socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i, "");

                if (!token) {
                    return next(new Error("Unauthorized"));
                }

                const payload = jwt.verify(token, process.env.JWT_SECRET);
                socket.user = { id: payload.id };
                socket.join(`user:${payload.id}`);
                return next();
            } catch (err) {
                return next(new Error("Unauthorized"));
            }
        });

        io.on("connection", (socket) => {
            socket.emit("connected", { userId: socket.user?.id });
        });

        app.set("io", io);

        server.listen(PORT, ()=>{
            console.log("Server is running...");
        });
    } catch(error){
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
};

startServer();