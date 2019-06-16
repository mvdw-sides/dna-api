import { APIGatewayEvent } from "aws-lambda";
import * as context from "aws-lambda-mock-context";
import { create } from "../handler";

describe("Test create endpoint", () => {
  test("Valid addition", () => {
    const ctx = context();
    const evt = {
      body: JSON.stringify({ string: "aaccffggaaa" })
    };

    create(evt as APIGatewayEvent);
    ctx.Promise.then((res: any) => {
      expect(res.statusCode).toBe(200);
    });
  });

  test("Invalid addition", () => {
    const ctx = context();
    const evt = {
      body: JSON.stringify({ string: "aaccffggtaaa" })
    };

    create(evt as APIGatewayEvent);
    ctx.Promise.then((res: any) => {
      expect(res.statusCode).toBe(400);
    });
  });
});
