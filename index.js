import express, { json } from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(json());

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

// Routes
app.get("/", (req, res) => {
    res.send("Home route...");
});

// var question = "what is the value of pie in maths ?";
const generate = async (question) => {
    try {
        const prompt = question;
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        console.log(response.text());
        return response.text();
    } catch (error) {
        console.log("response error", error);
    }
};

app.post("/api/content", async (req, res) => {
    let data = req.body.question;
    console.log(data);
    var result = await generate(data);
    console.log(result);
    res.json({ result: result });
});

// Server running on
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
