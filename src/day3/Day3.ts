import { readFromFile, splitLines, splitIntoTwo } from '../utils';

export class Day3 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day3").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private mainImpl() {
    console.log("============== DAY 3 ==============");

    const lines = splitLines(this.stringDataIn)
    let total = 0;

    lines.forEach(line => {
      const [firstHalf, secondHalf] = splitIntoTwo(line, line.length / 2);

      let matchingLetter = "NONE";

      for (let c = 0; c < firstHalf.length; c++) {
          if(secondHalf.includes(firstHalf[c])){
            matchingLetter = firstHalf[c];
            break;
          }      
      }

      let numVal = 0;
      if(matchingLetter.charCodeAt(0) > 96){
        numVal = matchingLetter.charCodeAt(0) - 96;
      }
      else{
        numVal = matchingLetter.charCodeAt(0) - 38;
      }

      total += numVal;
    });

    console.log("Answer 1: ", total);

    let lineArray = [];
    total = 0;

    for (let i = 0; i < lines.length; i++) {
      lineArray.push(lines[i]);
      if((i+1) % 3 === 0){
        let matchingLetter = "NONE";

        lineArray.sort(function(a, b){
          return b.length - a.length;
        });

        for (let c = 0; c < lineArray[0].length; c++) {
          if(lineArray[1].includes(lineArray[0][c]) && lineArray[2].includes(lineArray[0][c])){
            matchingLetter = lineArray[0][c]
            break;
          }
        }

        let numVal = 0;
        if(matchingLetter.charCodeAt(0) > 96){
          numVal = matchingLetter.charCodeAt(0) - 96;
        }
        else{
          numVal = matchingLetter.charCodeAt(0) - 38;
        }
  
        total += numVal;

        lineArray = [];
      }
    }

    console.log("Answer 2: ", total);

  }
}
