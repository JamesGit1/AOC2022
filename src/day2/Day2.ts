import { readFromFile } from '../utils';

export class Day2 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day2").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private splitLines(t: string) { return t.split(/\r\n|\r|\n/); }

  private mainImpl() {
    console.log("============== DAY 2 ==============");

    const lines = this.splitLines(this.stringDataIn);

    const translateDict: {[key: string]: number} = {
      "A" : 1, // Rock
      "X" : 1,
      "B" : 2, // Paper
      "Y" : 2,
      "C" : 3, // Scissors
      "Z" : 3
    }
    
    let totalScore = 0;

    lines.forEach(line => {
      let score = 0;
      const oppLetter = line[0];
      const myLetter = line[2];

      // Draw
      if(translateDict[oppLetter] === translateDict[myLetter])
        score += 3;

      // Wins, Rock beats Scissors , Paper beats Rock , Scissors beats paper
      if((myLetter === "X" && oppLetter === "C") || (myLetter === "Y" && oppLetter === "A") || (myLetter === "Z" && oppLetter === "B"))
        score += 6;
      
      score += translateDict[myLetter];

      totalScore += score;
    });

    console.log("Answer 1: ", totalScore);


    totalScore = 0;

    lines.forEach(line => {
      let score = 0;
      const oppLetter = line[0];
      const gameLetter = line[2];

      // Game is loss
      if(gameLetter === "X"){
        if(oppLetter == "A"){
          score += 3;
        }
        if(oppLetter == "B"){
          score += 1;
        }
        if(oppLetter == "C"){
          score += 2;
        }
      }

      // Game is draw
      if(gameLetter === "Y"){
        score += translateDict[oppLetter];
        score += 3;
      }
        
      // Game is win
      if(gameLetter === "Z"){
        if(oppLetter == "A"){
          score += 2;
        }
        if(oppLetter == "B"){
          score += 3;
        }
        if(oppLetter == "C"){
          score += 1;
        }
        score += 6;
      }
       
      totalScore += score;

      //console.log("TOTAL :", score);
    });

    console.log("Answer 2: ", totalScore);
  }
}
