import express from "express";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from Gemini Image Generation Routes."});
})

// ... (Text-to-image API client library initialization)

router.route("/").post(async (req, res) => {
  try {
    const prompt = req.body.prompt;

  // Use Gemini to generate creative text
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const final = response.text();

    // const image = response.data;

    console.log(final);

    res.status(200).json({ photo: final });

  // Return the generated image in the response
  res.send(final);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" })
  }
});

export default router


// import express from "express";
// import * as dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

// dotenv.config();

// const router = express.Router();

// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Hello from Gemini Image Generation Routes" });
// });

// router.route("/").post(async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const apiKey = process.env.GEMINI_API_KEY;
//         const apiUrl = "https://gemini.pm/gemini/";

//         const payload = {
//             prompt,
//             n: 1,
//             width: 1024,
//             height: 1024,
//         };

//         const headers = {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${apiKey}`,
//         };

//         const response = await axios.post(apiUrl, payload, { headers });
//         const imageData = response.data.output[0];

//         res.status(200).json({ photo: imageData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong!" });
//     }
// });

// export default router;