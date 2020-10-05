const faker = require("faker");
const fs = require("fs");

class DB {
  constructor(userCount) {
    this.userCount = userCount || 100;
    this.currCount = 1;
  }

  hasMoreData() {
    return this.currCount < this.userCount;
  }

  getNextData() {
    const username = faker.internet.userName();
    const avatar = faker.image.avatar();
    const data = `${this.currCount},${username},${avatar}\n`;
    this.currCount++;
    return data;
  }
}

function writeTenMillionUsers(writer, encoding, callback) {
  const db = new DB(10000000);
  write();

  function write() {
    let ok = true;
    while (db.hasMoreData()) {
      const data = db.getNextData();
      ok = writer.write(data, encoding);
      if (!ok) {
        writer.once("drain", write);
        break;
      }
    }

    if (ok) {
      const data = db.getNextData();
      writer.write(data, encoding, callback);
    }
  }
}

const writeUsers = fs.createWriteStream("users.csv");
writeUsers.write("id,username,avatar\n", "utf8");

writeTenMillionUsers(writeUsers, "utf-8", () => {
  writeUsers.end();
});
