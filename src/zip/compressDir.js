import stream from "node:stream";
import zlib from "node:zlib"
import fs from "node:fs"

const compressDir = async () => {
  // Write your code here
  // Read all files from workspace/toCompress/
  // Compress entire directory structure into archive.br
  // Save to workspace/compressed/
  // Use Streams API

  try {
    function work(){

      stream.pipeline(fs.createReadStream("workspace/parts/toCompress"), zlib.createGzip(), fs.createWriteStream("workspace/parts/compressed"));
    };

    work()
    
  } catch {
    throw new Error("FS operation failed");
  }
};

await compressDir();
