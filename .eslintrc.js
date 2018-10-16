module.exports = {
  "plugins": [
    "react"
  ],
  "extends": [
    "standard",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "jest": true
  },
  "globals": {
    "shallow": true,
    "render": true,
    "mount": true
  }
};
