import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const { error, isPending, signUp } = useSignup();

  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thumbnail) {
      signUp(email, password, name, thumbnail);
    }
  };

  // handle Thumbnail
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailError(null);
    let selected = e.target.files ? e.target.files[0] : null;

    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Please select an Image file");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("File size must not exceed 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail updated!");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up here...</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <label>
        <span>name:</span>
        <input
          type="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>
      <label>
        <span>thumbnail:</span>
        <input type="file" onChange={handleThumbnail} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
