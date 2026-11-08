"use server";

import { db } from "@/db";
import { kanjis } from "@/db/schema";
import { updateTag } from "next/cache";
import z from "zod";

const saveNewBasicKanjiSchema = z.object({
  kanji: z.string().min(1),
  kunyomi: z.string(),
  onyomi: z.string(),
  meaning: z.string().min(1),
});

export async function saveNewBasicKanji(_: unknown, formData: FormData) {
  const { success, data } = saveNewBasicKanjiSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  let isSuccess = false;
  let message = "";

  if (!success || !data) {
    return {
      isSuccess,
      message: "invalid input",
    };
  }

  try {
    await db
      .insert(kanjis)
      .values({
        kanji: data.kanji,
        meaning: data.meaning,
        kunyomi: data.kunyomi,
        onyomi: data.onyomi,
      })
      .onConflictDoNothing({ target: kanjis.kanji });
    isSuccess = true;
    message = "Added";
  } catch (err) {
    console.info(err);
    message = "Fail to store to db";
  }

  updateTag("basic-kanjis");

  return {
    isSuccess,
    message,
  };
}
