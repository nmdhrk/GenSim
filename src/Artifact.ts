import { addStatusBuff, statusBuff } from "./utils.js";

export type mainStatus = statusBuff;
export type subStatuses = statusBuff[];
export type artifactPart = "flower" | "plume" | "clock" | "goblet" | "circlet";

export function printArtifact(artifact: Artifact) {
  console.log(`part:${artifact.part}`);
  if (artifact.mainStatus.type === "percent") {
    console.log(`mainStatus->${artifact.mainStatus.name}:${artifact.mainStatus.value * 100}%\n`);
  } else if (artifact.mainStatus.type === "number") {
    console.log(`mainStatus->${artifact.mainStatus.name}:${artifact.mainStatus.value}\n`);
  }

  for (const subStatus of artifact.subStatuses) {
    if (subStatus.type === "percent") {
      console.log(`${subStatus.name}+${subStatus.value * 100}%`);
    } else if (subStatus.type === "number") {
      console.log(`${subStatus.name}+${subStatus.value}`);
    }
  }
}

export function sumArtifactStatus(artifacts: Artifact[]) {
  // TODO addStatusBuff関数を副作用なしにしたため、要修正
  const result: statusBuff[] = [];
  for (const artifact of artifacts) {
    addStatusBuff(result, artifact.mainStatus);
    for (const subStatus of artifact.subStatuses) {
      addStatusBuff(result, subStatus);
    }
  }
  return result;
}

export class Artifact {
  part: artifactPart;
  mainStatus: mainStatus;
  subStatuses: subStatuses = [];
  constructor(part: artifactPart, mainStatus: mainStatus, subStatuses: subStatuses) {
    this.part = part;
    this.mainStatus = mainStatus;
    for (const subStatus of subStatuses) {
      this.subStatuses.push(subStatus);
    }
  }
}
