// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is in your .env file
// });

// export const describeItem = async (req, res) => {
//   const { imageUrl } = req.body; // Expect an image URL from the frontend

//   if (!imageUrl) {
//     return res.status(400).json({
//       ok: false,
//       status: 400,
//       message: "Image URL is required"
//     });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: "Identify this item and provide a short title and a concise description for a lost and found post. Return JSON format with keys: 'title' and 'description'." },
//             {
//               type: "image_url",
//               image_url: {
//                 "url": imageUrl,
//               },
//             },
//           ],
//         },
//       ],
//       max_tokens: 300,
//     });

//     // for testing 
//     console.log(response);

//     const content = response.choices[0].message.content;
//     // You might need to parse 'content' if the AI returns a stringified JSON

//     res.status(200).json({
//       ok: true,
//       status: 200,
//       message: "Description generated successfully",
//       data: content
//     });

//   } catch (error) {
//     console.error("AI Error:", error);

//     if (error.status === 429 || error.code === 'insufficient_quota') {
//       return res.status(429).json({
//         ok: false,
//         status: 429,
//         message: "AI Service Quota Exceeded. Please check billing or try again later."
//       });
//     }

//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: "Failed to generate description. Please try again."
//     });
//   }
// };


import { Groq } from 'groq-sdk';
import dotenv from "dotenv";
dotenv.config();

// Initialize Groq with the API Key from .env file
// The Groq() constructor will automatically look for the GROQ_API_KEY environment variable.
const groq = new Groq();

// You would need to add a 'textDescription' field to your request body 
// since Groq's currently available models cannot process 'imageUrl'.

export const describeItem = async (req, res) => {
  const { imageUrl } = req.body; // Expect a text description from the frontend

  if (!imageUrl) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Image URL is required for Groq's text-only model."
    });
  }

  try {
    const prompt = `Identify this item and provide a short title and a concise description for a lost and found post. Return JSON format with keys: 'title' and 'description'`;

    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct", // Using a vision-supported model
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            },
            {
              "type": "image_url",
              "image_url": {
                "url": imageUrl
              }
            }
          ]
        }
      ]
    });
    const content = response.choices[0].message.content;
    // Attempt to parse the content if it's a stringified JSON
    let parsedData;
    try {
      parsedData = JSON.parse(content);
    } catch (e) {
      // If parsing fails, just send the raw content back
      parsedData = content;
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Description generated successfully",
      data: parsedData
    });

  } catch (error) {
    console.error("AI Error:", error);

    // Groq error handling often involves checking the message or status
    if (error.status === 429) {
      return res.status(429).json({
        ok: false,
        status: 429,
        message: "AI Service Rate Limit Exceeded. Please check your usage or try again later."
      });
    }

    res.status(500).json({
      ok: false,
      status: 500,
      message: "Failed to generate description. Please try again."
    });
  }
};