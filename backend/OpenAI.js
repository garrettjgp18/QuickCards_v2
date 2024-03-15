const OpenAI = require("openai");
const openai = new OpenAI();

async function openAIGenerate() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant. Make a funny joke" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

openAIGenerate();