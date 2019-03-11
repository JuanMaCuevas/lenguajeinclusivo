const assert = require('assert')
const li = require('../lib')
 
describe('lenguaje inclusivo', function() {
  describe('#lasYLos()', function() {
    describe('#lasYLos(diputados)', function() {
      it('Caso femenino y masculino. Debe devolver una cadena "las diputadas y los diputados"', function() {
        assert.equal(li.lasYLos("diputados"), "las diputadas y los diputados")
      })
    }),
    describe('#lasYLos(leyes)', function() {
      it('Caso solo femenino. Debe devolver cadena "las leyes"', function() {
        assert.equal(li.lasYLos("leyes"), "las leyes")
      })
    }),
    describe('#lasYLos(lingüista)', function() {
      it('Caso único para femenino y masculino. Debe devolver cadena "las lingüistas y los lingüistas"', function() {
        assert.equal(li.lasYLos("lingüista"), "las lingüistas y los lingüistas")
      })
    }),
    describe('#lasYLos(palabraQueNoExiste)', function() {
      it('Palabra no encontrada. Debe devolver null', function() {
        assert.equal(li.lasYLos("palabraQueNoExiste"), null)
      })
    }),
    describe('#lasYLos(ciudadanxs)', function() {
      it('Entrada es palabra con terminación "xs". Debe devolver "las ciudadanas y los ciudadanos"', function() {
        assert.equal(li.lasYLos("ciudadanxs"), "las ciudadanas y los ciudadanos")
      })
    })
  }),
  describe('#xs(diputadas)', function() {
    it('Plural inclusivo "xs". Debe devolver cadena "diputadxs"', function() {
      assert.equal(li.xs("diputadas"), "diputadxs")
    })
  }),
  describe('#textoXs(somos muchos ciudadanos en la ciudad y viajamos juntos en los coches)', function() {
    it('frase inclusiva', function() {
      assert.equal(li.textoXs("somos muchos ciudadanos en la ciudad y viajamos juntos en los coches"), 
        "somos muches ciudadanxs en la ciudad y viajamos juntxs en los coches")
    })
  }),
  describe('#textoAlt(hoy todos...)', function() {
    it('frase inclusiva, cambiando alumnos por alumnado, desdoblar padres, etc y el orden/género de palabras cercanas', function() {
      assert.equal(li.textoAlt("hoy todos , señora madre , los alumnos van juntos a los colegios . Nosotras avisamos ayer a todos los profesores y el resto de trabajadores estarán despertando . Los médicos también están avisados . Los programadores y los lingüistas no han sufrido daños . Tampoco los padres . Un saludo para todos ."), 
        "hoy todo , señora madre , el alumnado va junto a los colegios . Nosotras avisamos ayer a todo el profesorado y el resto de personal estará despertando . Los médicos y las médicas también están avisados . Los programadores y las programadoras y los lingüistas no han sufrido daños . Tampoco los padres y las madres . Un saludo para todos y todas .")
    })
  }),
  describe('#textoAlt(los jóvenes son más deportistas que antes)', function() {
    it('frase inclusiva, incluye adverbio "más" intercalado y conjunción "y".', function() {
      assert.equal(li.textoAlt("los jóvenes son más deportistas y lectores que antes"), 
        "la juventud es más deportista y lectora que antes")
    })
  })
  describe('#textoAlt(los profesores...)', function() {
    it('frase inclusiva, incluye contracción "del", y cambiando profesores, trabajadores, el orden/género de palabras cercanas y desdoblando escritores.', function() {
      assert.equal(li.textoAlt("los profesores hablaron con el resto de los trabajadores y después recomendaron los libros de los escritores"), 
        "el profesorado habló con el resto del personal y después recomendaron los libros de los escritores y las escritoras")
    })
  })
  
  /*,
  describe('#textoAlt(los profesores...)', function() {
    it('frase inclusiva', function() {
      assert.equal(li.textoAlt("los profesores estaban en la reunión semanal . las profesoras contaron que harían huelga . los profesores las apoyaron ."), 
        "el profesorado estaba en la reunión semanal . las profesoras contaron que harían huelga . los profesores las apoyaron .")
    })
  })*/
})