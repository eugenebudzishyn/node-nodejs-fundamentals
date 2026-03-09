import fs from  "fs/promises"
import readline from "readline"

const interactive = () => {
  // Write your code here
  // Use readline module for interactive CLI
  // Support commands: uptime, cwd, date, exit
  // Handle Ctrl+C and unknown commands

  const rl = readline.createInterface(process.stdin, process.stdout);

  // const validInputs = {"uptime": 0, "cwd": 0, "date": 0};

  const startTime = Date.now()
  function askQuestion(){
    rl.question("> ", async (ans) => {
      if (ans == "date"){

        console.log(Date(Date.now()));
      } else if (ans == "cwd"){

        console.log(await fs.realpath("."));
      } else if (ans == "uptime"){

        console.log(`Uptime: ${(Date.now() - startTime) / 1000}s`);
      } else if (ans == "exit"){

        console.log("Goodbye!");

        rl.close();
        return
      } else {
        console.log("Unknown command");
      }
      askQuestion();
    });
  }
  askQuestion();
};

interactive();
