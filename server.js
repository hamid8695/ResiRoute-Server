const app = require("./src/app");
const { serverPort } = require("./src/secret");

app.listen(serverPort, async() => {
    console.log(`Listening to port ${serverPort}`);
})