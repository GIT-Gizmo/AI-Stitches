import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const apiKey = process.env.DEEPAI_API_KEY;

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E Routes"});
})

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // const response = await openai.createImage({
        //     prompt,
        //     n: 1,
        //     size: "1024x1024",
        //     response_format: "b64_json"
        // })

        // const image = response.data[0].b64_json;

        

        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                text: req.body,
            })
        });
    
        const data = await response.json();
        console.log(data);
        const image = data;
        res.status(200).json({ photo: image });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
})

export default router