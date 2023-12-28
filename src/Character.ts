import { Artifact, sumArtifactStatusBuff } from "./Artifact.js";
import { addStatusBuff, Element, StatusBuff, sumStatusBuff } from "./utils.js";
import { Weapon } from "./Weapon.js";

export type Status = {
  hitPoint: number;
  attack: number;
  defense: number;
  elementalMastery: number;
  criticalRate: number;
  criticalDamage: number;
  energyRecharge: number;
};

export type Attack = {
  element: Element;
  TENPU: number;
};

export type Damage = {
  type: "normalAttack" | "chargedAttack" | "plungingAttack" | "skill" | "burst";
  element: Element;
  value: number;
  criticalRate: number;
  criticalDamage: number;
  buffs: StatusBuff[];
};

export abstract class Character {
  readonly baseHitPoint: number;
  readonly baseAttack: number;
  readonly baseDefense: number;
  readonly elementalMastery: number;
  readonly criticalRate: number;
  readonly criticalDamage: number;
  readonly energyRecharge: number;
  readonly artifacts: Artifact[];
  readonly weapon: Weapon;
  constructor(
    baseHitPoint: number,
    baseAttack: number,
    baseDefense: number,
    elementalMastery: number,
    criticalRate: number,
    criticalDamage: number,
    energyRecharge: number,
    artifacts: Artifact[],
    weapon: Weapon
  ) {
    this.weapon = weapon;
    this.baseHitPoint = baseHitPoint;
    this.baseAttack = baseAttack + weapon.attack;
    this.baseDefense = baseDefense;
    this.elementalMastery = elementalMastery;
    this.criticalRate = criticalRate;
    this.criticalDamage = criticalDamage;
    this.energyRecharge = energyRecharge;
    this.artifacts = artifacts;
  }

  abstract normalAttack(statusBuffs: StatusBuff[]): Damage[];

  abstract chargeAttack(statusBuffs: StatusBuff[]): Damage[];

  //abstract skill(statusBuffs: StatusBuff[]): Damage[];

  //abstract burst(statusBuffs: StatusBuff[]): Damage[];

  calculateAttack(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);

    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const attackPercentBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "attack") ?? { value: 0 }
    ).value;

    const attackNumberBuff: number = (
      finalStatusBuffs.find((x) => x.type === "number" && x.name === "attack") ?? { value: 0 }
    ).value;
    const attack: number = this.baseAttack * (1 + attackPercentBuff) + attackNumberBuff;
    return attack;
  }

  calculateDefense(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);

    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const defensePercentBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "defense") ?? { value: 0 }
    ).value;

    const defenseNumberBuff: number = (
      finalStatusBuffs.find((x) => x.type === "number" && x.name === "defense") ?? { value: 0 }
    ).value;
    const defense: number = this.baseDefense * (1 + defensePercentBuff) + defenseNumberBuff;
    return defense;
  }

  calculateHitPoint(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);

    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const hitPointPercentBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "hitPoint") ?? { value: 0 }
    ).value;

    const hitPointNumberBuff: number = (
      finalStatusBuffs.find((x) => x.type === "number" && x.name === "hitPoint") ?? { value: 0 }
    ).value;
    const hitPoint: number = this.baseHitPoint * (1 + hitPointPercentBuff) + hitPointNumberBuff;
    return hitPoint;
  }

  calculateCriticalRate(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);
    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const criticalRateBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "criticalRate") ?? {
        value: 0,
      }
    ).value;

    const criticalRate: number = this.criticalRate + criticalRateBuff;
    return criticalRate;
  }

  calculateCriticalDamage(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);
    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const criticalDamageBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "criticalDamage") ?? {
        value: 0,
      }
    ).value;

    const criticalDamage: number = this.criticalDamage + criticalDamageBuff;
    return criticalDamage;
  }

  calculateElementalMastery(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);
    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const elementalMasteryBuff: number = (
      finalStatusBuffs.find((x) => x.type === "number" && x.name === "elementalMastery") ?? {
        value: 0,
      }
    ).value;

    const elementalMastery: number = this.elementalMastery + elementalMasteryBuff;
    return elementalMastery;
  }

  calculateEnergyRecharge(statusBuffs: StatusBuff[]) {
    const artifactStatusBuffs: StatusBuff[] = sumArtifactStatusBuff(this.artifacts);
    const finalStatusBuffs: StatusBuff[] = addStatusBuff(
      sumStatusBuff(artifactStatusBuffs, statusBuffs),
      this.weapon.mainStatus
    );
    const energyRechargeBuff: number = (
      finalStatusBuffs.find((x) => x.type === "percent" && x.name === "energyRecharge") ?? {
        value: 0,
      }
    ).value;

    const energyRecharge: number = this.energyRecharge + energyRechargeBuff;
    return energyRecharge;
  }

  calculateStatus(statusBuffs: StatusBuff[]): Status {
    const result: Status = {
      hitPoint: this.calculateHitPoint(statusBuffs),
      attack: this.calculateAttack(statusBuffs),
      defense: this.calculateDefense(statusBuffs),
      elementalMastery: this.calculateElementalMastery(statusBuffs),
      criticalRate: this.calculateCriticalRate(statusBuffs),
      criticalDamage: this.calculateCriticalDamage(statusBuffs),
      energyRecharge: this.calculateEnergyRecharge(statusBuffs),
    };

    return result;
  }
}
