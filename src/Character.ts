import { Artifact } from "./Artifact.js";
import { statusBuff } from "./utils.js";

export class Character {
  baseMaxHitPoint: number;
  baseAttack: number;
  elementalMastery: number;
  criticalRate: number;
  criticalDamage: number;
  energyRecharge: number;
  artifacts: Artifact[];
  constructor(
    baseMaxHitPoint: number,
    baseAttack: number,
    elementalMastery: number,
    criticalRate: number,
    criticalDamage: number,
    energyRecharge: number,
    artifacts: Artifact[]
  ) {
    this.baseMaxHitPoint = baseMaxHitPoint;
    this.baseAttack = baseAttack;
    this.elementalMastery = elementalMastery;
    this.criticalRate = criticalRate;
    this.criticalDamage = criticalDamage;
    this.energyRecharge = energyRecharge;
    this.artifacts = artifacts;
  }

  calculateStatus(statusBuffs: statusBuff[]) {}
}
