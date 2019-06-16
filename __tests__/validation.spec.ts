import validation from "../src/utils/validate";

describe("Test the validation", () => {
  test("Correct validation", () => {
    expect(validation.actgString("actgactgactg")).toBe(true);
    expect(validation.actgString("act")).toBe(true);
    expect(validation.actgString("gggggg")).toBe(true);
    expect(validation.actgString("cccccccc")).toBe(true);
    expect(validation.actgString("a")).toBe(true);
  });

  test("Incorrect validation", () => {
    expect(validation.actgString("bacac")).toBe(false);
    expect(validation.actgString("acttcaaaggggvaa")).toBe(false);
    expect(validation.actgString("acttcaaag_gggaa")).toBe(false);
  });
});
