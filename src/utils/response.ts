const Response = (statusCode: number, body: object = {}) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };

  return response;
};

export default Response;
