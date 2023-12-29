import { Artifact } from './Artifact.js';
import { Enemy } from './Enemy.js';
import { Wanderer } from './Wanderer.js';
import { Weapon } from './Weapon.js';
import { StatusBuff } from './utils.js';

const artifacts = Artifact.createArtifactsFromJson([
  '../dataJson/artifact1.json',
  '../dataJson/artifact2.json',
  '../dataJson/artifact3.json',
  '../dataJson/artifact4.json',
  '../dataJson/artifact5.json',
]);

const weapon = Weapon.createFromJson('../dataJson/weapon1.json');

const shimeken: StatusBuff = { type: 'percent', name: 'attack', value: 0.36 };

const wanderer = new Wanderer(artifacts, weapon);
wanderer.attachedElement = 'cyro';
const enemy = new Enemy();
enemy.element = 'pyro';

const skill = wanderer.skill([shimeken]);
console.log(`スキル:${enemy.calculateDamage(skill[0])}`);
console.log(wanderer.calculateStatus([shimeken]));
const normalAttacks = wanderer.normalAttack([shimeken]);
console.log(`通常攻撃1:${enemy.calculateDamage(normalAttacks[0])}`);
console.log(`通常攻撃2:${enemy.calculateDamage(normalAttacks[1])}`);
console.log(
  `通常攻撃3:${enemy.calculateDamage(normalAttacks[2])}+${enemy.calculateDamage(normalAttacks[3])}`
);

const chargeAttack = wanderer.chargeAttack([shimeken]);
console.log(`重撃:${enemy.calculateDamage(chargeAttack[0])}`);

const burst = wanderer.burst([shimeken]);
console.log(`元素爆発:${enemy.calculateDamage(burst[0])}`);

const normalAttacks2 = wanderer.normalAttack([shimeken]);
console.log(`通常攻撃1:${enemy.calculateDamage(normalAttacks2[0])}`);
console.log(`通常攻撃2:${enemy.calculateDamage(normalAttacks2[1])}`);
console.log(
  `通常攻撃3:${enemy.calculateDamage(normalAttacks2[2])}+${enemy.calculateDamage(
    normalAttacks2[3]
  )}`
);

console.log(wanderer.calculateStatus([shimeken]));
