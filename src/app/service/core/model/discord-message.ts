import {DiscordAuthor} from "./discord-author";

export interface DiscordMessage {
  id: string;
  content: string;
  author: DiscordAuthor;
  timestamp: string;
  application_id?: string;
}
