import crypto from "crypto"
import fs from "fs/promises"

const verify = async () => {
  // Write your code here
  // Read checksums.json
  // Calculate SHA256 hash using Streams API
  // Print result: filename — OK/FAIL
  try {

    const contents = JSON.parse(await fs.readFile("checksums.json"));
    let actualHashes = {};

    for (let file in contents){
      actualHashes[file] = crypto.createHash("sha256").update(file).digest("hex");
    }

    for (let file in actualHashes){
      console.log(`${file} - ${actualHashes[file] === contents[file] ? "OK" : "FAIL"}`);
    }

  } catch {
    throw new Error("FS operation failed");
  }
  
};

await verify();
