module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "plugin:jest/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "jest"
    ],
    "rules": {
	no-console: 0
  import/extensions: # FIXME: remove when rule will be adjusted for new nodejs version
    - error
    - ignorePackages
    - js: always
    }
}
