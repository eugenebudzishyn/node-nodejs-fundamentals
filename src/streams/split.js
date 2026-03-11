import fs from "fs/promises"

const split = async () => {
  // Write your code here
  // Read source.txt using Readable Stream
  // Split into chunk_1.txt, chunk_2.txt, etc.
  // Each chunk max N lines (--lines CLI argument, default: 10)

  const args = process.argv.slice(2);
  let lines = 10;

  if (args[0] == "--lines" && !(isNaN(args[1]))){
    lines = args[1];
  }

  const contents = (await fs.readFile("source.txt")).toString().split("\n");

  let fileContents = "";

  let counter = 0;

  let fileCounter = 1;

  for (let line of contents){
    if (line.slice(line.length - 1) == "\r"){
      fileContents += "\n" + line.slice(0, line.length - 1);
    } else {
      fileContents += "\n" + line;
    }
    counter += 1;
    if (counter >= lines){
      await fs.writeFile(`chunk_${fileCounter}.txt`, fileContents.slice(1));
      fileContents = "";
      fileCounter += 1;
      counter = 0;
    }
  }
  if (fileContents != ""){
    await fs.writeFile(`chunk_${fileCounter}.txt`, fileContents.slice(1));
  }
  
};

await split();
