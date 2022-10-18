const moment = require("moment");

const nacimiento = moment("08/11/1988", "DD/MM/YYYY");
const hoy = moment();

const cuantosAños = hoy.diff(nacimiento, "years");
const cuantosDias = hoy.diff(nacimiento, "days");

console.log(`Hoy es ${hoy.format("DD/MM/YYYY")}`);
console.log(`Nací el ${nacimiento.format("DD/MM/YYYY")}`);
console.log(`Desde que nací han pasado ${cuantosAños} años.`);
console.log(`Desde que nací han pasado ${cuantosDias} días.`);
