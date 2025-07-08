module.exports = async function (context, req) {
  const userId = req.query.user || "guest";
  const cart = [ /* mock cart items */ ];
  context.res = {
    status: 200,
    body: cart
  };
};
