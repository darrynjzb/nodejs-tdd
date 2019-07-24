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
        'object-curly-spacing': 0,
        'comma-dangle': 0,
        'brace-style': 0,
        'block-spacing': 0,
        'no-trailing-spaces': 0
    },
};
