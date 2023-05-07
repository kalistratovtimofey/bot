import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DiscordMessage} from "./model/discord-message";
import {SettingsService} from "./settings.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscordApiService {



  constructor(private settings: SettingsService, private client: HttpClient) {

  }

  read(limit: number): Observable<DiscordMessage[]> {
    const url = 'https://discord.com/api/v9/channels/'+this.settings.getChannelId()+'/messages?limit=' + limit;
    return this.client.get<DiscordMessage[]>(url, {headers: {authorization: this.settings.getToken()!}})
  }

  write(message: string): void {
    const url = 'https://discord.com/api/v9/channels/'+this.settings.getChannelId()+'/messages';
    this.client.post(url, {
      content: message,
      flags: 0,
      // nonce: "1104684569212223488"
      tts: false,
    }, {headers: {authorization: this.settings.getToken()!}}).subscribe();
  }
}
