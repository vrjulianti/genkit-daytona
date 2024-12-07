// Import the Genkit core libraries and plugins.
import { genkit, z } from "genkit";

// From the Firebase plugin, import the functions needed to deploy flows using
// Cloud Functions.
import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [
		// Load the Google AI plugin. You can optionally specify your API key
		// by passing in a config object; if you don't, the Google AI plugin uses
		// the value from the GOOGLE_GENAI_API_KEY environment variable, which is
		// the recommended practice.
		googleAI(),
	],
	promptDir: "./prompts",
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
export const stackRecomFlow = ai.defineFlow(
	{
		name: "stackRecomFlow",
		inputSchema: z.object({
			title: z.string(),
			description: z.string(),
		}),
		outputSchema: z.string(),
	},
	async ({ title, description }) => {
		const response = await ai.generate({
			model: gemini15Flash,
			prompt: `provide a tech stack recommendation for a ${title} project with the following description: ${description}`,
		});
		return response.text;
	}
);
