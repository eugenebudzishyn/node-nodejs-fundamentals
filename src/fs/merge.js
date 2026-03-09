import { ADDRCONFIG } from "dns";
import fs from "fs/promises"

const merge = async () => {
  // Write your code here
  // Default: read all .txt files from workspace/parts in alphabetical order
  // Optional: support --files filename1,filename2,... to merge specific files in provided order
  // Concatenate content and write to workspace/merged.txt
  let args = process.argv.slice(2);

  let bool = true

  if (args.length > 1){
    if (args[0] == "--file"){
      bool = false;
      args = args.slice(1);
      args = args[0].split(",")
    }
  }
  try {
    const rootPath = "workspace/parts";
    let fileList = args;
    
    if (bool) {
      fileList = await fs.readdir(rootPath);
    }
    await fs.writeFile("workspace/merged.txt", "");

    for (let f of fileList){

      const data = (await fs.readFile(rootPath + `/${f}`)).toString();

      await fs.appendFile("workspace/merged.txt", data + "\n");

    }
  } catch {    
    throw new Error("FS operation failed");
  }
};

await merge();
