import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  currentTimeInt: number;
  constructor() { 
    setInterval(() => {
        this.currentTimeInt =  new Date().getTime();
     }, 1000);
  }

    public convertTimestampToTime(timeStamp) {
        return new Date(timeStamp);
    }

    public getLocalTimeFromTimeStamp = function (timestamp) {
    if (timestamp === 'test') {
        return timestamp
    }
    return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString()
    }

    public getTimeLeft = function (inputTimeStamp, inputCurrentDateTime) {
        if(!inputTimeStamp){
            return '--';
        }
        var inputDateTime = new Date(inputTimeStamp);
        var endtime = inputDateTime.setDate(inputDateTime.getDate() + 1)
        var t = endtime - inputCurrentDateTime;
        var seconds = this.formatTimeNumber(Math.floor((t / 1000) % 60));
        var minutes = this.formatTimeNumber(Math.floor((t / 1000 / 60) % 60));
        var hours = this.formatTimeNumber(Math.floor((t / (1000 * 60 * 60)) % 24));
        if (t < 0) {
            return 'Bid Won';
        }
        return hours + ':' + minutes + ':' + seconds;       
    }

    private formatTimeNumber = function (input) {
        if (input.toString().length > 1) {
            return input;
        } else {
            return "0" + input;
        }
    }   


}