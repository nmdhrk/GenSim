import { Attack } from './Character';
import { Element, StatusBuff } from './utils';

export class Enemy {
  element: Element | undefined = undefined;
  level = 90;
  elementDefenseRate = 0.9;
  elementUnit = 0;
  hitDamage = 0;
  static canAttachElement: Element[] = ['pyro', 'cyro', 'dendro', 'electro', 'hydro'];
  static canSwirlElement: Element[] = ['pyro', 'hydro', 'electro', 'cyro'];

  calculateDamage(attack: Attack): number | number[] {
    const isCritical = Math.random() < attack.criticalRate;
    const criticalDamage = isCritical ? attack.criticalDamage : 0;
    const defenseRate = 0.5;
    const damageBuffs: StatusBuff[] = attack.buffs.filter((buff) => {
      return buff.name === attack.element || buff.name === attack.type || buff.name === 'all';
    });
    let sumDamageBuff = 0;
    for (const damageBuff of damageBuffs) {
      sumDamageBuff += damageBuff.value;
    }

    let elementalReactionsDamage = 0;
    if (this.element === undefined) {
      if (Enemy.canAttachElement.includes(attack.element)) {
        this.element = attack.element;
        this.elementUnit = attack.unit;
      }
    } else if (Enemy.canSwirlElement.includes(this.element) && attack.element === 'anemo') {
      const elementalMasteryRate =
        (16 * attack.elementalMastery) / (attack.elementalMastery + 2000);
      elementalReactionsDamage =
        0.6 * 1446.85 * (1 + elementalMasteryRate) * this.elementDefenseRate;
    }

    if (attack.onHitProcess !== undefined) {
      attack.onHitProcess(this, attack.character);
    }

    const finalDamage =
      attack.value *
      (1 + sumDamageBuff) *
      (1 + criticalDamage) *
      defenseRate *
      this.elementDefenseRate;

    this.hitDamage += finalDamage + elementalReactionsDamage;

    if (elementalReactionsDamage === 0) {
      return finalDamage;
    } else {
      return [finalDamage, elementalReactionsDamage];
    }
  }
}
