import response from "../src/utils/response";

describe("Check if the response function formats the right data", () => {
  test("Check a 200 with a simple body", () => {
    const expected = {
      body: '{"test":true}',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      isBase64Encoded: false,
      statusCode: 200
    };
    const resp = response(200, { test: true });

    expect(resp).toStrictEqual(expected);
  });

  test("Check a 400 with no body", () => {
    const expected = {
      body: "{}",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      isBase64Encoded: false,
      statusCode: 400
    };
    const resp = response(400);

    expect(resp).toStrictEqual(expected);
  });
});
