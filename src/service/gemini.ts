import { buildSystemPrompt, buildUserPrompt, buildDocsSystemPrompt } from "../prompt";
import type { PlanResquest } from "../@types/type.";
import { GoogleGenAI } from "@google/genai";
import fs from "fs"

const client = new GoogleGenAI(
    {
        apiKey: process.env.GEMINI_API_KEY as string
    }
)
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function* generateDietPlan(data: PlanResquest){
    const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8")

    const stream = await client.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: [buildSystemPrompt(), buildDocsSystemPrompt(diretrizes)] ,
            temperature: 0.6
        },
        contents: buildUserPrompt(data)
    })

    for await(const chunk of stream){
        const delta = chunk.text
        if(delta){
            for (const word of delta.split(" ")) {
                yield word + " ";
                await sleep(30)
            }
        }
    }
}