const app = require("./src/app");
const { connectDb } = require("./src/config/db");
const { serverPort } = require("./src/secret");

app.listen(serverPort, async() => {
    console.log(`Listening to port ${serverPort}`);
    await connectDb()
})