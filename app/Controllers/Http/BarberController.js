'use strict'

const User = use('App/Models/User')

class BarberController {
    async index({}) {
        const barbers = await User
            .query()
            .where('role', 'barber')
            .with('images')
            .fetch()

        return barbers
    }
}

module.exports = BarberController
