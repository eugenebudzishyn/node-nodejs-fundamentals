const progress = () => {
  // Write your code here
  // Simulate progress bar from 0% to 100% over ~5 seconds
  // Update in place using \r every 100ms
  // Format: [████████████████████          ] 67%

  let args = process.argv.slice(2);

  let duration = 5000;

  let interval = 100;

  let lenght = 30;

  let color = "#ff8800";

  let totalTimePassed = 0;
  
  function addToTheLine(){
    process.stdout.write("\r[] 0%");
  }
  setInterval(addToTheLine, interval)
};

progress();
