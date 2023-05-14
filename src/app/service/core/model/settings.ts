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

  events: EventsSettings

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
  enabledPetCapture: boolean
}

export interface EventsSettings {
  lure: boolean;
  cut: boolean;
  catch: boolean;
  summon: boolean;
  boss: boolean;
  arena: boolean;
  wait: number;
  waitSimple: number;
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
