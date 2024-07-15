import Requests from "./requests.js";

class ValidationError extends Requests {
  constructor(erro) {
    const msgErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join('; ');
      
    super(msgErro);
  }
}

export default ValidationError;