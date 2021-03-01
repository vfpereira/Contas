
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
  accountModel.find(function (err, account) {
    if (err) {
      res.send({ error: true, msg: err })
    }
    res.send({ error: false, msg: account, status: 200 })
  })
})

module.exports = router
