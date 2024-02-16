const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});