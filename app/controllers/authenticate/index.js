import User    from '../../models/user';
import jwt     from 'jsonwebtoken';
import express from 'express';

const app       = express();

const authenticate = (req, res) => {

  console.log('authenticating ...');
  User.findOne({ name: req.body.name }, (err, user) => {

      if (err) throw err;

      if (!user) {
        console.info(`user was not found ${req.body.name}`)
        return res.status(404).json({ message: 'Authentication failed. User not found.' });
      }

      console.log('user was found succesfully');
      const payload = { admin: user.admin }

      //generating token
      const token = jwt.sign(payload, 'mysecretkey');

      console.error('authenticated');
      return res.status(201).json({ message: 'Enjoy your token', token: token })
  });

}

const verify = (req, res, next) => {

  //get token
  console.log('verifying authenticate ...');
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    return jwt.verify(token, 'mysecretkey', (err, decoded) => {

      if (err) {
        console.error(`Failed to authenticate token: ${err}`);
        return res.status(500).json({ message: 'Failed to authenticate token.' });
      }

      console.log('Token verify successfully decoded');
      req.decoded = decoded;
      return next();
    })

  }

  console.error('No token provided.');
  return res.status(403).send({  message: 'No token provided.' });
}

module.exports = {
  authenticate: authenticate,
  verify: verify
}