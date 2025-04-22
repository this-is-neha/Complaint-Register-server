const http = require("http");
const app = require("./src/config/express.config");

const port = process.env.PORT || 9006;  // Use the port from the environment variable or fallback to 9006
const server = http.createServer(app);

server.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running successfully on port ${port}`);
        console.log("Press CTRL C to disconnect");
    }
});
