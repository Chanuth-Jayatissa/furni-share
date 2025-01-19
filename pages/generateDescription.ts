require("dotenv").config();
import { NextApiRequest, NextApiResponse } from "next";

// Validate API key
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error("GROQ_API_KEY is not defined in the environment!");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;

    // Ensure the request includes the image file data
    if (!formData || !formData.image) {
      return res.status(400).json({ error: "Image file is required." });
    }

    try {
      // Prepare the form data for sending to the Groq API
      const form = new FormData();
      form.append("file", formData.image);

      // Call Groq API for image description
      const response = await fetch(
        "https://api.groq.com/v1-alpha/images:description",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: form, // Send the image file as form data
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Groq API Error: ${errorDetails}`);
      }

      const data = await response.json();

      // Assuming Groq API responds with a "description" field
      const description = data.description;

      return res.status(200).json({ description });
    } catch (error) {
      console.error("Error calling Groq API:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
