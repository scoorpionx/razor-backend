'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name', 90).notNullable()
      table.string('cpf', 11).notNullable()
      table.date('birth').notNullable()
      table.string('phone', 12).notNullable()
      table.enu('role', ['client', 'barber'], { useNative: true }).notNullable()
      table.string('description', 240)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
