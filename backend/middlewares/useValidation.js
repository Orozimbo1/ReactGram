const { body } = require('express-validator')

const userCreateValidation = (req, res, next) => {
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
    body('confirmpassword')
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

module.exports = {
  userCreateValidation,
  loginValidation,
}