import { Module } from '@nestjs/common';

import { BotModule } from './modules/bot/bot.module';
import { ClientModule } from './modules/client/client.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotName } from './app.constants';
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BotName,
      useFactory: () => ({
        token: '7037981533:AAHA8gWBClV-TlXbwEQEcOfncbn6mTVisSg',
        middlewares: [],
        include: [BotModule],
      }),
    }),
    BotModule,
    ClientModule,
  ],
})
export class AppModule {}
