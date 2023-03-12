const { body } = require('express-validator')

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório.')
      .isLength({ min: 3, max: 55 })
      .withMessage('O nome precisa conter entre 3 à 55 caracteres.'),
    body('email')
      .isString()
      .withMessage('O email é obrigatório.')
      .isEmail()
      .withMessage('Insira um email válido'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatória.')
      .isLength({ min: 6 })
      .withMessage('A senha precisa conter no mínimo 6 caracteres.'),
    body('confirmPassword')
      .isString()
      .withMessage('A conffirmação de senha é obrigatória.')
      .custom((value, {req}) => {
        if(value != req.body.password) {
          throw new Error('As senhas não são iguais.')
        }
        return true
      })
  ]
}

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('O email e obrigatório.')
      .isEmail()
      .withMessage('Insira um email válido.'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatória.')
  ]
}

const userUpdateValidation = () => {

  return [
    body('name')
      .optional()
      .isLength({ min: 3, max: 55 })
      .withMessage('O nome precisa ter entre 3 à 55 caracteres.'),
    body('password')
      .optional()
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter pelo menos 5 caracteres.')
  ]

}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
}