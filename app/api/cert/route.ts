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

    const result = await model.generateContentStream(message);

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
    return Response.json({ err: "Please check your internet connection." }, { status: 500 });
  }
}
