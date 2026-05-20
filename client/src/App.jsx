import { useState } from "react";
import ReactMarkdown from "react-markdown";


function App() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

 const generateContent = async () => {

  
if (!topic) {
    alert("Please enter a topic");
    return;
  }
  
  try {

    setLoading(true);

    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        tone,
      }),
    });

    const data = await response.json();

    setResult(data.content);

  } catch (error) {
    setLoading(false);

    console.error(error);

    setResult("Failed to generate content");

  } finally {

    setLoading(false);

  }
};
const handleCopy = async () => {
  await navigator.clipboard.writeText(result);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            LinkedIn Content Generator 🚀
          </h1>

          <p className="text-gray-600 text-lg">
            Create amazing LinkedIn posts with AI
          </p>
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            What topic do you want to post about?
          </label>

          <input
            type="text"
            placeholder="Enter your topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-blue-300 outline-none text-lg"
          />
        </div>

        {/* Tone */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">
            Select tone
          </label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:ring-4 focus:ring-blue-300 outline-none text-lg"
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Motivational</option>
            <option>Funny</option>
          </select>
        </div>

        {/* Button */}
       <div className="flex gap-4 mt-6">

  {/* Generate Button */}
  <button
    onClick={generateContent}
    disabled={loading}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition disabled:opacity-50"
  >
 {loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    Generating...
  </div>
) : (
  "Generate Content"
)} 
  </button>

  {/* Clear Button */}
  <button
    onClick={() => {
      setTopic("");
      setResult("");
    }}
    className="px-6 py-4 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
  >
    Clear
  </button>

</div>
<button
  onClick={handleCopy}
  className="bg-black text-white px-4 py-2 rounded-lg mb-4 hover:scale-105 transition"
>
  Copy Post
</button>
{copied && (
  <p className="text-green-600 font-semibold mb-3">
    ✅ Copied successfully!
  </p>
)}

        {/* Result */}
        {result && (
          <div className="mt-8 bg-gray-100 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Generated Post
              </h2>

             <button
  onClick={() => {
    setTopic("");
    setResult("");
  }}
  className="w-full mt-4 py-3 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
>
  Clear
</button>
            </div>

           <ReactMarkdown
  components={{
    h1: ({node, ...props}) => (
      <h1 className="text-3xl font-bold mb-4" {...props} />
    ),
    h2: ({node, ...props}) => (
      <h2 className="text-2xl font-bold mb-3" {...props} />
    ),
    p: ({node, ...props}) => (
      <p className="mb-4 leading-8 text-gray-700" {...props} />
    ),
    li: ({node, ...props}) => (
      <li className="ml-6 mb-2 list-disc" {...props} />
    ),
  }}
>
  {result}
</ReactMarkdown>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;