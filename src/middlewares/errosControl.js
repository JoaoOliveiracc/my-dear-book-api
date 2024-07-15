import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errosControl (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: 'Erro no parâmetro enviado.'});
  }

  if (erro instanceof mongoose.Error.ValidationError) {
    const msgErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join('; ');

    res.status(400).send({message: msgErro})
  }

  res.status(500).send({message: 'Erro interno no servidor.'});
}

export default errosControl;