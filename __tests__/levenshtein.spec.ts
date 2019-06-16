import { levenshtein } from "../src/utils/levenshtein";

describe("Test the Levenshtein scoring", () => {
  test("Correct 0 matches", () => {
    expect(levenshtein("cat", "cat")).toBe(0);
    expect(levenshtein("Rocky roads", "Rocky roads")).toBe(0);
    expect(levenshtein("_=0", "_=0")).toBe(0);
  });

  test("Items with larger distances", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("lore", "lo")).toBe(2);
    expect(levenshtein("yawn", "yawl")).toBe(1);
    expect(levenshtein("flaw", "lawn")).toBe(2);
  });
});
