module.exports = async function (context, req) {
  const recommendations = [
    { id: 3, title: "Serverless Mastery", author: "Amogh L.", price: 249, cover: "https://picsum.photos/200/300?3" },
    { id: 4, title: "AI in Production", author: "AI GPT", price: 349, cover: "https://picsum.photos/200/300?4" }
  ];

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: recommendations
  };
};
