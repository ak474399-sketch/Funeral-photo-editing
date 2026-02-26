import { GoogleGenAI, Modality } from "@google/genai";

const SYSTEM_PROMPT = `You are an advanced AI image processing engine specialized in memorial and funeral photography.
Your EXCLUSIVE goal is to perform the specified editing task on the uploaded image.
CONSTRAINTS:
- OUTPUT ONLY THE FINAL PROCESSED IMAGE DATA.
- NO TEXTUAL EXPLANATIONS.
- Treat every image with the utmost respect and dignity.
- Follow the user's instruction precisely.`;

export const FUNERAL_PROMPTS: Record<string, string> = {
  portrait:
    "Create a formal memorial portrait from this photo. Crop to a standard portrait ratio (3:4). The subject should appear in formal dark attire (black suit/jacket with white shirt). Apply a clean, solid background (user may specify blue, black, white, or gray). Ensure the face is clear, well-lit, and dignified. Output a high-quality, solemn memorial portrait suitable for funeral services.",

  colorize:
    "Colorize this black and white memorial photograph. Apply natural, realistic skin tones and clothing colors. Maintain the solemnity and dignity of the image. Pay attention to fabric textures, hair color, and background tones. The result should look like a naturally taken color photograph while preserving the historical character of the original.",

  attire:
    "Replace the subject's current clothing with formal funeral attire — a dark black suit or jacket with a clean white shirt and dark tie for men, or a dark formal outfit for women. Keep the face, hair, and expression completely unchanged. Blend the new attire seamlessly with the existing lighting and pose. The result should look natural and dignified.",

  background:
    "Remove the current background and replace it with a clean, professional solid-color background suitable for a memorial portrait. Default to a soft gradient from dark blue to lighter blue if no specific color is requested. Ensure clean edges around the subject with no artifacts. Maintain the subject's appearance exactly as-is.",

  composite:
    "Combine the people from these multiple photos into a single, cohesive family portrait. Align lighting, color temperature, and scale so all subjects appear naturally together. Arrange them in a dignified group composition suitable for a memorial service. Ensure faces are clear and expressions are respectful. The final image should look like a genuine family photograph.",

  poster:
    "Create a dignified memorial poster using this portrait photo. Place the photo prominently in the center or upper portion. Add a solemn decorative border with subtle floral or geometric elements. Leave space at the bottom for name and dates text (use placeholder text if not provided). Use a dark, respectful color palette (deep navy, black, dark gray with gold or white accents). The overall design should convey honor, respect, and remembrance.",
};

export type GenType = keyof typeof FUNERAL_PROMPTS;

export type GenerateInput = {
  imageBase64: string;
  mimeType?: string;
  genType: GenType;
  extraPrompt?: string;
};

export type GenerateResult = {
  success: boolean;
  imageBase64?: string;
  imageMimeType?: string;
  error?: string;
};

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenAI({ apiKey });
}

export async function generateFuneralPhoto(input: GenerateInput): Promise<GenerateResult> {
  const { imageBase64, mimeType = "image/jpeg", genType, extraPrompt } = input;
  const client = getClient();

  try {
    const basePrompt = FUNERAL_PROMPTS[genType];
    if (!basePrompt) return { success: false, error: `Unknown generation type: ${genType}` };

    const prompt = extraPrompt ? `${basePrompt}\n\nAdditional instructions: ${extraPrompt}` : basePrompt;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: imageBase64 } },
            { text: prompt },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        maxOutputTokens: 8192,
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(
      (p): p is { inlineData: { mimeType: string; data: string } } =>
        "inlineData" in p && !!p.inlineData?.data
    );

    if (!imagePart?.inlineData?.data) {
      return { success: false, error: "AI did not return an image" };
    }

    return {
      success: true,
      imageBase64: imagePart.inlineData.data,
      imageMimeType: imagePart.inlineData.mimeType ?? "image/png",
    };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
