import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { StatusBuff } from './utils';

export class Weapon {
  readonly attack: number;
  readonly mainStatus: StatusBuff;
  constructor(attack: number, mainStatus: StatusBuff) {
    this.attack = attack;
    this.mainStatus = mainStatus;
  }

  static createFromJson(filePath: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const jsonBuffer = fs.readFileSync(path.resolve(__dirname, filePath));
    const jsonString = jsonBuffer.toString();

    const jsonData = JSON.parse(jsonString);
    const weapon = new Weapon(jsonData.attack, jsonData.mainStatus);

    return weapon;
  }
}
