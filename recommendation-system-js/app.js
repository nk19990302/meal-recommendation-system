const express = require("express");
const { corsOptions } = require("./cors.config");
const app = express();
const cors = require("cors");
const { recommendItems } = require("./model/recommend");

require("dotenv").config();
const port = process.env.PORT;

// apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// attach main routes
app.get("/recommendations", async (req, res) => {
    const keywords = req.query.keywords.split(",");
    const count = req.query.length || 5;
    const recommendations = await recommendItems(keywords, count);
    res.json(recommendations);
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
