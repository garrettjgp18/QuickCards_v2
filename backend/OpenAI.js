const OpenAI = require("openai");
const openai = new OpenAI();

// Create an .env file in the root directory of the project, and add OPENAI_API_KEY = 'put your key here'. It should pass it into the prompt automatically
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function openAIGenerate() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant. Make a funny joke" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

openAIGenerate();