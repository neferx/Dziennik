import jwt from 'jsonwebtoken';
import { secret } from '../settings';

export const generateToken = (name, lastname, email) => {
  const payload = {
    user: {
      name: name,
      lastname: lastname,
      email: email,
    },
  };
  return jwt.sign(payload, secret, { expiresIn: 120000 });
};

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
