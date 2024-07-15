import baseErro from "./baseErro.js";

class notFound extends baseErro {
  constructor(msg = 'Página não encontrada') {
    super(msg, 404);
  }
}

export default notFound;