import { readFromFile, splitLines, boardPrintFullRope } from '../utils';

export class Day9 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day9").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private mainImpl() {
    console.log("============== DAY 9 ==============");

    const lines = splitLines(this.stringDataIn);

    //console.log(lines);

    const directionMap: { [key: string]: number[] } = {
      "U" : [0, 1],
      "D" : [0, -1],
      "L" : [-1, 0],
      "R" : [1, 0]
    }

    let visitedArr : { [key:string]: boolean } = {
      "0.0" : true
    };

    
    let headPos = [0,0];
    let tailPos = [0,0];

    lines.forEach(move => {
      const [nextMove, numOfMovesStr] = move.split(" ");
      const numOfMoves = parseInt(numOfMovesStr);

      //console.log("Move: ", nextMove , " numOfMoves: ", numOfMoves);

      for (let currentStep = 0; currentStep < numOfMoves; currentStep++) {
        //console.log("step...");

        headPos = this.sumArr(headPos, directionMap[nextMove]);

        if(this.distance(headPos, tailPos) >= 2){
          tailPos = this.sumArr(this.subArrAndNormalise(headPos, tailPos), tailPos);
          visitedArr[tailPos[0] + "." + tailPos[1]] = true;
        }

        //boardPrint(headPos, tailPos);
      }
    });

    //console.log(visitedArr);
    
    console.log("Answer 1: ", Object.keys(visitedArr).length);

    const ropeArr = [
      [0,0], // Head
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0],
      [0,0] 
    ];

    visitedArr = {
      "0.0" : true
    };
    

    lines.forEach(move => {
      const [nextMove, numOfMovesStr] = move.split(" ");
      const numOfMoves = parseInt(numOfMovesStr);

      //console.log("Move: ", nextMove , " numOfMoves: ", numOfMoves);

      for (let currentStep = 0; currentStep < numOfMoves; currentStep++) {
          
        ropeArr[0] = this.sumArr(ropeArr[0], directionMap[nextMove]);

        for (let i = 1; i < ropeArr.length; i++) {
          if(this.distance(ropeArr[i-1], ropeArr[i]) >= 2){
            ropeArr[i] = this.sumArr(this.subArrAndNormalise(ropeArr[i-1], ropeArr[i]), ropeArr[i]);
            if(i === 9){
              visitedArr[ropeArr[9][0] + "." + ropeArr[9][1]] = true;
            }
          }
        }
        //boardPrintFullRope(ropeArr);
      }
    });

    console.log("Answer 2: ", Object.keys(visitedArr).length);

  }

  private distance(arr1 : number[], arr2 : number[]){
    return Math.sqrt(( (arr2[0] - arr1[0]) * (arr2[0] - arr1[0]) ) + (arr2[1] - arr1[1]) * (arr2[1] - arr1[1]) )
  }

  private sumArr(arr1 : number[], arr2 : number[]){
    return arr1.map(function (num, idx) {
      return num + arr2[idx];
    }); 
  }

  private subArrAndNormalise(arr1 : number[], arr2 : number[]){
    return arr1.map(function (num, idx) {
      const sub = num - arr2[idx];
      if(sub === 0)
        return 0;
      return sub < 0 ? -1 : 1;
    }); 
  }
}
