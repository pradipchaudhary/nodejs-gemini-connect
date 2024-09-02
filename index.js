import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Routes
app.get("/", (req, res) => {
    res.send("Home route...");
});

// Server running on
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
