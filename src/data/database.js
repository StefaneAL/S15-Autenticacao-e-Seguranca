const mongoose = require('mongoose')
const MONGOURL = process.env.MONGODB_URL
const SCRET = process.env.SECRET


//console.log(process.env)
// console.log('mongo url', MONGOURL)

const connect = () => {mongoose.connect(
  MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }