import {DiscordAuthor} from "./discord-author";

export interface DiscordMessage {
  id: string;
  content: string;
  author: DiscordAuthor;
  timestamp: string;
  application_id?: string;
  channel_id?: string;
  embeds?: Embed[];
}

interface Embed {
  fields?: EmbedField[];
}

interface EmbedField {
  name: string;
  value: string;
}
