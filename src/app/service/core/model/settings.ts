export interface Settings {
  token: string,
  playerName: string;
  playerId: string;
  channelId: string;
  botName: string;

  hunt: HuntSettings

  adventure: HuntSettings

  work: WorkSettings

  farm: FarmSettings

  train: TrainSettings
}

export interface HuntSettings {
  enabled: boolean;
  useHardmode: boolean;
  useHeal: boolean;
}

export interface WorkSettings {
  enabled: boolean;
  command: string;
}

export interface FarmSettings {
  enabled: boolean;
  type: string;
}

export interface TrainSettings {
  enabled: boolean;
  enabledPetCapture: boolean
}
