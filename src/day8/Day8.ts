import { readFromFile, splitLines, arrayPrint } from '../utils';

export class Day8 {
  private stringDataIn = "";
  private treeArr: number[][] = [[]];

  constructor(){
    readFromFile("day8").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private checkDirLR(x : number, y : number, height : number, dir : number){
    let toCheck = x;
    while(toCheck > 0 && toCheck < this.treeArr[toCheck].length - 1){
      toCheck += dir;
      //console.log("Checking " + toCheck + " , " + y , " height: ", this.treeArr[toCheck][y]);
      if(this.treeArr[toCheck][y] >= height){
        //console.log("TREE " + x + " , " + y + " is NOT visible");
        break;
      }
      else if(toCheck === 0 || toCheck === this.treeArr[toCheck].length - 1){
        //console.log("TREE " + x + " , " + y + " is visible");
        return true;
      }
    }
  }

  private checkDirUD(x : number, y : number, height : number, dir : number){
    let toCheck = y;
    while(toCheck > 0 && toCheck < this.treeArr[x].length - 1){
      toCheck += dir;
      //console.log("Checking " + toCheck + " , " + y , " height: ", this.treeArr[toCheck][y]);
      if(this.treeArr[x][toCheck] >= height){
        //console.log("TREE " + x + " , " + y + " is NOT visible");
        break;
      }
      else if(toCheck === 0 || toCheck === this.treeArr[x].length - 1){
        //console.log("TREE " + x + " , " + y + " is visible");
        return true;
      }
    }
  }

  private mainImpl() {
    console.log("============== DAY 8 ==============");

    const lines = splitLines(this.stringDataIn);

    this.treeArr = Array(lines.length).fill(0).map(() => Array(lines.length));

    lines.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        this.treeArr[x][y] = parseInt(line[x]);
      }
    });

    //arrayPrint(this.treeArr);

    let visibleTrees = 0;
    let bestScenicScore = 0;

    for (let x = 0; x < this.treeArr.length; x++) {
      for (let y = 0; y < this.treeArr[x].length; y++) {
        if(x === 0 || y === 0 || x === this.treeArr.length-1 || y === this.treeArr[x].length-1){
          visibleTrees++;
        }
        else{
          //console.log("TREE " + x + " , " + y + " height: ", height);

          if(this.checkDirLR(x, y, this.treeArr[x][y], -1) || this.checkDirLR(x, y, this.treeArr[x][y], 1) || this.checkDirUD(x,y,this.treeArr[x][y],-1) || this.checkDirUD(x,y,this.treeArr[x][y],1))
            visibleTrees++;
        }

        const scenicScore = this.scoreDir(x, y, -1 , 0) * this.scoreDir(x, y, 1 , 0) * this.scoreDir(x, y, 0 , -1) * this.scoreDir(x, y, 0, 1);
        if(scenicScore > bestScenicScore)
          bestScenicScore = scenicScore;
          //console.log("scenicScore FOR", x , " ," , y , " SCORE:", scenicScore);
      }
    }

    console.log("Answer 1: ", visibleTrees);
    console.log("Answer 2: ", bestScenicScore);
    
  }

  private scoreDir(x: number, y: number, dirX: number, dirY:number) {
    let score = 1;
    let toCheckX = x;
    let toCheckY = y;

    toCheckX+=dirX;
    toCheckY+=dirY;
    
    if(x === 0 || x === this.treeArr[x].length - 1 || y === 0 || y === this.treeArr[y].length - 1){
      score = 0;
    }
    else{
      while(toCheckX > 0 && toCheckY > 0 && toCheckX <  this.treeArr[x].length - 1 && toCheckY < this.treeArr[x].length - 1){
          if(this.treeArr[toCheckX][toCheckY] >= this.treeArr[x][y] ){
            break;
          }
          else{
            score++;
          }

          toCheckX+=dirX;
          toCheckY+=dirY;
      }
    }
    return score;
  }
}
