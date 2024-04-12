const OpenAI = require("openai");
const openai = new OpenAI();
// const db = require('./db')

// Create an .env file in the root directory of the project, and add OPENAI_API_KEY = 'put your key here'. It should pass it into the prompt automatically
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Testing variables, payload would be accepted somewhere around here
// let numCards = 10;
// let schema = "Fortnite"
// let transcript = ``;


async function openAIGenerate(mediaType, numCards, schema, transcript) {
  // console.log(`${numCards}, ${schema}, ${transcript}`);
  if (mediaType == "Text") {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `You are a helpful assitant that makes flashcards. Generate ${numCards}  keywords that are associated with the concept of ${schema}.
      Define each keyword in 10 words or less. ONLY return them as "keyword: defintion. Seperate each with "\n". Do not return anything else.` }],
      model: "gpt-3.5-turbo",
      temperature: 0.5, // Controls creativity
      // max_tokens: 1000 // Controls limit of tokens used
    });
    console.log("Alternate prompt used");

    return completion.choices[0].message.content;

  } else {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `You are a helpful assistant that creates flashcards. In the following text, find ${numCards} keywords that are
    associated with the concept of ${schema}. If the concept does not match the text, do not use it. Define each keyword in 10 words or less. 
    ONLY return them as "keywords : definition". Seperate each with "\n" Do not return anything else.
    The text is as follows: ${transcript}` }],
    model: "gpt-3.5-turbo",
    temperature: 0.5, // Controls creativity
    // max_tokens: 1000 // Controls limit of tokens used
    
  });

  return completion.choices[0].message.content;

}
}



module.exports = {openAIGenerate};