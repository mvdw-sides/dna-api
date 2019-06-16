import { APIGatewayEvent } from "aws-lambda";
import Response from "./src/utils/response";
import Storage from "./src/utils/store";
import { scoreObjects } from "./src/utils/levenshtein";
import { scoredObject } from "./src/types";
import validate from "./src/utils/validate";
// use simple memory storage
const store = new Storage();

export const hello = async (event: APIGatewayEvent) => {
  return Response(200, {
    input: event,
    message: "hello!"
  });
};

export const find = async (event: APIGatewayEvent) => {
  const { query } = event.pathParameters;
  const queryString = event.queryStringParameters;

  try {
    if (!validate.actgString(query)) {
      throw new Error("String is not a valid ACTG string");
    }

    let matches: Array<scoredObject> = scoreObjects(
      store.find(query).map(string => {
        return { string };
      }),
      query.toLowerCase()
    );

    if (queryString && queryString.distance) {
      const maxDistance = parseInt(queryString.distance, 10);
      matches = matches.filter(match => match.score <= maxDistance);
    }

    return Response(200, matches);
  } catch (e) {
    return Response(400, { message: e.message });
  }
};

export const create = async (event: APIGatewayEvent) => {
  const { body } = event;
  const data = JSON.parse(body);

  try {
    if (!validate.actgString(data.string)) {
      throw new Error("String is not a valid ACTG string");
    }
    store.create(data.string);
    return Response(200, { message: "created" });
  } catch (e) {
    return Response(400, { message: e.message });
  }
};
