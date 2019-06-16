import * as path from "path";

import { readFileSync, writeFileSync } from "fs";

export default class Store {
  storage: Array<string> = [];
  file: string = "";
  resume: boolean = true;
  constructor(resume: boolean = true) {
    this.resume = resume;
    try {
      if (resume) {
        this.file = path.join(process.env.STORAGE_LOCATION, "store.json");
        const data = readFileSync(this.file, "utf-8");
        this.storage = JSON.parse(data);
      }
    } catch (e) {
      console.log("initial, file does not exist ");
    }
  }

  create(elem: string) {
    console.log(`Adding ${elem}(${elem.toLowerCase()})`);

    try {
      this.storage.push(elem.toLowerCase());
      if (this.resume) {
        writeFileSync(this.file, JSON.stringify(this.storage), { mode: 0o666 });
      }
    } catch (e) {
      console.log(e);
    }
  }

  find(query: string) {
    const q = query.toLowerCase();
    console.log(`Looking for ${query}(${q})`);
    return this.storage.filter((record: string) => record.includes(q));
  }
}
