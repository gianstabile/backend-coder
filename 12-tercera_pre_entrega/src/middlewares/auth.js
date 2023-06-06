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
    if (req.session.user.email === "adminCoder@coder.com" && req.session.user.role === "admin") {
      return next();
    } else {
      return res.status(401).send({ status: "error", message: "User not authorized" });
    }
  } else {
    return res.redirect("/login");
  }
}

function authorizeRole(allowRoles) {
  return (req, res) => {
    const { role } = req.session.user;

    if (!allowRoles.includes(role)) {
      return res.status(403).send({ status: "error", error: "unauthorized" });
    }
  };
}

export { checkLogged, checkLogin, checkSession, isAdmin, authorizeRole };
