import Storage from "../src/utils/store";

describe("Test the simple Storage utility", () => {
  test("Push string into the storage array", () => {
    const store = new Storage(false);
    const storagePush = store.create("ACTGGGCTATTACCGGAA");
    expect(storagePush).toBe(undefined);
  });

  test("Push string into the storage array and retrieve it", () => {
    const str = "actgggctattaccggaa";
    const store = new Storage(false);
    store.create(str);
    const found = store.find("TGGGCT");
    expect(found.length).toBe(1);
    expect(found[0]).toBe(str);
  });

  test("Multiple strings", () => {
    const store = new Storage(false);
    [
      "ACTGGGCTATTACCGGAA",
      "FFCCTTGGAATTCCFF",
      "FFFAAACCTTTGGGCCC",
      "FAFAFAFAFAFAFAFAFAFAF"
    ].forEach(str => store.create(str));

    const found = store.find("CCT");
    expect(found.length).toBe(2);
    expect(found[0]).toBe("FFCCTTGGAATTCCFF".toLowerCase());
    expect(found[1]).toBe("FFFAAACCTTTGGGCCC".toLowerCase());
  });
});
