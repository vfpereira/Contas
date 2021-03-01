
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const accountSchema = require('../../model/account.js')
const utils = require('./utils')
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/', function (req, res, next) {
  const account = {
    name: req.body.Nome,
    originalValue: req.body['Valor Original'],
    value: utils.calcValue(req.body['Valor Original'], req.body['Data de Vencimento'], req.body['Data de Pagamento']),
    dueDate: req.body['Data de Vencimento'],
    payday: req.body['Data de Pagamento'],
    delayDays: utils.delayDays(req.body['Data de Vencimento'], req.body['Data de Pagamento'])
  }
  const accountModel = accountSchema
  accountModel(account).save()
    .then(() => res.send({ error: false, msg: 'Account saved with success', status: 201 }))
    .catch((err) => console.log(res.send({ error: true, msg: err })))
})

router.get('/', function (req, res, next) {
  const accountModel = accountSchema
  accountModel.find(function (err, accounts) {
    if (err) {
      res.send({ error: true, msg: err })
    }

    const accountsFormatted = accounts.map(account => {
      return {
        Nome: account.name,
        'Valor Original': account.originalValue,
        'Valor Corrigido': account.value,
        'Quantidade de dias de atraso': account.delayDays,
        'Data de Pagamento': account.payday
      }
    })

    res.send({ error: false, msg: accountsFormatted, status: 200 })
  })
})

module.exports = router
