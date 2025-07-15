module.exports = async function (context, req) {
  const { userId, bookId } = req.body || {};
  if (!userId || !bookId) {
    context.res = { status: 400, body: "Missing userId or bookId" };
    return;
  }

  context.res = {
    status: 200,
    body: { message: `Book ${bookId} removed from ${userId}'s cart.` }
  };
};
