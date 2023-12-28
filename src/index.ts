import { Artifact } from "./Artifact.js";
import { Character } from "./Character.js";
import { Weapon } from "./Weapon.js";
import { StatusBuff } from "./utils.js";

const flower = Artifact.createFromJson("../dataJson/artifact1.json");
const plume = Artifact.createFromJson("../dataJson/artifact2.json");
const clock = Artifact.createFromJson("../dataJson/artifact3.json");
const goblet = Artifact.createFromJson("../dataJson/artifact4.json");
const circlet = Artifact.createFromJson("../dataJson/artifact5.json");

const artifacts = [flower, plume, clock, goblet, circlet];

const weapon = new Weapon(23, { type: "number", name: "attack", value: 0 });

const shimeken: StatusBuff = { type: "percent", name: "attack", value: 0.36 };

const wanderer = Character.createFromJson("../dataJson/Wanderer.json", artifacts, weapon);
