const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./client/src/pool');
const jwt = require('jsonwebtoken');



app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use("/trade", express.static(path.join(__dirname, "client/build")));
app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

const stocks = [];

app.get("/api/search/:symbol", (req, res) =>{
    const symbol = req.params.symbol;
    const token = process.env.TEST_TOKEN;
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${token}`)
        .then((response) => {
            res.send(response.data);
        console.log(response.data)

        })
        .catch(error => {
            console.log(error)
        })
});

app.post("/api/stocks", (req, res) =>{
    res.send(req.body);
    console.log(req.body);
    stocks.push(req.body);
    console.log(stocks);
});

app.get("/api/stocks", (req, res) =>{ //send client the stocks array
    res.send(stocks)
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = { name: username}
    const accessToken = await jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '1h'});
    // res.json({ accessToken: accessToken})

    if (username && password) { //using test db - change for production!
        const { rows } = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username])
        if(rows[0].password === password){
            // res.send(accessToken)
            // console.log(rows + res.json({accessToken : accessToken}));
            // console.log(rows[0].password)
            res.json({accessToken: accessToken})
        } else {
            // res.status(404);

            // res.send('Username or Password Does Not Match', 404);
            res.send('Username or Password Does Not Match');
        }
    }
    
});

// app.post('/api/token', async (req, res) => {
//     const username = req.body.username;
//     const user = { name: username };
//     const accessToken = await jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '1h'});
//     res.json({ accessToken: accessToken})
// })

app.post("/api/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { rows } = await pool.query(`
            INSERT INTO test_users (username, password)
            VALUES
                ($1, $2)
                RETURNING *;
        `, [username, password])
            res.send(rows);
    } catch (error) {
        res.send(error)
    }
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



