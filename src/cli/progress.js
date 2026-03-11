const progress = () => {
  // Write your code here
  // Simulate progress bar from 0% to 100% over ~5 seconds
  // Update in place using \r every 100ms
  // Format: [████████████████████          ] 67%

  let args = process.argv.slice(2);

  let duration = 5000;
  let interval = 300;
  let lenght = 30;
  let color = "#ffffff";
  console.log("The hex color needs to be writen like this 'hex'   ");
  for(let i = 0; i < args.length; i += 2){
    if (args[i] == "--duration"){
      if (!(isNaN(args[i+1]))){
        duration = Number(args[i+1]);
      }
    } else if (args[i] == "--interval"){
      if (!(isNaN(args[i+1]))){
        interval = Number(args[i+1]);
      }
    } else if (args[i] == "--length"){
      if (!(isNaN(args[i+1]))){
        lenght = Number(args[i+1]);
      }
    } else if (args[i] == "--color"){
      if (!(args[i+1] === undefined)){
        color = args[i+1];
      }
      
    }
  }

  let startTime = 0;

  drawProgressBar(lenght, 0, 0, "#ffffff");

  const intervalId = setInterval(addToTheLine, interval);

  let n = 0

  function hexToAnsiColor(hex) {
    if (hex[0] == "#"){
      hex = hex.slice(1);
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `\x1b[38;2;${r};${g};${b}m`;
  }

  function drawProgressBar(length, itemCount, percent, colorInHex){
    let progress = "";
    let line = "";
    if (itemCount > lenght) {
      itemCount = lenght;
    }
    if (percent > 100) {
      percent = 100;
    }
    for (let i = 0; i < itemCount; i++){
      progress += "█";
    }
    for (let i = 0; i < length - itemCount; i++){
      line += " "
    }
    process.stdout.write(`\r[${hexToAnsiColor(colorInHex)}${progress}\x1b[0m${line}] ${percent}%`)
  }

  function addToTheLine(){
    startTime += interval;
    n = Math.ceil((startTime * lenght) / duration);

    drawProgressBar(lenght, n, Math.ceil((n * 100) / lenght), color);

    if (startTime > duration){
      clearInterval(intervalId);
      process.stdout.write('\nDone!');
    }
  }

  // setTimeout(() => {
  //   clearInterval(intervalId);
  //   process.stdout.write('\nDone!');
  // }, duration);
};

progress();
