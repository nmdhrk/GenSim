import { Damage } from './Character';
import { StatusBuff } from './utils';

export class Enemy {
  element: Element | undefined = undefined;
  level = 90;
  elementDefenseRate = 0.9;

  calculateDamage(damage: Damage): number {
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

    return (
      damage.value *
      (1 + sumDamageBuff) *
      (1 + criticalDamage) *
      defenseRate *
      this.elementDefenseRate
    );
  }
}
