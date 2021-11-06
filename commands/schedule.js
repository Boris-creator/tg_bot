const read_data = require('../read_data.js');
async function get_schedule(ctx) {
    const data = await read_data('./materials/schedule.xlsx', 'Лист1');
    const message = '<i>График работы деканата:</i> \n\n' + data.map(datum => `<b>${datum[0]}</b>: ${datum[1]}`).join('\n\n');

    ctx.telegram.sendMessage(ctx.chat.id, message, {parse_mode: 'HTML'});
}
module.exports = {
    action:get_schedule,
    help:{
        name:'schedule',
        description: 'Сообщит расписание',
        enumerable: true
    }
}