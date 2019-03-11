# lenguaje-inclusivo

[![Build Status](https://travis-ci.org/javichur/lenguaje-inclusivo.svg?branch=master)](https://travis-ci.org/javichur/lenguaje-inclusivo) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/javichur/lenguaje-inclusivo/issues)

Traductor a lenguaje inclusivo / no sexista. Prueba de concepto.

## Uso
Prueba rápida:
```javascript
npm start <frase que quieras traducir>
```
Integrado en tu proyecto de Node:
```javascript
const li = require('../lib');
let respuesta = li.textoAlt("los profesores hablaron con el resto de los trabajadores y después recomendaron los libros de los escritores");
```
Genera la salida: `el profesorado habló con el resto del personal y después recomendaron los libros de los escritores y las escritoras`.

## Mejora del diccionario

En ./lib/data.js se encuentra el diccionario. Este diccionario se utiliza para cambiar el género y número de las palabras, así como para sustituir una palabra por el nombre genérico del colectivo. Si quieres ampliar este diccionario, puedes hacerlo siguiendo la estructura existente: 

```javascript
'hash': [{v:[singular género masculino, 
        plural gén masc, 
        singular género femenino, 
        plural gén fem, 
        singular genérico,
        plural genérico],
        anms: alternativa al género no marcado (masculino) singular,
        anmp: alternativa al género no marcado (masculino) plural,
        gyns: género y número de la alternativa singular,
        gynp: género y número de la alternativa plural,
        t: tipo {verbo, nombre, determinante...}
    }, ... ]
```

La implementación del diccionario permite colisiones. Se utiliza una función hash muy sencilla, quitando a la cadena de entrada (palabra) el sufijo {a, o, as, os, es, s, e, xs, x}.

Nota: la función hash no pretende calcular el lexema/raíz de las palabras.