"use server";

import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function handleSignUp(data: FormData): Promise<void> {
  const fullName = data.get("fullName") as string;
  const username = data.get("username") as string;
  const password = data.get("password") as string;
  const city = data.get("location") as string;
  const venmo = data.get("venmo") as string | null;
  const cashapp = data.get("cashapp") as string | null;

  // Validate input
  if (!fullName || !username || !password || !city) {
    throw new Error("All required fields must be filled.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const res = await query(
    `INSERT INTO users (full_name, username, password, city, venmo, cashapp)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [fullName, username, hashedPassword, city, venmo, cashapp]
  );

  const userId = res.rows[0]?.id;

  if (!userId) {
    throw new Error("Failed to create user.");
  }

  // Set session cookie
  const cookiesInstance = await cookies();
  cookiesInstance.set("session", JSON.stringify({ userId }), {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  // Let the client handle the redirection
}
