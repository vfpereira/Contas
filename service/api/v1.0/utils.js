const calcValue = function (value, dueDate, payday) {
  const delay = delayDays(dueDate, payday)
  if (delay === 0) {
    return value
  } else if (delay <= 3) {
    return (value + (value * 0.02) + (value * delay * 0.1 / 100))
  } else if (delay > 3 && delay <= 5) {
    return (value + (value * 0.03) + (value * delay * 0.2 / 100))
  } else {
    return (value + (value * 0.05) + (value * delay * 0.3 / 100))
  }
}

const delayDays = function (dueDate, payday) {
  const timeDifference = new Date(payday).getTime() - new Date(dueDate).getTime()
  const differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24))
  return differentDays > 0 ? differentDays : 0
}

module.exports = {
  calcValue,
  delayDays
}
