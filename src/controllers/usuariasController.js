
const Usuaria = require('../models/usuarias')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = async (req, res) => {
  // objetivo: criar uma nova usuária
    // acessar os dados da usuária enviado no body
  //console.log(req.body.senha)
  // const senhaComHash = 'senhadificil'
  // const senhaComHash = bcrypt.hashSync(req.body.senha, salt)
  const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
  req.body.senha = senhaComHash
  //console.log(senhaComHash)
  const usuaria = new Usuaria(req.body)
  // console.log('USUARIA', usuaria)

  try {
    const novaUsuaria = await usuaria.save()
    res.status(201).json(novaUsuaria)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const login = (req, res)=> {
  Usuaria.findOne({email: req.body.email},
    (err, usuariaEncontrada) =>{
      if(!usuariaEncontrada){
        return res.status(404).send({ message: 'usuaria não encontrada', 
        email: `${req.body.email}`
      })
      }
      const senhValida = bcrypt.compareSync(req.body.senha, usuariaEncontrada.senha)
      console.log()
      if(!senhValida){
        res.status(401).send({message: `logim não autorizado`})
      }

      const token = jwt.sign({email: req.body.email},SECRET)
      res.status(200).send({message: "logim realizado com sucesso", token: token})
    })
}

module.exports = { 
  create,
  login }
