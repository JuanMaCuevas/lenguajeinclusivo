const li = require('./lib');

if (process.argv.length <= 2) {
    console.log("Uso: " + __filename + " frase para intentar traducir");
    process.exit(-1);
}

const args = process.argv.slice(2);

const frase = args.join(' ');

return li.textoAlt(frase);