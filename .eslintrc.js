module.exports = {
    'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
    'ecmaVersion': 12
    },
    'rules': {
    'indent': [
        'error',
        2
    ],
    'linebreak-style': [
        'error',
        'unix'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ],
    // 'arrow-spacing':[
    //     'error',{'before': true, 'after': true}
    // ],
    'no-console':0,
    'no-undef':0

    }
}
