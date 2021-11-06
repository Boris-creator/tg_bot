const fs = require("fs");
const { Telegraf } = require("./node_modules/telegraf");
require("dotenv").config();
const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

const commands = new Map();
fs.readdir("./commands", (err, files) => {
    if (err) {
        console.log(err);
    }
    const jsfiles = files.filter((fname) => /\.js$/.test(fname));
    if (!jsfiles.length) return;
    //console.log(`Загружено ${jsfiles.length} команд`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        commands.set(props.help.name, {
            action: props.action,
            description: props.help.description,
            enumerable: props.help.enumerable
        });
    });
    for (let command of commands.keys()) {
        bot.command(`/${command}`, commands.get(command).action);
    }
});
//Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
/*
bot.action(/^c:(.+)/, (ctx) => {
    const msg = ctx.match[1];
    ctx.telegram.sendMessage(ctx.chat.id, msg);
})
*/
const contacts = require('./commands/contacts').logic;
for(let request of contacts.requests){
    bot.action(request, async (ctx) => {
        const res = await contacts.response(request);
        ctx.telegram.sendMessage(ctx.chat.id, res);
    })
}
bot.help(function(ctx){
    const command_list = [...commands].filter(command => command[1].enumerable)
    ctx.telegram.sendMessage(ctx.chat.id, command_list.map(command => `${command[0]}: ${command[1].description}`).join('\n'));
});

console.log("started");
bot.launch()