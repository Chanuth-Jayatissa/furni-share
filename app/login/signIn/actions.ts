"use server";

import { query } from "@/lib/db"; // Database utility
import bcrypt from "bcrypt"; // For password comparison
import { cookies } from "next/headers"; // For setting cookies (session management)

export async function handleSignIn(data: FormData): Promise<void> {
  const username = data.get("username") as string;
  const password = data.get("password") as string;

  // Validate input
  if (!username || !password) {
    throw new Error("All fields are required.");
  }

  // Fetch user from the database
  const res = await query(`SELECT id, password FROM users WHERE username = $1`, [username]);
  const user = res.rows[0];

  if (!user) {
    throw new Error("Invalid username or password.");
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  // Set session cookie
  const cookiesInstance = await cookies();
  cookiesInstance.set("session", JSON.stringify({ userId: user.id }), {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  // Don't return a response; handle redirection on the client
}
