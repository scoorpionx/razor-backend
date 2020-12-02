'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response,
    auth
  }) {
    try {
      const fileJar = request.file('image', {
        types: ['image'],
        size: '5mb'
      })

      const user_id = request.only(['user_id']) || auth.user.id

      let images = []

      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar)

        if (file.moved()) {
          const image = await Image.create({
            user_id: user_id,
            path: file.fileName,
            size: file.size
          })

          images.push(image)

          return response.status(201).send(image)
        }

        return response.status(400).send({
          message: 'Não foi possível processar esta imagem no momento!',
          errors: err.message
        })
      }

      let files = await manage_multiples_upload(fileJar)

      await Promise.all(
        files.successes.map(async file => {

          const image = await Image.create({
            path: file.fileName,
            size: file.size,
          })

          images.push(image)
        })
      )

      return response.status(201).send({
        successes: images,
        errors: files.errors
      })
    } catch (err) {
      return response.status(400).send({
        message: 'Não possível processar a sua solicitação!',
        error: err.message
      })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = ImageController
