const read_data = require('../read_data.js');
const keyboard = require('../markup');

const menu_labels = [
    'telephone',
    'email',
    'hours',
    'info'
];
async function read_info(key){
    const data = await read_data('./materials/contacts.xlsx', 'Лист1');
    const info = Object.fromEntries(data.map((d, i) => [menu_labels[i], d[1]]));
    return typeof info[key] == 'object' ? info[key].text : info[key]
}
async function get_contacts(ctx) {
    const data = await read_data('./materials/contacts.xlsx', 'Лист1');
    const menu_data = data.map((info, i) => ({
        text: info[0],
        //Alas, data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
        /* 
        callback_data: `${menu_labels[i]}:${(typeof info[1] == 'object' ? info[1].text : info[1])
            .replace(/\n/g, ' ')
            .slice(0, 32)
        }`
        */
        callback_data:menu_labels[i]
    })),
    menu = [
        [menu_data[0], menu_data[1]],
        [menu_data[2], menu_data[3]]
    ];
    ctx.reply("Контактные данные:", keyboard.utils.getInlineMenu(menu));
}
module.exports = {
    action:get_contacts,
    logic: {
        requests: menu_labels,
        response: read_info
    },
    help:{
        name:'contacts',
        description: 'Сообщит контактную информацию',
        enumerable: true
    }
}