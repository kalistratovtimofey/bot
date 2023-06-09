import {DiscordAuthor} from "./discord-author";

export interface DiscordMessage {
  id: string;
  content: string;
  author: DiscordAuthor;
  timestamp: string;
  application_id?: string;
  channel_id?: string;
  embeds: Embed[];
}

interface Embed {
  fields?: EmbedField[];
  author?: EmbedAuthor
}

interface EmbedField {
  name: string;
  value: string;
}

interface EmbedAuthor {
  name: string;
}
