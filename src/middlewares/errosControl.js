import mongoose from "mongoose";
import baseErro from "../erros/baseErro.js";
import Requests from "../erros/requests.js";
import ValidationError from "../erros/validationErr.js";

// eslint-disable-next-line no-unused-vars
function errosControl (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new Requests().sendResponse(res);
  }

  if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  }

  if (erro instanceof baseErro) {
    erro.sendResponse(res);
  }

  new baseErro().sendResponse(res);
}

export default errosControl;