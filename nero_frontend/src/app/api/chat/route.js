import ModelClient, { isUnexpected } from "@azure-rest/ai.interface"
import { AzureKeyCredential } from "@azure/core-auth"

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/interface";
const model = "deepseek/DeepSeek-V3-0324";
export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const client = ModelClient(endpoint, new AzureKeyCredential(token));
        const response = await client.path("/chat/completions").post({
            body: {
                message: [
                    { role: "system", content: "You are a helpful assistant" },
                    { role: "user", content: prompt }
                ],
                temperature: 0.8,
                top_p: 0.1,
                max_tokens: 2048,
                model
            }
        })
        if (isUnexpected(response)) {
            return new Response(
                JSON.stringify({ error: response.body.error }), { status: 500 }
            )
        }
        return new Response(
            JSON.stringify({ reply: response.body.choices[0].message.content }), { status: 200 }
        )
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }), { status: 500 }
        )
    }
}