const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { compileAndRunMove } = require("./move_executor");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/compile", async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    try {
        const result = await compileAndRunMove(code);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
