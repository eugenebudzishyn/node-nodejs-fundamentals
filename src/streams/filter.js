import readline from "readline"

const filter = () => {
  // Write your code here
  // Read from process.stdin
  // Filter lines by --pattern CLI argument
  // Use Transform Stream
  // Write to process.stdout

  let args = process.argv.slice(2);

  console.log(args);

  let pattern = "";

  if (args[0] == "--pattern" && typeof(args[1]) == "string"){
    pattern = args[1];
  }

  const rl = readline.createInterface(process.stdin, process.stdout);

  let ValidLines = [];

  rl.question("> ", (ans) => {
    let output = [];
    let str = "";
    for (let i = 0; i < ans.length; i++){
      if (ans[i] == "\\" && ans[i+1] == "n"){
        output.push(str);
        i++;
        str = "";
      } else {
        str += ans[i];
      }
    }
    output.push(str);

    for (let line of output){
      for (let i = 0; i < line.length - pattern.length; i++){
        if (line.slice(i,pattern.length + i) == pattern){
          ValidLines.push(line);
          break
        }
      }
    }
    console.log(ValidLines);
    rl.close();
  });
};

filter();
