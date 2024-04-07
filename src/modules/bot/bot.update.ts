import { Update, On, Start, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  private user: any;
  private car: any;
  private step: any;
  private step1: any;

  constructor() {
    this.user = {};
    this.car = {};
    this.step = 0;
    this.step1 = 0;
  }
  @Start()
  async onStart(@Ctx() ctx) {
    this.step = 0;
    this.step1 = 0;
    await ctx.reply(
      'Assalomu alaykum  ' +
        ctx.update.message.from.first_name +
        '\n' +
        "Avtomobil yuvish uchun ro'yxatdan o'tish uchun ekranning pastki qismidagi (Ro'yxatdan o'tish) tugmasini bosing.",
      {
        reply_markup: {
          keyboard: [
            [
              { text: "Ro'yxatdan o'tish" },
              { text: "Biz haqimizda ma'lumotlar" },
            ],
            [
              { text: 'Bizning manzil 📍', text_id: 123 },
              { text: "Biz bilan bog'lanish 📲" },
            ],
          ],
          resize_keyboard: true,
        },
      },
    );
  }

  @On('message')
  async onLocation(ctx) {
    console.log(ctx.update);

    if (ctx.update.message.text == 'Bizning manzil 📍') {
      await ctx.sendLocation(35.804819, 51.43407, {
        live_period: 86400,
      });
    }

    if (this.step == 0) {
      if (ctx.update.message.text == "Biz bilan bog'lanish 📲") {
        this.user.id = ctx.update.message.from.id;
        // Foydalanuvchidan ismini so'raymiz
        this.step = ++this.step; // keyingi qadamga o'tish
        await ctx.reply('Ismingizni kiritining', {
          reply_markup: {
            keyboard: [[{ text: 'Ortga qaytish' }]],
            resize_keyboard: true,
          },
        });
      }
    } else if (this.step == 1 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi ismini saqlash
      this.user.name = ctx.update.message.text;

      this.step = ++this.step; // boshqaga o'tish
      await ctx.reply(`Yoshingizdi kiritining`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.step == 2 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi ismini saqlash
      this.user.age = ctx.update.message.text;
      this.step = ++this.step; // boshqaga o'tish
      await ctx.reply(`Mashena nomi`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.step == 3 && this.user.id == ctx.update.message.from.id) {
      // Foydalanuvchi ismini saqlash
      this.user.car_name = ctx.update.message.text;

      await ctx.reply(
        `id:${this.user.id}  
      Name:${this.user.name},
      Age:${this.user.age},
      Mashena:${this.user.car_name} `,
      );
    }

    // if (this.step == 0) {
    //   if (ctx.update.message.text == "Biz bilan bog'lanish 📲") {
    //     console.log(ctx.update.message.from.id);
    //     console.log(ctx);
    //     this.user.id = ctx.update.message.from.id;
    //     this.step = +this.step;
    //     await ctx.reply('Ismingizni kiritining', {
    //       reply_markup: {
    //         keyboard: [[{ text: 'Ortga qaytish' }]],
    //         resize_keyboard: true,
    //       },
    //     });
    //   }
    // }

    // if (this.step == 1) {
    //   console.log(ctx.update);
    //   console.log(this.user);
    //   this.step = 1;
    //   await ctx.reply('Ismingizni kiritining', {
    //     reply_markup: {
    //       keyboard: [[{ text: 'Ortga qaytish' }]],
    //       resize_keyboard: true,
    //     },
    //   });
    // } else if (this.step == 1) {
    //   // Foydalanuvchi ismini saqlash
    //   console.log(ctx);

    //   this.user.name = ctx.update.message.text;
    //   this.step = 0; // boshqaga o'tish
    //   await ctx.reply(`Ismingiz ${this.user.name} saqlandi.`);
    // }

    if (ctx.update.message.text == "Biz haqimizda ma'lumotlar") {
      await ctx.reply(
        'Avtomobillarga xizmat ko’rsatish har doim daromadli xizmat ko’rsatish sohalaridan biri bo’lib kelmoqda. Ayniqsa har bir avtomobil egasi o’z mashinasiga o’zi xizmat ko’rsatsa bu ajoyib imkoniyatdan boshqa narsa emas.',
      );
    }

    if (ctx.update.message.text == "Ro'yxatdan o'tish") {
      await ctx.reply('Mashinagizdi turini aytining', {
        reply_markup: {
          keyboard: [[{ text: 'Yengil mashina' }, { text: 'Yuk mashinasi' }]],
          resize_keyboard: true,
        },
      });
    }

    if (this.step1 == 0) {
      if (ctx.update.message.text == 'Yengil mashina') {
        console.log(ctx, 'Yengil mashina');

        this.car.id = ctx.update.message.from.id;
        this.step1 = ++this.step1;
        await ctx.reply('Mashena name', {
          reply_markup: {
            keyboard: [[{ text: 'Ortga qaytish' }]],
            resize_keyboard: true,
          },
        });
      }
    } else if (this.step1 == 1 && this.car.id == ctx.update.message.from.id) {
      this.car.name = ctx.update.message.text;
      this.step1 = ++this.step1;
      await ctx.reply(`Qanday yuvish kerek`, {
        reply_markup: {
          keyboard: [[{ text: 'Ortga qaytish' }]],
          resize_keyboard: true,
        },
      });
    } else if (this.car.id == ctx.update.message.from.id) {
      console.log(ctx.update.message.text);

      this.car.yuvish = ctx.update.message.text;
      this.step1 = ++this.step1;
      await ctx.reply(
        `id:${this.car.id}  
      :${this.car.name},
      :${this.car.yuvish},
     `,
      );
    }
  }

  // @On('channel_post')
  // async onText(@Ctx() ctx) {
  //   console.log(ctx);
  // }
}
