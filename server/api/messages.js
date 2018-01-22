const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/:intent', (req, res, next) => {
  Message.findOne({
    where: {intent: req.params.intent}
  })
    .then(message => {
      let botReply = ''
      if (message)
      {
        botReply = message.reply
      } else {
        botReply = 'Sorry, did not understand what you mean!'
      }
      return res.json(botReply)
      // return res.json(message.reply)
    })
    .catch(next)
})
