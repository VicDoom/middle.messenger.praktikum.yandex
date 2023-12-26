const express = require("express");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
