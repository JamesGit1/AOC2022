import { readFromFile } from '../utils';

export class Day1 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day1").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private splitLines(t: string) { return t.split(/\r\n|\r|\n/); }

  private mainImpl() {
    console.log("============== DAY 1 ==============");

    const lines = this.splitLines(this.stringDataIn);

    const maxElf: number[] = [0, 0, 0];
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
      if(lines[i].length < 1){
        if(total > maxElf[maxElf.length-1]){
          maxElf.unshift(total);
          maxElf.sort((n1,n2) => n2 - n1);
          if(maxElf.length > 3)
            maxElf.pop();
        }
        total = 0;
      }
      else{
        total += parseInt(lines[i]);
      }
    }

    console.log("Answer 1: ", maxElf[0]);
    console.log("Answer 2: ", maxElf[0] + maxElf[1] + maxElf[2]);
    

  }
}
