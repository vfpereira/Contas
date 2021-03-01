const test = require('tape')
const utils = require('./api/v1.0/utils')

test('Sem Atraso', (t) => {
  t.assert(utils.calcValue(100, '2021-03-01', '2021-02-28') === 100, 'Pago com antecedencia')
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-01') === 100, 'Pago no dia')
  t.end()
})

test('Atraso de ate 3 dias', (t) => {
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-02') === 102.1, 'Atraso de 1 dia')
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-04') === 102.3, 'Atraso de 3 dia')
  t.end()
})

test('Superior a 3 dias', (t) => {
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-05') === 103.8, 'Atraso de 4 dia')
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-06') === 104.0, 'Atraso de 5 dia')
  t.end()
})

test('Superior a 5 dias', (t) => {
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-07') === 106.8, 'Atraso de 6 dia')
  t.assert(utils.calcValue(100, '2021-03-01', '2021-03-11') === 108.0, 'Atraso de 10 dia')
  t.end()
})
