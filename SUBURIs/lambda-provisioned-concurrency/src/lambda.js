console.log("cold start"); // コールドスタートが起きた時に呼ばれて、CloudWatch Logsに書き込まれる

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!!!!"),
  };
  return response;
};
