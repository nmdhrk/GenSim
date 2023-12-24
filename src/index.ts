import { Artifact, sumArtifactStatus } from "./Artifact.js";
import { Character } from "./Character.js";
import { numberBuff, percentBuff } from "./utils.js";

const fSub1: numberBuff = { type: "number", name: "defense", value: 23 };
const fSub2: percentBuff = { type: "percent", name: "attack", value: 0.058 };
const fSub3: percentBuff = { type: "percent", name: "criticalRate", value: 0.136 };
const fSub4: percentBuff = { type: "percent", name: "criticalDamage", value: 0.148 };
const flower = new Artifact("flower", { type: "number", name: "hitPoint", value: 4780 }, [
  fSub1,
  fSub2,
  fSub3,
  fSub4,
]);

const fSub5: numberBuff = { type: "number", name: "hitPoint", value: 209 };
const fSub6: percentBuff = { type: "percent", name: "criticalRate", value: 0.035 };
const fSub7: percentBuff = { type: "percent", name: "criticalDamage", value: 0.303 };
const fSub8: numberBuff = { type: "number", name: "defense", value: 16 };
const plume = new Artifact("plume", { type: "number", name: "attack", value: 311 }, [
  fSub5,
  fSub6,
  fSub7,
  fSub8,
]);

const fSub9: numberBuff = { type: "number", name: "hitPoint", value: 538 };
const fSub10: percentBuff = { type: "percent", name: "criticalDamage", value: 0.194 };
const fSub11: numberBuff = { type: "number", name: "attack", value: 14 };
const fSub12: percentBuff = { type: "percent", name: "criticalRate", value: 0.093 };
const clock = new Artifact("clock", { type: "percent", name: "attack", value: 0.466 }, [
  fSub9,
  fSub10,
  fSub11,
  fSub12,
]);

const fSub13: percentBuff = { type: "percent", name: "energyRecharge", value: 0.104 };
const fSub14: percentBuff = { type: "percent", name: "criticalDamage", value: 0.117 };
const fSub15: percentBuff = { type: "percent", name: "defense", value: 0.255 };
const fSub16: numberBuff = { type: "number", name: "attack", value: 18 };
const goblet = new Artifact("goblet", { type: "percent", name: "attack", value: 0 }, [
  fSub13,
  fSub14,
  fSub15,
  fSub16,
]);

const fSub17: percentBuff = { type: "percent", name: "energyRecharge", value: 0.168 };
const fSub18: percentBuff = { type: "percent", name: "criticalDamage", value: 0.202 };
const fSub19: numberBuff = { type: "number", name: "elementalMastery", value: 19 };
const fSub20: numberBuff = { type: "number", name: "hitPoint", value: 508 };
const circlet = new Artifact("circlet", { type: "percent", name: "criticalRate", value: 0.311 }, [
  fSub17,
  fSub18,
  fSub19,
  fSub20,
]);

const artifacts = [flower, plume, clock, goblet, circlet];

const character = new Character(10164, 351, 0, 5, 50, 1, artifacts);

console.log(sumArtifactStatus(artifacts));
