
const db = require('../server/db')
const {Message} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')


  const messages = await Promise.all([
    Message.create({ intent: 'greeting', reply: ['Hey there!', 'How is it going?'] }),
    Message.create({ intent: 'error', reply: ['Sorry, did not understand what you mean!', 'Not sure I understood you correctly'] }),
    Message.create({ intent: 'undefined_faq', reply: ['So, you are asking about undefined. That is a fantastic question'] }),
    Message.create({
      intent: 'react_state', reply: [`In react, state is a way to store data that is used in our view AND CHANGES. When we call setState it will change the data AND trigger react to re-render the virtual DOM for the component that was setStated.`]}),
    Message.create({ intent: 'pure_function', reply: ['It means no side effects', 'The function takes input and returns output AND DOES NOTHING ELSE. For example, it does not console.log or query a database or send Nimit text message.'] }),

  ])

  console.log(`seeded ${messages.length} rows`)
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
