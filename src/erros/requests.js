import baseErro from "./baseErro.js";

class Requests extends baseErro {
  constructor(msg = 'Um ou mais dados fornecidos estão incorretos') {
    super(msg, 400);
  }
}

export default Requests;