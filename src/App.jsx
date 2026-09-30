import { useState } from "react";

const MAX_CHARS = 100;

function App() {
  // Controlled textarea: React state is the single source of truth
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  const length = text.length;
  const isOverLimit = length > MAX_CHARS;
  const isEmpty = text.trim().length === 0;

  // Button is disabled when text is empty OR over the limit
  const isDisabled = isEmpty || isOverLimit;

  const handlePost = () => {
    if (isDisabled) return;
    setPosts([text, ...posts]);
    setText("");
  };

  return (
    <div className="container">
      <h1>Post Box</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows={5}
        className={isOverLimit ? "error-border" : ""}
      />

      {/* Live character counter */}
      <p className={isOverLimit ? "counter over" : "counter"}>
        {length} / {MAX_CHARS}
      </p>

      {/* Error message when limit is exceeded */}
      {isOverLimit && <p className="error">Limit exceeded</p>}

      <button onClick={handlePost} disabled={isDisabled}>
        Post
      </button>

      {posts.length > 0 && (
        <ul className="posts">
          {posts.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
