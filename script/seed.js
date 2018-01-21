
const db = require('../server/db')
const {Message} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')


  const messages = await Promise.all([
    Message.create({ intent: 'greeting', reply: ['Hey there!', 'How is it going?'] }),
    Message.create({ intent: 'error', reply: ['Sorry, did not understand what you mean!', 'Not sure I understood you correctly'] }),
    Message.create({ intent: 'undefined', reply: ['So, you are asking about undefine. That is a fantastic question']}),
  ])

  console.log(`seeded ${messages.length} users`)
  console.log(`seeded successfully`)
}


seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
