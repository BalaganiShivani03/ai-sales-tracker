const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1', // Groq-compatible endpoint
});

exports.getAIRecommendations = async (req, res) => {
  try {
    const { deals } = req.body;

    if (!deals || !Array.isArray(deals) || deals.length === 0) {
      return res.status(400).json({ error: 'Deals array is required and cannot be empty.' });
    }

    const formattedDeals = deals.map((deal, i) => (
      `Deal ${i + 1}:\n- Title: ${deal.title}\n- Value: $${deal.value}\n- Stage: ${deal.stage}\n- Customer: ${deal.customer}`
    )).join('\n\n');

    const prompt = `
You are an expert AI sales assistant. Review the following sales deals and suggest:

1. Which deals should be prioritized based on value, stage, and customer intent?
2. What specific follow-up actions should be taken to maximize conversion?

Sales Deals:
${formattedDeals}
    `.trim();

    const chatCompletion = await openai.chat.completions.create({
      model: 'llama3-70b-8192', // ✅ Updated Groq-supported model
      messages: [
        { role: 'system', content: 'You are a strategic AI sales advisor.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const responseText = chatCompletion.choices?.[0]?.message?.content?.trim();
    if (!responseText) {
      return res.json({ suggestions: '⚠️ No AI suggestions received.' });
    }

    console.log('✅ Groq AI Suggestion generated successfully.');
    res.json({ suggestions: responseText });

  } catch (error) {
    console.error('❌ Groq AI Error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to get AI suggestions from Groq.' });
  }
};
