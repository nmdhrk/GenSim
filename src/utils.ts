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

export function addStatusBuff(statusBuffs: statusBuff[], statusBuff: statusBuff): void {
  const existStatusBuffIndex = statusBuffs.findIndex(
    (s) => s.type === statusBuff.type && s.name === statusBuff.name
  );
  if (existStatusBuffIndex === -1) {
    statusBuffs.push(statusBuff);
  } else {
    statusBuffs[existStatusBuffIndex].value += statusBuff.value;
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
