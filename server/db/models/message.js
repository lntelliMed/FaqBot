const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  intent: {
    type: Sequelize.STRING
  },
  reply: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    get() {
      const randomIndex = Math.floor(Math.random() * this.getDataValue('reply').length)
      return '\tFaqBot: ' + this.getDataValue('reply')[randomIndex]
    }
  }
})

module.exports = Message
