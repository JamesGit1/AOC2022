import { readFromFile, splitLines } from '../utils';

export class Day10 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day10").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private mainImpl() {
    console.log("============== DAY 10 ==============");

    const lines = splitLines(this.stringDataIn);

    let cycle = 0;
    let lineToRead = 0;
    let X = 1;
    let toExecute = "";
    let signalStrength = 0;

    const screenLine: string[] = [];
    let lineN = 0;
    let count = 40;

    while(true){
      cycle++;
      console.log("=== CYCLE ", cycle ," START ===");
      if(count === 0){
        lineN++;
        count = 40;
      }

      if(!screenLine[lineN]){
        screenLine.push("");
      }

      console.log("Current CRT row ", screenLine[lineN]);
      

      if(cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220){
        signalStrength += cycle * X;
      }

      let commands = [];

      if(lineToRead === lines.length){
        commands[0] = "finish";
      }
      else{
        commands = lines[lineToRead].split(" ");
      }

      console.log(commands);

      console.log("X = ", X);
      
      if(commands[0] === "noop"){
        lineToRead++;
      }
      else if(toExecute === "addx"){
          toExecute = "";
          X += parseInt(commands[1]);
          lineToRead++;
      }
      else if(commands[0] === "addx"){
          toExecute = "addx";
      }

      //console.log("Current pos", screenLine[lineN].length);
      if(screenLine[lineN].length + 1 === X || screenLine[lineN].length + 1 === X-1 || screenLine[lineN].length + 1 === X+1){
        screenLine[lineN] += "#";
      }
      else{
        screenLine[lineN] += ".";
      }

      if(commands[0] === "finish"){
        break;
      }
      count--;
    }

    console.log("Answer 1: ", signalStrength);
  

    console.log(screenLine);
    
  }
}
