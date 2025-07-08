module.exports = async function (context, req) {
  const { userId, bookId } = req.body || {};
  if (!userId || !bookId) {
    context.res = { status: 400, body: "Missing userId or bookId" };
    return;
  }

  // Simulate adding to DB or memory
  context.res = {
    status: 200,
    body: { message: `Book ${bookId} added to ${userId}'s cart.` }
  };
};
