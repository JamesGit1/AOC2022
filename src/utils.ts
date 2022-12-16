import { promises as fs } from "fs";

export async function readFromFile(day : string) {
  const data = await fs.readFile(`src/${day}/input.txt`, "binary");
  return data.toString();
}

export function splitLines(t: string) { return t.split(/\r\n|\r|\n/); }

export function splitIntoTwo(str: string, index: number) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}

export function arrayPrint(arr: unknown[][]){
  console.log(" | 0 1 2 3 4");
  console.log("============");
  for (let y = 0; y < arr.length; y++) {
    let line = y + "|";
    for (let x = 0; x < arr[y].length; x++) {
      line += " " + arr[x][y];
    }
    console.log(line);
  }
}

export function boardPrint(arrH: number[], arrT: number[]){
  console.log(" | 0 1 2 3 4 5");
  console.log("==============");
  for (let y = 4; y > -1; y--) {
    let line = y + "|";
    for (let x = 0; x < 6; x++) {
      if(arrH[0] === x && arrH[1] === y){
        line += " H";
      }
      else if(arrT[0] === x && arrT[1] === y){
        line += " T";
      }
      else{
        line += " .";
      }
    }
    console.log(line);
  }
}


// export function boardPrintFullRope(arr : number[][]){
//   console.log(" | 0 1 2 3 4 5");
//   console.log("==============");
//   for (let y = 4; y > -1; y--) {
//     let line = y + "|";
//     for (let x = 0; x < 6; x++) {
//       let dot = true;
//       for (let i = arr.length - 1; i > -1; i--) {
//         if(arr[i][0] === x && arr[i][1] === y){
//           // console.log("LINE: ", line);
//           // console.log("CHAR: ", line[line.length - 1]);

//           // console.log(parseInt(line[line.length - 1]));

//           //console.log(line);

//           // if(parseInt(line[line.length - 1]) > -1){
//           //   line = line.slice(0, -2);
//           // }

//           dot = false;

//           if(i === 0){
//             line += " H";
//           }
//           else{
//             line += " " + i;
//           }
          
//         }
//       }
//       if(dot){
//         line += " .";
//       }
//     }
//     console.log(line);
//   }
// }

export function boardPrintFullRope(arr : number[][]){
  console.log();
  for (let y = 4; y > -1; y--) {
    let line = "";
    for (let x = 0; x < 6; x++) {
      let toPrint = " ."
      for (let i = arr.length - 1; i > -1; i--) {
        if(arr[i][0] === x && arr[i][1] === y){
          if(i === 0){
            toPrint = " H"; 
          }
          else{
            toPrint = " " + i; 
          }
          
        }
      }
      line += toPrint;
    }
    console.log(line);
  }
  console.log();
}