export class Bid {
  isWinningBid: boolean;
  playerId: string;
  salary: number;
  years: number;
  totalValue: number;
  userId: string;
  time: object;
  $key: string;

  constructor(isWinningBid: boolean, playerId: string, salary: number,
                years: number, totalValue: number, userId: string, time: object) {
    this.isWinningBid = isWinningBid;
    this.playerId = playerId;
    this.salary = salary;
    this.years = years;
    this.totalValue = totalValue;
    this.userId = userId;
    this.time = time;
  }
}