const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./client/src/pool');
const usersRouter = require('./client/src/utils/routes/user-routes');
const stocksRouter = require('./client/src/utils/routes/stocks-routes');

app.use(express.json());
app.use(usersRouter);
app.use(stocksRouter);

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use("/trade", express.static(path.join(__dirname, "client/build")));
app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

pool.connect({
    host: 'localhost', 
    port: 5432, 
    database: 'fantasy_stocks', 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port: ${port}.`);
        });
    })
    .catch(err => {
        console.error(err)
});



