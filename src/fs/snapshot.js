import fs from "fs/promises";
import pa from "path";

const snapshot = async () => {
  const rootDir = await fs.realpath(".");
  let output = {"rootPath": rootDir, "entries": []};

  // Write your code here
  // Recursively scan workspace directory
  // Write snapshot.json with:
  // - rootPath: absolute path to workspace
  // - entries: flat array of relative paths and metadata
  const folderScan = async (currentDir) => {
    const fileList = await fs.readdir(currentDir);

    for (let file of fileList){
      const path = currentDir + "/" + file;
      const parameter = await fs.stat(path);
      
      if (parameter.isFile()){
        const fileBuffer = await fs.readFile(path);
        const base64String = fileBuffer.toString('base64');

        const entry = {"path": pa.relative(rootDir, path), "type": "file", "size": parameter.size, "content": base64String};

        output["entries"].push(entry);
      } else {
        const entry = {"path": pa.relative(rootDir, path), "type": "directory"}

        output["entries"].push(entry);

        await folderScan(path);
      }
    }
  }

  await folderScan(rootDir);

  const jsonData = JSON.stringify(output, null, 2);

  await fs.writeFile("./snapshot.json", jsonData)
};

await snapshot();
