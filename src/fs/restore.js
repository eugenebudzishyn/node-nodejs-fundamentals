import fs from "fs/promises";
import pa from "path";

const restore = async () => {
  // Write your code here
  // Read snapshot.json
  // Treat snapshot.rootPath as metadata only
  // Recreate directory/file structure in workspace_restored

  try {
    await fs.access("snapshot.json", fs.constants.F_OK);
    
    const results = await fs.readFile("snapshot.json");
    const contents = JSON.parse(results);

    const newFolder = "./workspaceRestored";
    
    await fs.mkdir(newFolder);

    for (let file of contents["entries"]){

      if (file["type"] == "file"){

        await fs.writeFile(newFolder + "/" + file["path"], atob(file["content"]));

      } else if (file["type"] == "directory"){

        await fs.mkdir(newFolder + "/" + file["path"]);

      }
    }

  } catch {
    throw new Error("FS operation failed");
  }
};

// console.log(restore())

await restore();

