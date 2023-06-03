export interface Settings {
  token: string,
  playerName: string;
  playerId: string;
  channelId: string;
  botName: string;
  timeout: number;

  hunt: HuntSettings

  adventure: HuntSettings

  work: WorkSettings

  farm: FarmSettings

  train: TrainSettings

  randomEvents: EventsSettings

  enchant: EnchantSettings
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
  enabledPetCapture: boolean;
  tradeBefore: boolean;
}

export interface EventsSettings {
  lure: EventSetting;
  cut: EventSetting;
  catch: EventSetting;
  summon: EventSetting;
  boss: EventSetting;
  arena: EventSetting;
}

export interface EventSetting {
  enabled: boolean;
  timer: number
}


export interface EnchantSettings {
  value: EnchantValues,
  command: 'enchant' | 'refine' | 'transmute' | 'transcend',
}

export enum EnchantValues {
  normie= 5,
  good = 15,
  great = 25,
  mega = 40,
  epic = 60,
  hyper = 70,
  ultimate = 80,
  perfect = 90,
  edgy = 95,
  'ultra-edgy' = 100,
  omega = 125,
  'ultra-omega' = 150,
  godly = 200,
  void= 250, // don't know exactly
}
