import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

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
              onClick={() => alert("Checkout functionality coming soon!")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
