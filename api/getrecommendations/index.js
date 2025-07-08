module.exports = async function (context, req) {
  const recommendedBooks = [ /* logic or mock recommendations */ ];
  context.res = {
    status: 200,
    body: recommendedBooks
  };
};
