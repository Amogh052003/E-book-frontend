module.exports = async function (context, req) {
  const books = [
    {
      id: 1,
      title: "The Cloud Handbook",
      author: "Jane Doe",
      price: 299
    },
    {
      id: 2,
      title: "Azure Essentials",
      author: "John Smith",
      price: 399
    }
  ];

  context.res = {
    status: 200,
    body: books,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
