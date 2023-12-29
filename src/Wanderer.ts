import { Artifact } from './Artifact.js';
import { Character, Damage } from './Character.js';
import { Weapon } from './Weapon.js';
import { StatusBuff } from './utils.js';

export class Wanderer extends Character {
  isHover: boolean = false;
  skillCoolTime: number = 6;
  burstCoolTime: number = 15;
  burstEnergy: number = 60;

  constructor(artifacts: Artifact[], weapon: Weapon) {
    super(10164, 328, 607, 0, 0.242, 0.5, 1, artifacts, weapon);
  }

  normalAttack(statusBuffs: StatusBuff[]): Damage[] {
    const attack = this.calculateAttack(statusBuffs);
    const criticalRate = this.calculateCriticalRate(statusBuffs);
    const criticalDamage = this.calculateCriticalDamage(statusBuffs);
    const elementalMastery = this.calculateElementalMastery(statusBuffs);
    const hoverBuff = this.isHover ? 1.537 : 1;
    const damage1: Damage = {
      type: 'normalAttack',
      element: 'anemo',
      value: attack * 1.358 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage2: Damage = {
      type: 'normalAttack',
      element: 'anemo',
      value: attack * 1.285 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage3: Damage = {
      type: 'normalAttack',
      element: 'anemo',
      value: attack * 0.942 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage4: Damage = {
      type: 'normalAttack',
      element: 'anemo',
      value: attack * 0.942 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };

    return [damage1, damage2, damage3, damage4];
  }

  chargeAttack(statusBuffs: StatusBuff[]): Damage[] {
    const attack = this.calculateAttack(statusBuffs);
    const criticalRate = this.calculateCriticalRate(statusBuffs);
    const criticalDamage = this.calculateCriticalDamage(statusBuffs);
    const elementalMastery = this.calculateElementalMastery(statusBuffs);
    const hoverBuff = this.isHover ? 1.43 : 1;
    const damage: Damage = {
      type: 'chargedAttack',
      element: 'anemo',
      value: attack * 2.377 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    return [damage];
  }

  skill(statusBuffs: StatusBuff[]): Damage[] {
    const attack = this.calculateAttack(statusBuffs);
    const criticalRate = this.calculateCriticalRate(statusBuffs);
    const criticalDamage = this.calculateCriticalDamage(statusBuffs);
    const elementalMastery = this.calculateElementalMastery(statusBuffs);
    const damage: Damage = {
      type: 'skill',
      element: 'anemo',
      value: attack * 1.714,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };

    this.isHover = true;

    return [damage];
  }

  burst(statusBuffs: StatusBuff[]): Damage[] {
    const attack = this.calculateAttack(statusBuffs);
    const criticalRate = this.calculateCriticalRate(statusBuffs);
    const criticalDamage = this.calculateCriticalDamage(statusBuffs);
    const elementalMastery = this.calculateElementalMastery(statusBuffs);
    const damage: Damage = {
      type: 'burst',
      element: 'anemo',
      value: attack * 2.65,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };

    this.isHover = false;

    return [damage, damage, damage, damage, damage];
  }

  disableHover() {
    this.isHover = false;
  }
}
