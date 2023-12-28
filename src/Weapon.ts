import { StatusBuff } from "./utils";

export class Weapon {
  readonly attack: number;
  readonly mainStatus: StatusBuff;
  constructor(attack: number, mainStatus: StatusBuff) {
    this.attack = attack;
    this.mainStatus = mainStatus;
  }
}
