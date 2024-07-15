import notFound from "../erros/notFound";

function notFoundControl(req, res, next) {
  const err404 = new notFound();
  next(err404);
}

export default notFoundControl;