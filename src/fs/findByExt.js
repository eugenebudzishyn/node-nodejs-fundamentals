import fs from "fs/promises";
import pa from "path";

const findByExt = async () => {
  // Write your code here
  // Recursively find all files with specific extension
  // Parse --ext CLI argument (default: .txt)
  try {
    const args = process.argv.slice(2);

    let extension = "";

    if (args[0] == "--ext"){
      extension = args[1];
    } else {
      extension = ".txt";
    }

    let correctNames = [];

    const rootDir = await fs.realpath(".");


    const folderScan = async (currentDir) => {

      const fileList = await fs.readdir(currentDir);

      for (let file of fileList){

        const path = currentDir + "/" + file;

        const parameters = await fs.stat(path)

        if (parameters.isFile()){
          // console.log(pa.extname(path).toLowerCase())
          if (pa.extname(path).toLowerCase() === extension){
            
            correctNames.push(pa.relative(rootDir, path));
          }
        } else {
          await folderScan(path)
        }
      }
    }

    await folderScan(rootDir);

    for (let f of correctNames.sort()){
      console.log(f)
    }

  } catch {
    throw new Error("FS operation failed")
  }
  
};

await findByExt();
