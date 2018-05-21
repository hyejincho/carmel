const moment = require('moment')

const mainPeriodId = 'AirDrop'
const mainStartDate = '21 May 2018 00:00:00 PDT'
const mainStartTotalDays = 20
const mainStartTokens = 100
const mainStartDailyLimit = 21000
const mainDailyTokensDecrement = 5
const mainDailyLimitDecrement = 2000

const current = () => {
  const startDay = moment(`${mainStartDate}`)
  const today = moment()
  const day = today.diff(startDay, 'days')
  const hour = today.diff(startDay, 'hours')

  const tokens = mainStartTokens - (day * mainDailyTokensDecrement)
  const daysLeft = mainStartTotalDays - day - 1
  const dailySupply = mainStartDailyLimit - (day * mainDailyLimitDecrement)

  if (daysLeft <= 0) {
    throw new Error('This period has ended.')
  }

  if (dailySupply <= 0) {
    throw new Error('The daily limit has been reached.')
  }

  return ({ periodId: mainPeriodId, day, tokens, hour })
}

module.exports = {
  current
}
