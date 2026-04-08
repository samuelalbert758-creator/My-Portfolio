import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ Improved prompt for clean formatting
    const prompt = `
Format your response clearly:
- Use emojis sometimes for user friendly
- Use emojis inline with text not on another paragraph
- Use proper spacing
- Use markdown when needed
- Format code blocks properly
- Write text inline and use paragraphs when needed

User: ${message}
`;

    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { text: "Please check your internet connection." },
      { status: 500 }
    );
  }
}