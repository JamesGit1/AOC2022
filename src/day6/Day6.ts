import { readFromFile } from '../utils';

export class Day6 {
  private stringDataIn = "";

  constructor(){
    readFromFile("day6").then((data) => {
      this.stringDataIn = data;
      this.mainImpl();
    })
  }

  private markerFinder(markerLength : number){
    const packet: string[] = [];
    let packageMarker = 0;

    for (let i = 0; i < this.stringDataIn.length; i++) {
      packet.push(this.stringDataIn[i]);
      if(packet.length === markerLength){
        const tempPacket: string[] = [];
        let correct = false;
        packet.forEach(element => {
          if(!tempPacket.includes(element)){
            if(tempPacket.push(element) === markerLength){
              correct = true;
            }
          }
        });

        if(correct){
          packageMarker = i+1;
          break;
        }
        else{
          packet.shift();
        }
      }
    }

    return packageMarker;
  }

  private mainImpl() {
    console.log("============== DAY 6 ==============");

    //console.log(data);
    
    console.log("Answer 1: ", this.markerFinder(4));
    console.log("Answer 2: ", this.markerFinder(14));

  }
}
