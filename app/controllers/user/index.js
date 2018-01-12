import User from '../../models/user';

const setup = (req, res) => {

  const user = new User({
    name: 'Raphael Freitas',
    password: 'password',
    admin: true
  });

  let promisse = user.save();

  return promisse.then(doc => {
    console.log(`User ${doc} was created with success !!!`);
    return res.status(201).json(doc);
  });

  console.error(`Internal Server Error`)
  return res.status(500).send('Internal Server Error');
}

const findAll = (req, res) => {

  User.find({}, (err, users) => {

    if (err) {
      console.error(`Internal Server Error ${err}`);
      return res.status(500).json(err);
    };

    console.log(`The users were found with success !!!`);
    return res.status(200).json(users);
  });
}

module.exports = {
  setup: setup,
  findAll: findAll
};