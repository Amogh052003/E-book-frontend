module.exports = async function (context, req) {
  const books = [
    {
      id: 1,
      title: "The Cloud Handbook",
      author: "Jane Doe",
      price: 299,
      cover: "https://picsum.photos/200/300?1"
    },
    {
      id: 2,
      title: "Azure Essentials",
      author: "John Smith",
      price: 399,
      cover: "https://picsum.photos/200/300?2"
    }
  ];

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: books
  };
};
