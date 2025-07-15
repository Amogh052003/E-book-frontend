export default function BookCard({
  title,
  author,
  price = 0,
  coverImage,
  onClick,
  onAddToCart,
}) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-600">{author}</p>
        <p className="text-base font-semibold text-blue-600 mt-2">₹{price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart();
          }}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
