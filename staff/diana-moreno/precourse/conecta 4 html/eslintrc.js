module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    },
    "parser": "babel-eslint",
    "settings": {
        "react": {
            // Pragma to use, default to "React"
            "pragma": "React",
            // React version. "detect" automatically picks the version you have installed.
            // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
            // Default to latest and warns if missing It will default to "detect" in the future
            "version": "detect",
        },
    }
};