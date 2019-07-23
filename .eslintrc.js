module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        'google',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'rules': {
        'eol-last': 0,
        'indent': ['error', 4],
        'object-curly-spacing': 0
    },
};
