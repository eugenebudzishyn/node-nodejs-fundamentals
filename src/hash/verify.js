import crypto from "crypto"
import fs from "fs/promises"
import stream from "stream"

const verify = async () => {
  // Write your code here
  // Read checksums.json
  // Calculate SHA256 hash using Streams API
  // Print result: filename — OK/FAIL
  try {
    const contents = JSON.parse(await fs.readFile("checksums.json"));
    for (let file in contents){
      
    }
  } catch {
    throw new Error("FS operation failed");
  }
  
};

await verify();
