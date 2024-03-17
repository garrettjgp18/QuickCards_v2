const OpenAI = require("openai");
const openai = new OpenAI();

// Create an .env file in the root directory of the project, and add OPENAI_API_KEY = 'put your key here'. It should pass it into the prompt automatically
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Testing variables, payload would be accepted somewhere around here
let numCards = 10;
let schema = "Fortnite"
let transcript = ``;


async function openAIGenerate() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `You are a helpful assistant that creates flashcards. In the following text, find ${numCards} keywords that are
    associated with the concept of ${schema}. Define each keyword in 10 words or less. Return them as "keywords : definition". Do not return anything else.
    The text is as follows: ${transcript}` }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

openAIGenerate();