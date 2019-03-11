const data = require('./data.js');
const {V, T} = require('./enums.js');

module.exports = {    

    /* 
    * @desc obtiene el item asociado a una palabra, buscándolo en el diccionario.
    * @param string $palabra - la palabra que hay que buscar.
    * @return object - el item de la palabra {v:[...], t, anms, etc..}. Devuelve null si no lo encuentra.
     */
    obtenerItem(palabra){
        palabra = palabra.toLowerCase();
        let hash = data.obtenerHash(palabra);        
        let fila = data['data'][hash];
        if(fila){
            for(let i=0; i<fila.length; i++){ // soporte para colisiones en la tabla hash.
                for(let j=0; j<fila[i].v.length; j++){
                    if(fila[i].v[j] == palabra) return fila[i];
                }
            }
            return null;
        }
        else return null;
    },

    obtenerGeneroYNumeroDesdeItem(item, gyn){
        if(item.v[gyn] == '=') return item.v[gyn - 1]; // convenio
        return item.v[gyn];
    },

    obtenerGeneroFemeninoPluralDesdeItem(item){
        if(item.v[V.ELLAS] == '=') return item.v[V.ELLOS];
        return item.v[V.ELLAS];
    },

    obtenerGeneroFemeninoSingularDesdeItem(item){
        if(item.v[V.ELLA] == '=') return item.v[V.EL];
        return item.v[V.ELLA];
    },

    obtenerGeneroMasculinoPluralDesdeItem(item){        
        return item.v[V.ELLOS];
    },

    obtenerGeneroMasculinoSingularDesdeItem(item){        
        return item.v[V.EL];
    },

    obtenerGeneroFemeninoPluralDesdePalabra(palabra){        
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.obtenerGeneroFemeninoPluralDesdeItem(item);
    },

    obtenerGeneroFemeninoSingularDesdePalabra(palabra){
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.obtenerGeneroFemeninoSingularDesdeItem(item);
    },

    obtenerGeneroMasculinoPluralDesdePalabra(palabra){        
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.obtenerGeneroMasculinoPluralDesdeItem(item);
    },

    obtenerGeneroMasculinoSingularDesdePalabra(palabra){
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.obtenerGeneroMasculinoSingularDesdeItem(item);
    },

    tieneTerminacionUnicaSingularDesdeItem(item){
        if(item.v[V.ELLA] == '=') return true;
        else if(item.v[V.EL] == item.v[V.ELLA]) return true; // este caso no debería darse si se rellena bien el diccionario.
        return false;
    },
    tieneTerminacionUnicaSingularDesdePalabra(palabra){
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.tieneTerminacionUnicaSingularDesdeItem(item);
    },

    tieneTerminacionUnicaPluralDesdeItem(item){
        if(item.v[V.ELLAS] == '=') return true;
        else if(item.v[V.ELLOS] == item.v[V.ELLAS]) return true; // este caso no debería darse si se rellena bien el diccionario.
        return false;
    },
    tieneTerminacionUnicaPluralDesdePalabra(palabra){
        let item = this.obtenerItem(palabra);
        if(item == null) return null;
        return this.tieneTerminacionUnicaPluralDesdeItem(item);
    },

    /* 
    * @desc Intenta desdoblar la palabra (médicos -> los médicos y las médicas) y la devuelve ordenada según el parámetro
    * @param string $palabra - la palabra que hay que desdoblar.
    * @param bool $primeroLasQ - indica si hay que devolver "los médicos y las médicas" o "las médicas y los médicos"
    * @return string - la palabra desdoblada. Devuelve null si no la encuentra. No desdobla si palabra solo tiene 1 terminación.
     */
    lasYLosOrdenado(palabra, primeroLasQ){
        let item = this.obtenerItem(palabra);

        if(item){            
            if(item.v[V.ELLAS] != null && item.v[V.ELLOS] != null){
                return (primeroLasQ) ?
                    `las ${this.obtenerGeneroFemeninoPluralDesdeItem(item)} y los ${item.v[V.ELLOS]}`:
                    `los ${item.v[V.ELLOS]} y las ${this.obtenerGeneroFemeninoPluralDesdeItem(item)}`;
            }
            else if(item.v[V.ELLOS] == null){
                return `las ${item.v[V.ELLAS]}`;
            }
            else if(item.v[V.ELLAS] == null){
                return `los ${item.v[V.ELLOS]}`;
            }            
        }
        return null;
    },

    lasYLosOrdenAleatorio(palabra){
        return this.lasYLosOrdenado(palabra, Math.random() >= 0.5);
    },

    losYLas(palabra){
        return this.lasYLosOrdenado(palabra, false);
    },

    lasYLos(palabra){
        return this.lasYLosOrdenado(palabra, true);
    },   

    xs(palabra){
        let item = this.obtenerItem(palabra);

        if(item){
            if(item.v[V.XS]) return item.v[V.XS];

            /* item.v[V.XS]==null solo cuando hay únicamente una terminación (como "marrón"). 
             * En tal caso, coger el plural existente. */
            else if(item.v[V.ELLOS]) return item.v[V.ELLOS];
            else if(item.v[V.ELLAS]) return item.v[V.ELLAS]; // en este caso no será nunca "=".
        }
        return null;
    },

    /* 
    * @desc intenta devolver la versión terminada en "xs" de 1 palabra. 
    * Si no encuentra la palabra, devuelve la original.
    * @param string $palabra - 1 palabra.
    * @return string - palabra versionada a "-xs". La palabra original en el caso de no encontrarla en el diccionario.
     */
    intentarXs(palabra){        
        let item = this.obtenerItem(palabra);

        if(item){
            if(palabra == item.v[V.ELLOS]){
                if(item.v[V.XS]) return item.v[V.XS];
            }
        }
        return palabra;
    },

    /* 
    * @desc intenta devolver la versión terminada en "xs" de las palabras de un texto. 
    * Si no encuentra una palabra, devuelve la original.
    * @param string $texto - cadena de N palabras separadas por espacio.
    * @return string - texto adaptado.
     */
    textoXs(texto){
        let ret = [];
        let palabras = texto.split(' ');        
        for(let i=0; i<palabras.length; i++){
            ret.push(this.intentarXs(palabras[i]));
        }
    
        return ret.join(' ');
    },

    adaptarGeneroYNumero(gynNuevo, gynOrigen, contextoPrevio, profundidad){
        if(!contextoPrevio || contextoPrevio.length == 0) return;
        
        for(let i=contextoPrevio.length-1; i>=contextoPrevio.length-profundidad && i>=0; i--){
            if(contextoPrevio[i].item && contextoPrevio[i].item.v[gynNuevo] && 
                contextoPrevio[i].palabra == this.obtenerGeneroYNumeroDesdeItem(contextoPrevio[i].item, gynOrigen)){
                    contextoPrevio[i].palabra = this.obtenerGeneroYNumeroDesdeItem(contextoPrevio[i].item, gynNuevo); // TODO: revisar que no sea null.
                    contextoPrevio[i].gyn = gynNuevo;
            }
        }
    },

    incluirPalabraEnElContexto(contextoPrevio, palabra, gyn, item, palabraOrigen, gynOrigen){
        contextoPrevio.push({"palabra":palabra, 
                             "gyn": gyn, // género y nº de la palabra. Solo se rellena con "null" o "ELLOS". No es relevante en otros casos.
                             "item":item,                              
                             "palabraOrigen":palabraOrigen,
                             "gynOrigen": gynOrigen}); // género y nº de la palabra en origen. Solo se rellena con "null" o "ELLOS". No es relevante en otros casos.
    },

    /* 
    * @desc recorre todo el contexto e intenta desdoblar (los médicos -> los médicos y las médicas)
    * @param array $contexto - vector con la información de cada palabra del texto inicial
    * @return string - texto adaptado.
     */
    intentarDesdoblar(contexto){        
        let ret = "";
        for(let i=0; i< contexto.length; i++){
            let item = contexto[i].item;
            let palabra = contexto[i].palabra;

            if(item){
                if(palabra == item.v[V.ELLOS]){
                    if(item.anmp) {                   
                        
                    }
                    else{ /* Si la palabra está en plural masculino y no tiene alternativa,                         
                        /* Caso "los padres" -> "los padres y las madres" */
                        if(i > 0 && contexto[i-1].item &&
                            this.tieneTerminacionUnicaPluralDesdeItem(item) == false &&
                            contexto[i-1].item.t == T.DETERMINANTE){
                                let determinanteItem = contexto[i-1].item;
                                let determinanteFem = this.obtenerGeneroYNumeroDesdeItem(determinanteItem, V.ELLAS);
                                let palabraFem = this.obtenerGeneroYNumeroDesdeItem(item, V.ELLAS);

                                ret += `${palabra} y ${determinanteFem} ${palabraFem} `;
                                continue;

                        }
                        /* Caso "padres" -> "padres y madres" */
                        else if(contexto[i].item.t != T.DETERMINANTE && 
                            this.tieneTerminacionUnicaPluralDesdeItem(item) == false){

                            let palabraFem = this.obtenerGeneroYNumeroDesdeItem(item, V.ELLAS);

                            ret += `${palabra} y ${palabraFem} `;
                            continue;
                        }
                    }
                }
                // TODO: también habría que sustituir los usos genéricos del masculino no marcado.
                // Ejemplo: "El alumno responsable hace los deberes todos los días". Solución complicada.
            }
        
            ret += palabra + " ";
        }

        return ret;
    },

    intentarAlt(palabra, contextoPrevio){        
        let item = this.obtenerItem(palabra);

        if(item){
            if(palabra == item.v[V.ELLOS]){
                if(item.anmp) {                   
                    this.adaptarGeneroYNumero(item.gynp, V.ELLOS, contextoPrevio, 6);
                    
                    this.incluirPalabraEnElContexto(contextoPrevio, item.anmp, item.gynp, item, palabra, V.ELLOS);
                    return item.anmp;
                }
                else{ /* Si la palabra está en plural masculino y no tiene alternativa, 
                         comprobar si la palabra anterior cambió desde masculino plural, 
                         para adaptar la actual también (es el caso de los verbos que van 
                         después de un plural masculino que cambia a singular).
                         
                         Si el anterior es un adverbio, mirar el anterior del anterior. TODO: cambiar por loop. */
                    if(contextoPrevio.length > 0 && contextoPrevio[contextoPrevio.length-1].gynOrigen == V.ELLOS &&
                        contextoPrevio[contextoPrevio.length-1].gyn != V.ELLOS){
                            let gyn = contextoPrevio[contextoPrevio.length-1].gyn;
                            let palabraNueva = this.obtenerGeneroYNumeroDesdeItem(item, gyn);

                            this.incluirPalabraEnElContexto(contextoPrevio, 
                                palabraNueva, gyn, item, palabra, V.ELLOS);

                            return palabraNueva;
                    }
                    else if(contextoPrevio.length > 1 && (contextoPrevio[contextoPrevio.length-1].t == T.ADVERBIO ||
                        contextoPrevio[contextoPrevio.length-1].t == T.CONJUNCION) && 
                        contextoPrevio[contextoPrevio.length-2].gynOrigen == V.ELLOS &&
                        contextoPrevio[contextoPrevio.length-2].gyn != V.ELLOS){
                            let gyn = contextoPrevio[contextoPrevio.length-2].gyn;
                            let palabraNueva = this.obtenerGeneroYNumeroDesdeItem(item, gyn);

                            this.incluirPalabraEnElContexto(contextoPrevio, 
                                palabraNueva, gyn, item, palabra, V.ELLOS);

                            return palabraNueva;
                    }
                    // TODO: casos especiales para conjunciones, preposiciones...
                    // TODO: casos especiales para secuancias de más de 1 conjunción/preposición/adverbio
                }
            }
            // TODO: también habría que sustituir los usos genéricos del masculino no marcado.
            // Ejemplo: "El alumno responsable hace los deberes todos los días". Solución complicada.
        }

        this.incluirPalabraEnElContexto(contextoPrevio, palabra, null, item, palabra, null);        
        return palabra;
    },

    /* 
    * @desc Contrae "a el" y "de el", por "al" y "del" respectivamente.
    * @param string $texto - texto de entrada
    * @return string - texto adaptado.
     */
    contraerDelAlTexto(texto){
        texto = texto.replace(" a el ", " al ");
        return texto.replace(" de el ", " del ");        
    },

    /* 
    * @desc intenta adaptar a lenguaje inclusivo el texto que recibe
    * @param string $texto - texto de entrada
    * @return string - texto adaptado.
     */
    textoAlt(texto){
        let contexto = []; // {palabra p, item i, origen, nuevo ...}, {palabra, item}, etc...
        let palabras = texto.split(' ');        
        for(let i=0; i<palabras.length; i++){
            this.intentarAlt(palabras[i], contexto);
        }

        let ret = this.intentarDesdoblar(contexto);
        
        ret = this.contraerDelAlTexto(ret);

        console.log("Frase inicial: " + texto);
        console.log("\nFrase inclusiva: " + ret);

        return ret.slice(0, -1);
    },


}