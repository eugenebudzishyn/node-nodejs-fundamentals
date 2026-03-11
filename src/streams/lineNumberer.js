import readline from "readline"

const lineNumberer = () => {
  // Write your code here
  // Read from process.stdin
  // Use Transform Stream to prepend line numbers
  // Write to process.stdout

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.question("", (ans) => {
    let output = "";
    let str = "";
    let counter = 1;
    for (let i = 0; i < ans.length; i++){
      if (ans[i] == "\\" && ans[i+1] == "n"){
        output += ` ${counter} | ${str + "\n"}`;
        i++;
        counter += 1;
        str = "";
      } else {
        str += ans[i];
      }
    }
    output += ` ${counter} | ${str}`;
    console.log(output);
    rl.close();
  });
};

lineNumberer();
