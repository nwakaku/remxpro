
  
export async function AI(srcCode:string): Promise<string> {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error('API key not found in environment variables.');
    }

    const endpoint: string = 'https://api.openai.com/v1/chat/completions';

    // Prepare the request payload
    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `(${srcCode}). explain the functions in this contract ,Write everything in a paragraph`,
            },
        ],
        max_tokens: 200,
        temperature: 0.7,
        n: 1,
        stop: '\n',
    };

    // Make the API request to ChatGPT API
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
        });

        // Parse the response
        const data = await response.json();
        console.log(data.choices);
        const generatedSentence = data.choices[0].message.content;
        return generatedSentence;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}