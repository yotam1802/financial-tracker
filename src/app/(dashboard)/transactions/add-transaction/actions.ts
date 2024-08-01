"use server";

import { env } from "@/lib/env";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
      description: z.string(),
    }),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract the company name, amount, date (format using year-month-day), and a short description from the following receipt image.",
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

export async function addTransaction(
  transactionType: string,
  category: string,
  amount: string,
  title: string,
  date: string,
  description: string
) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/transactions/add-transaction");
  }

  if (
    !transactionType ||
    !category ||
    !amount ||
    !title ||
    !date ||
    !description
  ) {
    throw Error("Missing required fields");
  }

  await prisma.transaction.create({
    data: {
      transactionType,
      category,
      amount,
      title,
      date,
      description,
      userId: session.user.id,
    },
  });
}
