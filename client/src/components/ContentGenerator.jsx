// ContentGenerator.jsx - Main Content Generation Component
// This component handles user input, API calls, and displays generated content

import React, { useState } from 'react';

function ContentGenerator() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // User input states
  const [topic, setTopic] = useState('');           // The topic for the LinkedIn post
  const [tone, setTone] = useState('Professional'); // The tone/style of the post
  
  // UI states
  const [loading, setLoading] = useState(false);    // Shows loading spinner when true
  const [error, setError] = useState('');           // Stores error messages
  const [copied, setCopied] = useState(false);      // Shows "Copied!" feedback
  
  // Generated content state - stores the AI response
  const [generatedContent, setGeneratedContent] = useState(null);

  // ============================================
  // AVAILABLE TONE OPTIONS
  // ============================================
  const toneOptions = ['Professional', 'Casual', 'Inspirational'];

  // ============================================
  // GENERATE CONTENT - Main function that calls our backend API
  // ============================================
  const handleGenerate = async () => {
    // Validation: Make sure the user entered a topic
    if (!topic.trim()) {
      setError('Please enter a topic for your LinkedIn post.');
      return;
    }

    // Reset states before making the API call
    setLoading(true);
    setError('');
    setGeneratedContent(null);

    try {
      // Make a POST request to our backend server
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the topic and tone as the request body
        body: JSON.stringify({ topic, tone }),
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      // Parse the JSON response
      const data = await response.json();
      
      // Store the generated content in state
      setGeneratedContent(data);
    } catch (err) {
      // Handle any errors (network issues, server errors, etc.)
      setError(
        err.message || 'Something went wrong. Please check if the server is running.'
      );
    } finally {
      // Always stop the loading spinner, whether successful or not
      setLoading(false);
    }
  };

  // ============================================
  // COPY TO CLIPBOARD - Copies all generated content
  // ============================================
  const handleCopy = () => {
    if (!generatedContent) return;

    // Combine all content sections into one formatted string
    const fullContent = `${generatedContent.hook}\n\n${generatedContent.post}\n\n${generatedContent.cta}\n\n${generatedContent.hashtags}`;

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(fullContent).then(() => {
      setCopied(true);
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ============================================
  // RENDER - The component UI
  // ============================================
  return (
    <div className="max-w-4xl mx-auto">
      {/* ==================== INPUT SECTION ==================== */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Generate Your Post
        </h2>

        {/* Topic Input */}
        <div className="mb-6">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What topic do you want to post about?
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The future of remote work, Leadership lessons, AI in healthcare..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
          />
        </div>

        {/* Tone Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="tone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select the tone of your post
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 bg-white"
          >
            {toneOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              {/* Simple loading spinner */}
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Content'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* ==================== RESULTS SECTION ==================== */}
      {generatedContent && (
        <div className="space-y-6">
          {/* Copy All Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="bg-white text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>

          {/* Hook Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                HOOK
              </span>
            </div>
            <p className="text-gray-800 text-lg font-medium leading-relaxed">
              {generatedContent.hook}
            </p>
          </div>

          {/* Full Post Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                FULL POST
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {generatedContent.post}
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                CALL TO ACTION
              </span>
            </div>
            <p className="text-gray-800 font-medium leading-relaxed">
              {generatedContent.cta}
            </p>
          </div>

          {/* Hashtags Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                HASHTAGS
              </span>
            </div>
            <p className="text-indigo-600 font-medium leading-relaxed">
              {generatedContent.hashtags}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentGenerator;
