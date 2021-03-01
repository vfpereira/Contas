import React, { useState } from 'react'
import axios from 'axios'

export default function App () {
  const [name, setName] = useState('')
  const [originalValue, setOriginalValue] = useState('')
  const [payday, setPayday] = useState('')
  const [dueDate, setDuedate] = useState('')
  const [response, setResponse] = useState('')
  const [listResponse, setListResponse] = useState('')

  const createAccount = function () {
    axios.post('http://127.0.0.1:8088/api/v1.0/', {
      Nome: name,
      'Valor Original': originalValue,
      'Data de Vencimento': dueDate,
      'Data de Pagamento': dueDate
    }).then((resp) => setResponse(resp.data.msg)).catch(e => setResponse('Erro'))
  }

  const listAccounts = function () {
    axios.get('http://127.0.0.1:8088/api/v1.0/')
      .then((resp) => setListResponse(
        resp.data.msg.map(account =>
          '<p>Nome: ' + account.Nome +
          ' Valor Original: ' + account['Valor Original'] +
          ' Valor Corrigido: ' + account['Valor Corrigido'] +
          ' Quantidade de dias de atraso: ' + account['Quantidade de dias de atraso'] +
          ' Data de Pagamento: ' + (new Date(Date.parse(account['Data de Pagamento']))) + '</p>')))
      .catch(e => setResponse('Erro'))
  }

  return (
    <>
      <p><span>{response}</span></p>
      <p><input placeholder='Nome:' value={name} onChange={(e => setName(e.target.value))} /></p>
      <p><input placeholder='Valor Original:' value={originalValue} onChange={(e => setOriginalValue(e.target.value))} /></p>
      <p><input placeholder='Data de Vencimento(yyyy-mm-dd):' value={dueDate} onChange={(e => setDuedate(e.target.value))} /></p>
      <p><input placeholder='Data de Pagamento(yyyy-mm-dd):' value={payday} onChange={(e => setPayday(e.target.value))} /></p>
      <p><button onClick={createAccount}>Criar Conta</button></p>
      <p><button onClick={listAccounts}>Listar Contas</button></p>
      <div dangerouslySetInnerHTML={{ __html: listResponse }} />
    </>
  )
}
