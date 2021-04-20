const cookieParser = require("cookie-parser");

cookieParser()((req, res, next) => {});

export const attachMiddleware = (...middlewares) => (req, res) => {
  for (const middleware of middlewares) {
    middleware();
  }
};
