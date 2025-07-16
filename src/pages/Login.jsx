// src/pages/Login.jsx
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export default function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to eBook Store</h1>
      <p className="mb-6 text-gray-400">Please sign in to continue</p>
      <button
        onClick={handleLogin}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Sign In with Microsoft
      </button>
    </div>
  );
}
