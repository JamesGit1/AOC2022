import { readFromFile, splitLines } from '../utils';

export class Day4 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day4").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private containsAll(array: number[], containedWithin: number[]){
    return array.every(element => {
      return containedWithin.includes(element);
    });
  }

  private mainImpl() {
    console.log("============== DAY 4 ==============");

    const lines = splitLines(this.stringDataIn)

    let totalContained = 0;
    let totalOverlapped = 0;

    lines.forEach(line => {
      const ranges = line.split(",");
      //console.log(ranges);
      
      const fromto1 = ranges[0].split("-").map(Number);
      const fromto2 = ranges[1].split("-").map(Number);

      let currentVal = fromto1[0];
      const fromto1FullArr = [currentVal];
      while(currentVal !== fromto1[1]){
        currentVal++;
        fromto1FullArr.push(currentVal);
      }

      //console.log("ARRAY 1: ", fromto1FullArr);

      currentVal = fromto2[0];
      const fromto2FullArr = [currentVal];
      while(currentVal !== fromto2[1]){
        currentVal++;
        fromto2FullArr.push(currentVal);
      }

      //console.log("ARRAY 2: ", fromto2FullArr);

      if(this.containsAll(fromto1FullArr, fromto2FullArr) || this.containsAll(fromto2FullArr, fromto1FullArr)){
        totalContained++;
      }

      for (let i = 0; i < fromto1FullArr.length; i++) {
        if(fromto2FullArr.includes(fromto1FullArr[i])){
          totalOverlapped++;
          break;
        }
      }
    });

    console.log("Answer 1: ", totalContained);
    console.log("Answer 2: ", totalOverlapped);

  }
}
