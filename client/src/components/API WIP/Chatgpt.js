const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const getChatResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    return response;
  } catch (error) {
    console.error('Error fetching completion:', error);
    throw error; // Rethrow to handle upstream
  }
};

export default getChatResponse;
