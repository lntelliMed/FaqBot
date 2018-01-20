
const db = require('../server/db')
const {Message} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')


  const messages = await Promise.all([
    Message.create({ intent: 'greeting', reply: ['Hey there!', 'How is it going?']}),
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
