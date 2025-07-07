export default function Cart() {
  const cartItems = [
    {
      id: 1,
      title: "The Cloud Handbook",
      author: "Jane Doe",
      price: 299,
      cover: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    {
      id: 2,
      title: "AI for Beginners",
      author: "John Smith",
      price: 499,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-900 p-4 rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="text-gray-400">{item.author}</p>
                </div>
              </div>
              <div className="text-white text-lg">₹{item.price}</div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
            <span className="text-xl font-bold text-white">Total:</span>
            <span className="text-xl font-bold text-white">₹{totalPrice}</span>
          </div>

          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
