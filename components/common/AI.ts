// import axios from "axios";

// const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
// const PROJECT_ID = "cobalt-concord-297418";
// const MODEL_ID = "code-bison";
// const ACCESS_TOKEN = "ya29.a0AfB_byC8v9dazSuE_PLna7r0x_eMPnH-u7op7X6THLnxdyu7GOSSwAze60FhpQMYou06KXYtKe3kpEVJISpD43iPUKdDigmP8PVpAqQU6Ic-k3vgUzCXNsBYDHls7mDD42MmsYqha-GXD5jkvN2lIkxZ6ASISHEEsWKBuU4NDD5dlC_GUuuvIdILSmTe60mxB5CflWp7rEXc4HV2lct6aFKBeAKTLowcOHrOVCSBi3lQzH0dhSe7taU7amfE0oWUiCaJkct0S5Hqpv7kK4ZzULNJRk4aYB7bwbGPDrgTNxapHuswSy3pqHdAo-jTzpQdBJxECxnLPKVjlrhHqskCTVVu27CIetmfFR6iok07bYxuZ6nGZmY8yHhKZ5BEfLeBSzMgFUmuER8WnE6t14webUPdGCQ3aCgYKAXsSARMSFQGOcNnC_Ks8AfPhphLHjye56dycIg0419";


// export async function AI(srcCode:string): Promise<any> {
//     try {
//         const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`;
        
//         const headers = {
//           'Authorization': `Bearer ${ACCESS_TOKEN}`,
//           'Content-Type': 'application/json',
//         };
    
//         const data = {
//           instances: [
//             {
//               prefix: "explain cat family"
//             }
//           ],
//           parameters: {
//             candidateCount: 1,
//             maxOutputTokens: 1024,
//             temperature: 0.2
//           }
//         };
    
//         const response = await axios.post(url, data, { headers });
//         console.log(response.data);
//         return response.data;
//       } catch (error) {
//         console.error('Error:', error);
//       }
//   }

// const GCP_ACCESS_TOKEN = "ya29.a0AfB_byDRbwD2IG0H8wAi6W0DaO7zME-DxmX3LaqCLSEkaytAYRJWMxBElBSkOBNgUwqQt_GPdNfVCuzo1jVo5KZ_qCk0ZxiYcKaxQ9HADYEjxQ25tcpaDFnR9-B-62dSSGt_dJTMlhx6IlmlmR2a8k8X_OO1y_38k_hJ-_xtALgOhH1m8qhHJoD6Ifm06iYjbK-yZ-I0JbjldzfJD0EAEOmwlS-jlB5eWqhak6JGy0QDWd657OeE-lsHMpoKeRSJKZbZO6mFcKcPRxG-HO5mZkiY_4nVM6oNES-2BipJZD5piQmtVIdUNGq6GJ9AXprVTW6xtTXSzFyVOMKvheAi7HyJhYPOUWbypvIWFQRsZyHZfjTga7FrWTZ-Pzz1JS-aDlFE4r7_Et_I313KyLoWFJhlSBExaCgYKAZoSARMSFQGOcNnCeGFQ10IcJhvnICu60uJq6w0419"

// export const AI = async (srcCode:string, question:string) => {
//     const { data } = await axios.post(
//       `https://us-central1-aiplatform.googleapis.com/v1/projects/cobalt-concord-297418/locations/us-central1/publishers/google/models/text-bison:predict`,
//       {
//         instances: [ `(${srcCode}). Please draft comprehensive documentation that explains the functionality and purpose of this code. This documentation should be clear and informative, ensuring that the individual seeking assistance can understand the code and its significance within the context of blockchain technology.(${question})` ],
//         parameters: {
//           candidateCount: 1,
//           maxOutputTokens: 1024,
//           temperature: 0.2,
//           topP: 0.8,
//           topK: 40,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${GCP_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
  
//     return data.predictions[0].text;
//   };
  



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
            // { role: 'user', content: `${medicalDetails}, write a paragraph giving a first aid recommendation in full details, don't let the user know you are an AI.` },
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