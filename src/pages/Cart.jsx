import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/.auth/me");
      const { clientPrincipal } = await res.json();

      if (!clientPrincipal) {
        alert("You must be logged in to checkout.");
        return;
      }

      const { userId } = clientPrincipal;

      // Send each book to the add_to_mybooks function
      for (const book of cartItems) {
        await fetch(
          "https://e-book-function-app-era6f7f3dceycpcu.centralindia-01.azurewebsites.net/api/add_to_mybooks",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, book }),
          }
        );
      }

      alert("Books successfully added to My Books!");

      // TODO: Optionally clear cart or navigate to MyBooks page
    } catch (err) {
      console.error("Checkout failed", err);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div className="p-8 text-white min-h-screen bg-neutral-950">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white text-gray-900 rounded-lg p-4 flex items-center gap-4 shadow"
              >
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    ₹{item.price || 0}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h2 className="text-xl font-bold">
              Total: ₹{total.toFixed(2)}
            </h2>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
