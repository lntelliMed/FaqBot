const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/:intent', (req, res, next) => {
  Message.findOne({
    where: {intent: req.params.intent}
  })
    .then(message => {
      console.log('ap',message)
      return res.json(message.messages)
    })
    .catch(next)
})
