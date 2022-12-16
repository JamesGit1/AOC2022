import { readFromFile, splitLines } from '../utils';

export class Day5 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day5").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private mainImpl() {
    console.log("============== DAY 5 ==============");

    const lines = splitLines(this.stringDataIn);

    //let crates = [["Z","N"],["M","C","D"],["P"]];
    let crates = [["Z","P","M","H","R"],["P","C","J","B"],["S","N","H","G","L","C","D"],["F","T","M","D","Q","S","R","L"],["F","S","P","Q","B","T","Z","M"],["T","F","S","Z","B","G"],["N","R","V"],["P","G","L","T","D","V","C","M"],["W","Q","N","J","F","M","L"]];

    // console.log("CRATES");
    // console.log(crates);

    lines.forEach(line => {
      const movesArr = line.split(" ");
      //console.log(movesArr);

      const amount = parseInt(movesArr[1]);
      const from = parseInt(movesArr[3]) - 1;
      const to = parseInt(movesArr[5]) - 1;

      for (let i = 0; i < amount; i++) {
        const movedCrate = crates[from].pop();
        movedCrate && crates[to].push(movedCrate);
      }
    });

    // console.log("After");
    // console.log(crates);

    let stringConcat = "";

    crates.forEach(element => {
      stringConcat += element.at(-1);
    });

    console.log("Answer 1: ", stringConcat)


    //crates = [["Z","N"],["M","C","D"],["P"]];
    crates = [["Z","P","M","H","R"],["P","C","J","B"],["S","N","H","G","L","C","D"],["F","T","M","D","Q","S","R","L"],["F","S","P","Q","B","T","Z","M"],["T","F","S","Z","B","G"],["N","R","V"],["P","G","L","T","D","V","C","M"],["W","Q","N","J","F","M","L"]];

    lines.forEach(line => {
      const movesArr = line.split(" ");
      //console.log(movesArr);

      const amount = parseInt(movesArr[1]);
      const from = parseInt(movesArr[3]) - 1;
      const to = parseInt(movesArr[5]) - 1;

      const movedCrates = [];
      for (let i = 0; i < amount; i++) {
        const topCrate = crates[from].pop();
        //console.log(topCrate);
        movedCrates.unshift(topCrate);
      }

      //console.log(movedCrates);

      movedCrates.forEach(element => {
        if(element)
          crates[to].push(element);
      });

      //console.log(crates);
    });

    stringConcat = "";

    crates.forEach(element => {
      stringConcat += element.at(-1);
    });

    console.log("Answer 2: ", stringConcat)
  }
}
