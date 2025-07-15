module.exports = async function (context, req) {
  const userId = req.query.user || "guest";
  const recent = [ /* mock recent books */ ];
  context.res = {
    status: 200,
    body: recent
  };
};
