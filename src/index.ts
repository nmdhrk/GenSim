import { Artifact } from "./Artifact.js";
import { Enemy } from "./Enemy.js";
import { Wanderer } from "./Wanderer.js";
import { Weapon } from "./Weapon.js";
import { StatusBuff } from "./utils.js";

const flower = Artifact.createFromJson("../dataJson/artifact1.json");
const plume = Artifact.createFromJson("../dataJson/artifact2.json");
const clock = Artifact.createFromJson("../dataJson/artifact3.json");
const goblet = Artifact.createFromJson("../dataJson/artifact4.json");
const circlet = Artifact.createFromJson("../dataJson/artifact5.json");

const artifacts = [flower, plume, clock, goblet, circlet];

const weapon = Weapon.createFromJson("../dataJson/weapon1.json");

const shimeken: StatusBuff = { type: "percent", name: "attack", value: 0.36 };
const soko1: StatusBuff = { type: "percent", name: "normalAttack", value: 0.16 };
const soko2: StatusBuff = { type: "percent", name: "chargedAttack", value: 0.16 };

const wanderer = new Wanderer(artifacts, weapon);
const enemy = new Enemy();

const normalAttacks = wanderer.normalAttack([shimeken, soko1, soko2]);
const chargeAttack = wanderer.chargeAttack([shimeken, soko1, soko2]);

console.log(enemy.calculateDamage(normalAttacks[0]));
console.log(enemy.calculateDamage(normalAttacks[1]));
console.log(enemy.calculateDamage(normalAttacks[2]));
console.log(enemy.calculateDamage(normalAttacks[3]));
console.log(enemy.calculateDamage(chargeAttack[0]));
