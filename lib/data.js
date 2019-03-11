/* Tabla hash para acceso a la información con coste O(1).
 * La implementación permite colisiones.
 * Se utiliza una función hash muy sencilla, quitando a la cadena de entrada (palabra) el sufijo 
 * {a, o, as, os, es, s, e, xs, x}.
 * Nota: la función hash no pretende calcular el lexema/raíz de las palabras.
 */

const {V, T} = require('./enums.js');

module.exports = {
    obtenerHash(palabra){        
        palabra = this.eliminarDiacriticosEs(palabra.toLowerCase());

        const sufijos = ["a", "o", "as", "os", "es", "xs", "s", "e", "x"];
        for(let i=0; i<sufijos.length; i++){
            if(palabra.endsWith(sufijos[i])) return palabra.substr(0, palabra.length - sufijos[i].length);
        }
        return palabra;
    },

    /* Elimina los diacríticos exclusivamente de áéíóúü. No afecta a "ñ" ni otros diacríticos de otros idiomas.
    https://es.stackoverflow.com/a/62032 */
    eliminarDiacriticosEs(texto){
        return texto.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
    },    

    'data': {  
        /* <hash>: [{v:[singular género masculino, 
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
                     }, ... ] */      
'agredid': [{v:['agredido', 'agredida', 'agredidos', 'agredidos', null, null], anms:'víctima', anmp:'víctimas', gyns:V.ELLA, gynp:V.ELLAS}],
'alcald': [{v:['alcalde', 'alcaldesa', 'alcaldes', 'alcaldesas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'alumn': [{v:['alumno', 'alumna', 'alumnos', 'alumnas', null, 'alumnxs'], anms:'alumnado', anmp:'alumnado', gyns:V.EL, gynp:V.EL}],
'aquel': [{v:['aquel', 'aquella', 'aquellos', 'aquellas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'aquell': [{v:['aquel', 'aquella', 'aquellos', 'aquellas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'arquitect': [{v:['arquitecto', 'arquitecta', 'arquitectos', 'arquitectas', null, 'arquitectxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'autor': [{v:['autor', 'autora', 'autores', 'autoras', null, 'autorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'chic': [{v:['chico', 'chica', 'chicos', 'chicas', null, 'chicxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'ciudadan': [{v:['ciudadano', 'ciudadana', 'ciudadanos', 'ciudadanas', null, 'ciudadanxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'contabl': [{v:['contable', '=', 'contables', '=', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'contador': [{v:['contador', 'contadora', 'contadores', 'contadoras', null, 'contadorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'deportist': [{v:['deportista', 'deportista', 'deportistas', 'deportistas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'diputad': [{v:['diputado', 'diputada', 'diputados', 'diputadas', null, 'diputadxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'doctor': [{v:['doctor', 'doctora', 'doctores', 'doctoras', null, 'doctorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'el': [{v:['el', 'ella', 'ellos', 'ellas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'ell': [{v:['el', 'ella', 'ellos', 'ellas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'escritor': [{v:['escritor', 'escritora', 'escritores', 'escritoras', null, 'escritorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'es': [{v:['ese', 'esa', 'esos', 'esas', null, 'eses'], anms:null, anmp:null, gyns:null, gynp:null}],
'est': [{v:['este', 'esta', 'estos', 'estas', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.DETERMINANTE},
        {v:['está', 'está', 'están', 'están', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'estaban': [{v:['estaba', 'estaba', 'estaban', 'estaban', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'estaran': [{v:['estará', 'estará', 'estarán', 'estarán', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'estari': [{v:['estaría', 'estaría', 'estarían', 'estarían', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'fres': [{v:[null, 'fresa', null, 'fresas', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'funcionari': [{v:['funcionario', 'funcionaria', 'funcionarios', 'funcionarias', null, 'funcionarixs'], anms:null, anmp:null, gyns:null, gynp:null}],
'hablaron': [{v:['habló', 'habló', 'hablaron', 'hablaron', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'habl': [{v:['habló', 'habló', 'hablaron', 'hablaron', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'ingenier': [{v:['ingeniero', 'ingeniera', 'ingenieros', 'ingenieras', null, 'ingenierxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'joven': [{v:['joven', 'joven', 'jóvenes', 'jóvenes', null, null], anms:'juventud', anmp:'juventud', gyns:V.ELLA, gynp:V.ELLA}],
'junt': [{v:['junto', 'junta', 'juntos', 'juntas', null, 'juntxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'l': [{v:['el', 'la', 'los', 'las', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.DETERMINANTE}],
'lector': [{v:['lector', 'lectora', 'lectores', 'lectoras', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'ley': [{v:[null, 'ley', null, 'leyes', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'linguist': [{v:['lingüista', '=', 'lingüistas', '=', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'm': [{v:['más', 'más', 'más', 'más', null, null], anms:null, anmp:null, gyns:null, gynp:null, t: T.ADVERBIO}],
'madr': [{v:['padre', 'madre', 'padres', 'madres', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'marron': [{v:['marrón', '=', 'marrones', '=', null, null], anms:null, anmp:null, gyns:null, gynp:null}], /* OJO, hash sin tilde */
'medic': [{v:['médico', 'médica', 'médicos', 'médicas', null, 'médicxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'men': [{v:['menos', 'menos', 'menos', 'menos', null, null], anms:null, anmp:null, gyns:null, gynp:null, t: T.ADVERBIO}],
'miembr': [{v:['miembro', '=', 'miembros', '=', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'much': [{v:['mucho', 'mucha', 'muchos', 'muchas', null, "muches"], anms:null, anmp:null, gyns:null, gynp:null}],
'nosotr': [{v:[null, null, 'nosotros', 'nosotras', null, "nosotres"], anms:null, anmp:null, gyns:null, gynp:null}],
'padr': [{v:['padre', 'madre', 'padres', 'madres', null, null], anms:null, anmp:null, gyns:null, gynp:null}],
'poc': [{v:['poco', 'poca', 'pocos', 'pocas', null, "pocxs"], anms:null, anmp:null, gyns:null, gynp:null}],
'president': [{v:['presidente', 'presidenta', 'presidentes', 'presidentas', null, 'presidentxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'profesor': [{v:['profesor', 'profesora', 'profesores', 'profesor', null, null], anms:'profesorado', anmp:'profesorado', gyns:V.EL, gynp:V.EL}],
'programador': [{v:['programador', 'programadora', 'programadores', 'programadoras', null, 'programadorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'rector': [{v:['rector', 'rectora', 'rectores', 'rectoras', null, null], anms:'rectorado', anmp:'rectorado', gyns:V.EL, gynp:V.EL}],
'señor': [{v:['señor', 'señora', 'señores', 'señoras', null, 'señorxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'señorit': [{v:['señorito', 'señorita', 'señoritos', 'señoritas', null, 'señoritxs'], anms:null, anmp:null, gyns:null, gynp:null}],
'son': [{v:['es', 'es', 'son', 'son', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'su': [{v:['su', 'su', 'sus', 'sus', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.DETERMINANTE}],
'repartidor': [{v:['repartidor', 'repartidora', 'repartidores', 'repartidoras', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.DETERMINANTE}],
'tod': [{v:['todo', 'toda', 'todos', 'todas', null, 'todes'], anms:null, anmp:null, gyns:null, gynp:null}],
'trabajador': [{v:['trabajador', 'trabajadora', 'trabajadores', 'trabajadoras', null, null], anms:'personal', anmp:'personal', gyns:V.EL, gynp:V.EL, t:T.NOMBRE}],
'un': [{v:['un', 'una', 'unos', 'unas', null, 'unes'], anms:null, anmp:null, gyns:null, gynp:null, t:T.DETERMINANTE}],
'van': [{v:['va', 'va', 'van', 'van', null, null], anms:null, anmp:null, gyns:null, gynp:null, t:T.VERBO}],
'y': [{v:['y', 'y', 'y', 'y', null, null], anms:null, anmp:null, gyns:null, gynp:null, t: T.CONJUNCION}],

    }
}