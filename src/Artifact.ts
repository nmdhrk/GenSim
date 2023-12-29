import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { addStatusBuff, StatusBuff } from './utils.js';

export type MainStatus = StatusBuff;
export type SubStatuses = StatusBuff[];
export type ArtifactPart = 'flower' | 'plume' | 'clock' | 'goblet' | 'circlet';

export function printArtifact(artifact: Artifact) {
  console.log(`part:${artifact.part}`);
  if (artifact.mainStatus.type === 'percent') {
    console.log(`mainStatus->${artifact.mainStatus.name}:${artifact.mainStatus.value * 100}%\n`);
  } else if (artifact.mainStatus.type === 'number') {
    console.log(`mainStatus->${artifact.mainStatus.name}:${artifact.mainStatus.value}\n`);
  }

  for (const subStatus of artifact.subStatuses) {
    if (subStatus.type === 'percent') {
      console.log(`${subStatus.name}+${subStatus.value * 100}%`);
    } else if (subStatus.type === 'number') {
      console.log(`${subStatus.name}+${subStatus.value}`);
    }
  }
}

export function sumArtifactStatusBuff(artifacts: Artifact[]) {
  //副作用があるため要修正
  let result: StatusBuff[] = [];
  for (const artifact of artifacts) {
    result = addStatusBuff(result, artifact.mainStatus).concat();
    for (const subStatus of artifact.subStatuses) {
      result = addStatusBuff(result, subStatus).concat();
    }
  }
  return result;
}

export class Artifact {
  part: ArtifactPart;
  mainStatus: MainStatus;
  subStatuses: SubStatuses = [];
  constructor(part: ArtifactPart, mainStatus: MainStatus, subStatuses: SubStatuses) {
    this.part = part;
    this.mainStatus = mainStatus;
    for (const subStatus of subStatuses) {
      this.subStatuses.push(subStatus);
    }
  }

  static createFromJson(filePath: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const jsonBuffer = fs.readFileSync(path.resolve(__dirname, filePath));
    const jsonString = jsonBuffer.toString();
    const jsonData = JSON.parse(jsonString);

    const part: ArtifactPart = jsonData.part;
    const mainStatus: MainStatus = jsonData.mainStatus;
    const subStatuses: SubStatuses = jsonData.subStatuses;
    const artifact: Artifact = new Artifact(part, mainStatus, subStatuses);
    return artifact;
  }
}
