import { Artifact } from './Artifact.js';
import { Character, Damage } from './Character.js';
import { Enemy } from './Enemy.js';
import { Weapon } from './Weapon.js';
import { Element, PercentBuff, StatusBuff, addStatusBuff } from './utils.js';

export class Wanderer extends Character {
  isHover: boolean = false;
  skillCoolTime: number = 6;
  burstCoolTime: number = 15;
  burstEnergy: number = 60;
  attachedElement: Element | undefined = undefined;

  isPyroBuff: boolean = false;
  isElectroBuff: boolean = false;
  isCyroBuff: boolean = false;

  constructor(artifacts: Artifact[], weapon: Weapon) {
    super(10164, 328, 607, 0, 0.242, 0.5, 1, artifacts, weapon);
  }

  override calculateAttack(statusBuffs: StatusBuff[]): number {
    const pyroBuff: PercentBuff = {
      type: 'percent',
      name: 'attack',
      value: this.isPyroBuff ? 0.3 : 0,
    };

    return super.calculateAttack(addStatusBuff(statusBuffs, pyroBuff));
  }

  override calculateCriticalRate(statusBuffs: StatusBuff[]): number {
    const cyroBuff: PercentBuff = {
      type: 'percent',
      name: 'criticalRate',
      value: this.isCyroBuff ? 0.2 : 0,
    };

    return super.calculateCriticalRate(addStatusBuff(statusBuffs, cyroBuff));
  }

  normalAttack(statusBuffs: StatusBuff[]): Damage[] {
    const attack = this.calculateAttack(statusBuffs);
    const criticalRate = this.calculateCriticalRate(statusBuffs);
    const criticalDamage = this.calculateCriticalDamage(statusBuffs);
    const elementalMastery = this.calculateElementalMastery(statusBuffs);
    const hoverBuff = this.isHover ? 1.537 : 1;
    const damage1: Damage = {
      character: this,
      type: 'normalAttack',
      element: 'anemo',
      unit: 1,
      value: attack * 1.358 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage2: Damage = {
      character: this,
      type: 'normalAttack',
      element: 'anemo',
      unit: 1,
      value: attack * 1.285 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage3: Damage = {
      character: this,
      type: 'normalAttack',
      element: 'anemo',
      unit: 1,
      value: attack * 0.942 * hoverBuff,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };
    const damage4: Damage = {
      character: this,
      type: 'normalAttack',
      element: 'anemo',
      unit: 1,
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
      character: this,
      type: 'chargedAttack',
      element: 'anemo',
      unit: 1,
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

    if (this.attachedElement === 'pyro') {
      this.isPyroBuff = true;
    } else if (this.attachedElement === 'cyro') {
      this.isCyroBuff = true;
    } else if (this.attachedElement === 'electro') {
      this.isElectroBuff = true;
    }

    const onHitProcess = function (enemy: Enemy, wanderer: Character) {
      console.log(`敵の付着元素は${enemy.element}でありんす`);
      if (enemy.element! === 'pyro') {
        (wanderer as Wanderer).isPyroBuff = true;
      }
      if (enemy.element! === 'cyro') {
        (wanderer as Wanderer).isCyroBuff = true;
      }
      if (enemy.element! === 'electro') {
        (wanderer as Wanderer).isElectroBuff = true;
      }
    };

    const damage: Damage = {
      character: this,
      type: 'skill',
      element: 'anemo',
      unit: 1,
      value: attack * 1.714,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
      onHitProcess: onHitProcess,
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
      character: this,
      type: 'burst',
      element: 'anemo',
      unit: 1,
      value: attack * 2.65,
      elementalMastery: elementalMastery,
      criticalRate: criticalRate,
      criticalDamage: criticalDamage,
      buffs: statusBuffs,
    };

    this.disableHover();

    return [damage, damage, damage, damage, damage];
  }

  disableHover() {
    this.isHover = false;
    this.isCyroBuff = false;
    this.isPyroBuff = false;
    this.isElectroBuff = false;
  }
}
