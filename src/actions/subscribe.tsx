'use server';
import { z } from "zod";
import { v4 as uuidv4, validate } from "uuid";
import { createSubscriber } from "@/lib/queries";
import { sendConfirmationEmail } from "@/lib/email";

// return value type
interface RetVal<T> {
  error?: string;
  data?: T;
}

const subscribeSchema = z.object({
  email: z.string().email(),
});

export const subscribe = async (formData: FormData): Promise<RetVal<string>> => {
  const email = formData.get("email");
  const parsed = subscribeSchema.safeParse({ email });
  if (!parsed.success) {
    return { error: "Invalid email" };
  }
  const validatedEmail = parsed.data.email.toLowerCase();
  const token = uuidv4();
  try {
    const newSubscriber  = await createSubscriber(validatedEmail, token);    
  } catch (error:any) {
    if (error?.code === "P2002") {
      return { error: "Subscriber already exists" };
    } else {
      return { error : "Failed to create subscriber" };
    }
  }
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/confirm?token=${token}`;
  const res = await sendConfirmationEmail(validatedEmail, link);
  if (res?.error) {
    return { error: "Failed to send email" };
  }
  return { data: "Check your email to confirm" };
};
