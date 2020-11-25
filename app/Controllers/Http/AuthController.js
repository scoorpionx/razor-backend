'use strict'

class AuthController {
    async register({ request }) {
        const data = request.only(['email', 'password', 'name', 'cpf', 'birth', 'phone', 'role', 'description'])
        const user = await User.create(data)

        return user
    }

    async authenticate({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)

        return token
    }
}

module.exports = AuthController
