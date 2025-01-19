"use client";

import React, { useState } from "react";
import Navbar from "@/app/ui/navbar";

export default function Donate() {
  const [imageDescription, setImageDescription] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for user feedback
  const [error, setError] = useState<string | null>(null); // Error state for handling errors

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Extract the uploaded image
    const imageFile = formData.get("image") as File | null;
    if (!imageFile) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      // Call the backend API
      const response = await fetch("/api/generate-description", {
        method: "POST",
        body: formData, // Send FormData (includes the image)
      });

      if (!response.ok) {
        throw new Error("Failed to generate description. Please try again.");
      }

      const data = await response.json();
      setImageDescription(data.description); // Update the description
    } catch (error) {
      setError((error as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-900 via-purple-800 to-black">
      <Navbar />

      <main className="container mx-auto flex flex-col items-center px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Donate Furniture
        </h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full space-y-6"
        >
          {/* Item Name */}
          <div>
            <label
              htmlFor="item-name"
              className="block text-gray-700 font-medium mb-2"
            >
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="item-name"
              name="itemName"
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the item's name"
            />
          </div>

          {/* Pickup Type */}
          <div>
            <label
              htmlFor="pickup-type"
              className="block text-gray-700 font-medium mb-2"
            >
              Pickup Type <span className="text-red-500">*</span>
            </label>
            <select
              id="pickup-type"
              name="pickupType"
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="roadside">Roadside Pickup</option>
              <option value="contact">Contact Owner</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City or Address"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Item Image
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Generated Description */}
          {imageDescription && (
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Auto-Generated Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={imageDescription}
                readOnly
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-100"
              />
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Loading Indicator */}
          {loading && <p className="text-blue-500 text-sm">Generating...</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}