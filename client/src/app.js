import React, { useState } from 'react'
import axios from 'axios'

export default function App () {
  const [name, setName] = useState('')
  const [originalValue, setOriginalValue] = useState('')
  const [payday, setPayday] = useState('')
  const [dueDate, setDuedate] = useState('')
  const [response, setResponse] = useState('')

  const createAccount = function () {
    axios.post('http://127.0.0.1:8088/api/v1.0/', {
      Nome: name,
      'Valor Original': originalValue,
      'Data de Vencimento': dueDate,
      'Data de Pagamento': dueDate
    }).then((resp) => console.log(resp)).catch(e => setResponse('Erro'))
  }

  return (
    <>
      <span>{response}</span>
      <input placeholder='Nome:' value={name} onChange={(e => setName(e.target.value))} />
      <input placeholder='Valor Original:' value={originalValue} onChange={(e => setOriginalValue(e.target.value))} />
      <input placeholder='Data de Vencimento(yyyy-mm-dd):' value={dueDate} onChange={(e => setDuedate(e.target.value))} />
      <input placeholder='Data de Pagamento(yyyy-mm-dd):' value={payday} onChange={(e => setPayday(e.target.value))} />
      <button onClick={createAccount}>Criar Conta</button>
    </>
  )
}
