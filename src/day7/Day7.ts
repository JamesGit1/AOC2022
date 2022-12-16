import { readFromFile, splitLines } from '../utils';

export class Day7 {
  private stringDataIn = "";
  private finalSize = 0;

  constructor(){
    readFromFile("day7").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private goBack(workingDir : string){

    const workDirArr = workingDir.split("/");
    const newArr = workDirArr.splice(0, workDirArr.length - 2);

    workingDir = "";

    newArr.forEach(element => {
      if(element === ""){
        workingDir += "/"
      }
      else{
        workingDir += element + "/"
      }
    });

    return workingDir;
  }

  private mainImpl() {
    console.log("============== DAY 7 ==============");

    const lines = splitLines(this.stringDataIn);

    let workingDir = "";

    const dirMap : { [key: string]: object; } = {
      "/" : {}
    }

    //console.log(workingDir);

    let addNextLine = false;
    

    lines.forEach(line => {
      const entry = line.split(" ");
      //console.log(entry);

      if(entry[0] === "$"){
        if(entry[1] === "cd"){
          if(entry[2] === "/"){
            workingDir = "/";
          }
          else if(entry[2] === ".."){
            workingDir = workingDir = this.goBack(workingDir);
          }
          else{
            workingDir += entry[2] + "/";
          }
          // console.log("WORKING DIR: ", workingDir);
        }

        if(entry[1] === "ls"){
          addNextLine = true;
        }
      }
      else{
        if(entry[0] === "dir"){
          const directory = entry[1];
          const fullDir = workingDir + directory + "/";
          dirMap[workingDir] = {...dirMap[workingDir], [directory] : fullDir}
        }
        else{
          const size = entry[0];
          const name = entry[1];
          dirMap[workingDir] = {...dirMap[workingDir], [name]:{size}}
        }
      }
      
    });

    //console.log(dirMap);

    let dirCount = 0;
    let bestToDelete = 0;
    let available = 0;

    Object.entries(dirMap).forEach(([key, value], index) => {
      //console.log(value);

      this.finalSize = 0;
      this.sizeCount(dirMap, value);

      //console.log("======= ", key, " SIZE: ", this.finalSize, " ========");

      if(key === "/"){
        available = 70000000 - this.finalSize;
      }
      else{
        if(available + this.finalSize >= 30000000){
          bestToDelete = this.finalSize;
        }
      }

      if(this.finalSize <= 100000){
        dirCount+=this.finalSize;
      }
    });

    console.log("Answer 1: ", dirCount);
    console.log("Answer 2: ", bestToDelete);
  }

  private sizeCount(dirMap: { [key: string]: object }, value : object){
    //console.log(Object.values(value));
    const objValuesArr = Object.values(value);

    for (let i = 0; i < objValuesArr.length; i++) {
      if(typeof objValuesArr[i] === 'string'){
        this.sizeCount(dirMap, dirMap[objValuesArr[i]]);
      }
      else if(typeof objValuesArr[i] === 'object'){
        const ValToAdd = Number(Object.values(value)[i].size);
        //console.log(ValToAdd);
        //console.log("Before: ", this.finalSize);
        //console.log("To Add: ", ValToAdd);
        this.finalSize = this.finalSize + ValToAdd;
        //console.log("SIZE HERE: ", this.finalSize);
      }
    }
  }
}
