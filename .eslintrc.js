module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        commonjs: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module"
    },
    rules: {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": 0,
        "constructor-super": "warn",
        "valid-typeof": "warn"
    }
}
