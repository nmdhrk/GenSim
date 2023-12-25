export function calculateAttack(
  baseAttack: number,
  attackBuffPercent: percentBuff,
  attackBuffNumber: number
) {
  return baseAttack * (1 + attackBuffPercent.value) + attackBuffNumber;
}

export function calculateDamage(
  baseDamage: number,
  specialMulti: percentBuff,
  specialAdd: number,
  damageBuff: percentBuff,
  criticalBuff: percentBuff,
  elementalReactionBuff: percentBuff
) {
  return (
    (baseDamage * specialMulti.value + specialAdd) *
    damageBuff.value *
    criticalBuff.value *
    elementalReactionBuff.value
  );
}

export function addStatusBuff(statusBuffs: statusBuff[], statusBuff: statusBuff): statusBuff[] {
  const result: statusBuff[] = [];
  const existStatusBuffIndex = statusBuffs.findIndex(
    (s) => s.type === statusBuff.type && s.name === statusBuff.name
  );
  if (existStatusBuffIndex === -1) {
    result.push(statusBuff);
  } else {
    result.push({
      type: statusBuff.type,
      name: statusBuff.name,
      value: statusBuffs[existStatusBuffIndex].value + statusBuff.value,
    } as statusBuff);
  }

  return result;
}

export function sumStatusBuff(
  // TODO 副作用がない形に修正が必要
  statusBuffs1: statusBuff[],
  statusBuffs2: statusBuff[]
) {
  for (const statusBuff2 of statusBuffs2) {
    addStatusBuff(statusBuffs1, statusBuff2);
  }
}

export type percentBuff = {
  type: "percent";
  name: "hitPoint" | "attack" | "energyRecharge" | "defense" | "criticalRate" | "criticalDamage";
  value: number;
};

export type numberBuff = {
  type: "number";
  name:
    | "hitPoint"
    | "attack"
    | "energyRecharge"
    | "defense"
    | "criticalRate"
    | "criticalDamage"
    | "elementalMastery";
  value: number;
};

export type statusBuff = percentBuff | numberBuff;
