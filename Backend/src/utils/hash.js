const bcrypt = require('bcrypt');

const hash = (password) => (bcrypt.hashSync(password, 10, null));
const compareToHash = (password, hash) => (!password || !hash ? false : bcrypt.compareSync(password, hash));

module.exports = {
  hash,
  compareToHash,
};