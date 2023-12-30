export type Element =
  | 'pyro'
  | 'hydro'
  | 'dendro'
  | 'electro'
  | 'anemo'
  | 'cyro'
  | 'geo'
  | 'physical';

export type DamageBuff = {
  name:
    | 'normalAttack'
    | 'chargedAttack'
    | 'plungingAttack'
    | 'skill'
    | 'burst'
    | 'pyro'
    | 'hydro'
    | 'dendro'
    | 'electro'
    | 'anemo'
    | 'cyro'
    | 'geo'
    | 'physical'
    | 'all';
  value: number;
};

export function calculateDamage(
  baseDamage: number,
  specialMulti: PercentBuff,
  specialAdd: number,
  damageBuff: PercentBuff,
  criticalBuff: PercentBuff,
  elementalReactionBuff: PercentBuff
) {
  return (
    (baseDamage * specialMulti.value + specialAdd) *
    damageBuff.value *
    criticalBuff.value *
    elementalReactionBuff.value
  );
}

//statusBuffsリストににstatusBuffを足した新しいリストを返却する
export function addStatusBuff(statusBuffs: StatusBuff[], statusBuff: StatusBuff): StatusBuff[] {
  const result: StatusBuff[] = statusBuffs.map((list) => ({
    type: list.type,
    name: list.name,
    value: list.value,
  })) as StatusBuff[];
  const existStatusBuffIndex = result.findIndex(
    (s) => s.type === statusBuff.type && s.name === statusBuff.name
  );
  if (existStatusBuffIndex === -1) {
    result.push({ ...statusBuff });
  } else {
    result[existStatusBuffIndex].value += statusBuff.value;
  }

  return result;
}

export function sumStatusBuff(
  statusBuffs1: StatusBuff[],
  statusBuffs2: StatusBuff[]
): StatusBuff[] {
  let result: StatusBuff[] = statusBuffs1.map((list) => ({
    type: list.type,
    name: list.name,
    value: list.value,
  })) as StatusBuff[];

  for (const statusBuff of statusBuffs2) {
    result = addStatusBuff(result, statusBuff);
  }
  return result;
}

export type PercentBuff = {
  type: 'percent';
  name:
    | 'hitPoint'
    | 'attack'
    | 'energyRecharge'
    | 'defense'
    | 'criticalRate'
    | 'criticalDamage'
    | 'pyro'
    | 'hydro'
    | 'dendro'
    | 'electro'
    | 'anemo'
    | 'cyro'
    | 'geo'
    | 'physical'
    | 'normalAttack'
    | 'chargedAttack'
    | 'plungingAttack'
    | 'skill'
    | 'burst'
    | 'all';
  value: number;
};

export type NumberBuff = {
  type: 'number';
  name:
    | 'hitPoint'
    | 'attack'
    | 'energyRecharge'
    | 'defense'
    | 'criticalRate'
    | 'criticalDamage'
    | 'elementalMastery';
  value: number;
};

export type StatusBuff = PercentBuff | NumberBuff;
