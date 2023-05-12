function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) {
    return res.redirect("/products");
  }
  next();
}

function checkSession(req, res, next) {
  if (req.session.user) return res.redirect("/");
  next();
}

function isAdmin(req, res, next) {
  if (req.session?.user) {
    if (
      req.session.user.email === "adminCoder@coder.com" &&
      req.session.user.role === "admin"
    ) {
      return next();
    } else {
      return res
        .status(401)
        .send({ status: "error", message: "User not authorized" });
    }
  } else {
    return res.redirect("/login");
  }
}

export { checkLogged, checkLogin, checkSession, isAdmin };
