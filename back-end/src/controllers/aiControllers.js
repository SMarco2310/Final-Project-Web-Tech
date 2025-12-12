// // back-end/src/controllers/aiControllers.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // Helper function to convert URL to GoogleGenerativeAI Part object
// async function urlToGenerativePart(url) {
//   try {
//     const response = await axios.get(url, { responseType: "arraybuffer" });
//     return {
//       inlineData: {
//         data: Buffer.from(response.data).toString("base64"),
//         mimeType: response.headers["content-type"] || "image/jpeg",
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching image for AI:", error.message);
//     throw new Error("Failed to process image for AI analysis");
//   }
// }

// export const describeItem = async (req, res) => {
//   const { imageUrl } = req.body;

//   if (!imageUrl) {
//     return res.status(400).json({ 
//       ok: false, 
//       status:400,
//       message: "Image URL is required" 
//     });
//   }

//   try {
//     // 1. Prepare the model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // 2. Prepare the prompt and image
//     const prompt = "Analyze this image of a lost/found item. Provide a JSON response with two fields: 'name' (a short, concise title, e.g., 'Blue Jansport Backpack') and 'description' (a helpful 2-sentence description noting color, brand, and condition). Do not include markdown formatting like ```json.";
//     const imagePart = await urlToGenerativePart(imageUrl);

//     // 3. Generate content
//     const result = await model.generateContent([prompt, imagePart]);
//     const response = await result.response;
//     const text = response.text();

//     // 4. Parse the result (Gemini usually returns text, we try to parse it as JSON)
//     let parsedResult;
//     try {
//         // Clean up markdown code blocks if present
//         const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
//         parsedResult = JSON.parse(cleanText);
//     } catch (e) {
//         // Fallback if AI didn't return valid JSON
//         parsedResult = {
//             name: "Item",
//             description: text
//         };
//     }

//     res.status(200).json({
//       ok: true,
//       data: parsedResult,
//       status: 200,
//       message: "Description generated successfully"
//     });

//   } catch (error) {
//     console.error("AI Controller Error:", error);
//     res.status(500).json({ 
//       ok: false, 
//       status: 500,
//       message: "Failed to generate description. Please try again." 
//     });
//   }
// };

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is in your .env file
});

export const describeItem = async (req, res) => {
  const { imageUrl } = req.body; // Expect an image URL from the frontend

  if (!imageUrl) {
    return res.status(400).json({ 
      ok: false, 
      status: 400,
      message: "Image URL is required" 
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview" || "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Identify this item and provide a short title and a concise description for a lost and found post. Return JSON format with keys: 'title' and 'description'." },
            {
              type: "image_url",
              image_url: {
                "url": imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    // for testing 
    console.log(response);

    const content = response.choices[0].message.content;
    // You might need to parse 'content' if the AI returns a stringified JSON
    
    res.status(200).json({ 
      ok: true, 
      status: 200,
      message: "Description generated successfully",
      data: content 
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ 
      ok: false, 
      status: 500,
      message: "Failed to generate description. Please try again." 
    });
  }
};