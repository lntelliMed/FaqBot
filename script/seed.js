
const db = require('../server/db')
const {Message} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')


  const messages = await Promise.all([
    Message.create({ intent: 'greeting', reply: ['Hey there!', 'Hey, how is it going?'] }),
    Message.create({ intent: 'goodbye', reply: ['Bye bye!', 'Take care my friend!', 'See you later!'] }),
    Message.create({ intent: 'error', reply: ['Sorry, did not understand what you mean!', 'Not sure I understood you correctly'] }),
    Message.create({ intent: 'undefined_null', reply: [`So, you are asking about undefined versus null. That is a fantastic question. null is opt -in, undefined is often a "default" value, for example: for declared variables, the return value of a function that has no explicit return statement, object properties that don't exist. That means null is a signal to anybody seeing it that the programmer CHOSE to return null.Similarly it can reference something that currently has "no value" but will, or can in some cases. Sometimes null can be chosen for math(for math operations, it works like 0)`] }),
    Message.create({
      intent: 'react_state', reply: [`In react, state is a way to store data that is used in our view AND CHANGES. When we call setState it will change the data AND trigger react to re-render the virtual DOM for the component that was setStated.`]}),
    Message.create({ intent: 'pure_function', reply: ['It means no side effects', 'A pure function takes input and returns output AND DOES NOTHING ELSE. For example, it does not console.log or query a database or send Nimit text message.'] }),
    Message.create({
      intent: 'use_strict', reply: [`It constrains your program in certain useful ways, called strict mode. For example, the keyword this defaults to undefined instead of the global object`, `It forbids (I think) accidental global assignment (x = 5 as opposed to var x = 5)`, `It forbids octal syntax`, `It forbids with and a lot of other stuff. I think ES6 interpreters default to strict mode.`] }),
    Message.create({
      intent: 'garbage_collection', reply: [`Javascript interpreters routinely garbage collects any data for which no existing variable points to it. A variable can also point to some data by being an object or array, and having that data as a property value or element.`] }),


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
