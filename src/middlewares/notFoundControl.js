import notFound from "../erros/notFound.js";

function notFoundControl(req, res, next) {
  const err404 = new notFound();
  next(err404);
}

export default notFoundControl;