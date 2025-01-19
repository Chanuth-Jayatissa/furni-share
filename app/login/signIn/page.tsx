"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignIn } from "./actions";

export default function SignIn() {
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      await handleSignIn(formData);
      router.push("/dashboard/donate"); // Redirect to the donate page
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Invalid username or password."); // Optional: Show an error message
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-black text-white">
      {/* Sign-In Form */}
      <main className="w-full max-w-2xl bg-gray-800 p-16 rounded-lg shadow-lg mt-32 mb-32">
        <h1 className="text-5xl font-bold text-center mb-10">Sign In</h1>

        <form onSubmit={onSubmit} className="space-y-10">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-xl font-medium text-gray-300 mb-4">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-6 py-4 text-xl text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xl font-medium text-gray-300 mb-4">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-6 py-4 text-xl text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-blue-500 text-xl font-bold text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xl text-gray-300 mt-10">
          Don’t have an account?{" "}
          <Link href="/signUp" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
