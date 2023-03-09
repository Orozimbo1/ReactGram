const { body } = require('express-validator')

const photoInsertValidation = () => {
  return [
    body('title')
      .not()
      .equals('undefined')
      .withMessage('O título e obrigatório.')
      .isString()
      .withMessage('O título e obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O título precisa ter pelo menos 3 caracteres.'),
    body('image')
      .custom((value, {req}) => {
        if(!req.file) {
          throw new Error('A imagem é obrigatória.')
        }
        return true
      }),
  ]
}

const photoValidation = () => {
  return [
    body('title')
      .optional()
      .isString()
      .withMessage('O título é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O título precisa ter pelo menos 3 caracteres.')
  ]
}

module.exports = {
  photoInsertValidation,
  photoValidation
}