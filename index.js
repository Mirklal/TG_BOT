const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const text = require('./data')


require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('link', async (ctx) => {
    try{
        await ctx.replyWithHTML('<b>Кликай чтобы получить ссылку</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Нажми', 'btn_1')]
        ]
        ))
    } catch(e) {
        console.error(e)
    }
})

bot.action('btn_1', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('https://www.youtube.com/watch?v=8zFiyDfs-UU&t=2s', {
            disable_web_page_preview: true
        })
    }catch(e) {
        console.error(e)
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))