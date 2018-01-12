import NPM_PACKAGE_JSON from '../../../package.json';

let getInfo = (req, res) => {

  const INFO = {
    name:        NPM_PACKAGE_JSON.name,
    version:     NPM_PACKAGE_JSON.version,
    description: NPM_PACKAGE_JSON.description,
  }

  return res.status(200).json(INFO);
}

module.exports = { getInfo: getInfo };