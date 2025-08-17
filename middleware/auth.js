const Session = require("../models/Session");

async function authMiddleware(req, res, next) {
  try {
    const sessionId = req.cookies.sessionId || req.headers.authorization;

    if (!sessionId) {
      return res.redirect("/signUP");
    }

    const session = await Session.findOne({ sessionId }).populate("userId");

    if (!session) {
      res.clearCookie("sessionId");
      return res.redirect("/signUP");
    }

    req.user = session.userId;
    req.sessionId = sessionId;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.clearCookie("sessionId");
    res.redirect("/");
  }
}

module.exports = authMiddleware;
