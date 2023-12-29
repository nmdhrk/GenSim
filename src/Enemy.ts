import { Damage } from './Character';
import { Element, StatusBuff } from './utils';

export class Enemy {
  element: Element | undefined = undefined;
  level = 90;
  elementDefenseRate = 0.9;
  elementUnit = 0;
  static canAttachElement: Element[] = ['pyro', 'cyro', 'dendro', 'electro', 'hydro'];
  static canSwirlElement: Element[] = ['pyro', 'hydro', 'electro', 'cyro'];

  calculateDamage(damage: Damage): number | number[] {
    const isCritical = Math.random() < damage.criticalRate;
    const criticalDamage = isCritical ? damage.criticalDamage : 0;
    const defenseRate = 0.5;
    const damageBuffs: StatusBuff[] = damage.buffs.filter((buff) => {
      return buff.name === damage.element || buff.name === damage.type || buff.name === 'all';
    });
    let sumDamageBuff = 0;
    for (const damageBuff of damageBuffs) {
      sumDamageBuff += damageBuff.value;
    }

    let elementalReactionsDamage = 0;
    if (this.element === undefined) {
      if (Enemy.canAttachElement.includes(damage.element)) {
        this.element = damage.element;
        this.elementUnit = damage.unit;
      }
    } else if (Enemy.canSwirlElement.includes(this.element) && damage.element === 'anemo') {
      const elementalMasteryRate =
        (16 * damage.elementalMastery) / (damage.elementalMastery + 2000);
      elementalReactionsDamage =
        0.6 * 1446.85 * (1 + elementalMasteryRate) * this.elementDefenseRate;
    }

    if (damage.onHitProcess !== undefined) {
      damage.onHitProcess(this, damage.character);
    }

    const finalDamage =
      damage.value *
      (1 + sumDamageBuff) *
      (1 + criticalDamage) *
      defenseRate *
      this.elementDefenseRate;

    if (elementalReactionsDamage === 0) {
      return finalDamage;
    } else {
      return [finalDamage, elementalReactionsDamage];
    }
  }
}
