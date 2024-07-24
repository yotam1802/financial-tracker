"use server";

import { env } from "@/lib/env";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function getReceiptDetails(receipt: string) {
  "use server";

  const openai = createOpenAI({
    apiKey: env.OPENAI,
  });

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    maxTokens: 512,
    schema: z.object({
      name: z.string(),
      amount: z.string(),
      date: z.string(),
    }),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract the company name, amount, and date (format using year-month-day) from the following receipt image.",
          },
          {
            type: "image",
            image: receipt,
          },
        ],
      },
    ],
  });

  return object;
}
