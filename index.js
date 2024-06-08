const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import routers
const router = require('./routes')

const app = express();

//use cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3000;

//route
app.get("/", (req, res) => {
    res.send("Apa kabarmu");
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
