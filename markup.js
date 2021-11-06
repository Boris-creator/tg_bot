const Markup = require('./node_modules/telegraf/lib/markup.js');
const _ = {
    getMainMenu() {
        return Markup.keyboard([
            ['1', '2'],
            ['3']
        ]).resize()
    },
    getInlineMenu(menu) {
        const buttons = {
            parse_mode: "html",
            reply_markup: JSON.stringify({
                inline_keyboard: menu
            })
        };
        return buttons;
    },
    getNav(links){
        return Markup.inlineKeyboard(links.map(link=>
            Markup.button.url(link.label, link.url)))
    }
}

module.exports.utils = _;