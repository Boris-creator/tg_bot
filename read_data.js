const Excel = require("exceljs");
module.exports = async function (table, sheet) {
    const data = [];
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(table);
    workbook.getWorksheet(sheet).eachRow((row, i)=>{
        data.push(row.values.slice(1))
    });
    return data;
};