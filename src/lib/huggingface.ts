export async function analyzeCareerQuiz(answers: number[], questions: {question: string, options: string[]}[]) {
  const apiKey = import.meta.env.VITE_HF_API_KEY;
  if (!apiKey) throw new Error('Hugging Face API key not set');

  // Build a prompt for the AI
  const userChoices = answers.map((a, i) => `Q: ${questions[i].question}\nA: ${questions[i].options[a]}`).join('\n');
  const prompt = `You are a career guidance counselor AI. Based on the following quiz answers, suggest 2-3 suitable career paths for the user, with a short explanation for each.\n\n${userChoices}\n\nCareer Suggestions:`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 400,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.1,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`API Error: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
    }

    const data = await response.json();
    if (!data || !data[0] || !data[0].generated_text) {
      throw new Error('Invalid response format from API');
    }
    return data[0].generated_text.trim();
  } catch (error) {
    console.error('Career Quiz API Error:', error);
    throw error;
  }
} 