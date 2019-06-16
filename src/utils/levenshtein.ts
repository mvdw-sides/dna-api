import { match, scoredObject } from "../types";

export const levenshtein = (search: string, match: string): number => {
  if (search.length == 0) {
    return match.length;
  }
  if (match.length == 0) {
    return search.length;
  }

  const matrix: Array<Array<number>> = [];

  for (let i: number = 0; i <= match.length; i++) {
    matrix[i] = [i];
  }

  for (let j: number = 0; j <= search.length; j++) {
    matrix[0][j] = j;
  }

  for (let i: number = 1; i <= match.length; i++) {
    for (let j: number = 1; j <= search.length; j++) {
      if (match.charAt(i - 1) === search.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[match.length][search.length];
};

export const scoreObjects = (
  matches: Array<match>,
  search: string
): Array<scoredObject> => {
  const scored = matches
    .map(record => {
      return {
        string: record.string,
        score: levenshtein(search, record.string)
      };
    })
    .sort((a: scoredObject, b: scoredObject) =>
      a.score > b.score ? 1 : b.score > a.score ? -1 : 0
    );

  return scored;
};

export default levenshtein;
