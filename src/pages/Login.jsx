export default function Login() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Login to Your Account</h1>
      <a
        href="/.auth/login/google"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
      >
        Login with GitHub
      </a>
    </div>
  );
}
