export async function analyzeCareerQuiz(answers: number[], questions: {question: string, options: string[]}[]) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not set');

  // Build a prompt for the AI
  const userChoices = answers.map((a, i) => `Q: ${questions[i].question}\nA: ${questions[i].options[a]}`).join('\n');
  const prompt = `You are a career guidance counselor AI. Based on the following quiz answers, suggest 2-3 suitable career paths for the user, with a short explanation for each.\n\n${userChoices}\n\nCareer Suggestions:`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful career guidance assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 400,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI career suggestions');
  }
  const data = await response.json();
  return data.choices[0].message.content.trim();
} 