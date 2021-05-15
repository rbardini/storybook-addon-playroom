const presetEnvOptions = {
  bugfixes: true,
  corejs: '3',
  modules: false,
  shippedProposals: true,
  targets: 'defaults',
  useBuiltIns: 'usage',
};

module.exports = {
  assumptions: {
    noDocumentAll: true,
    privateFieldsAsProperties: true,
    setClassMethods: true,
    setComputedProperties: true,
    setPublicClassFields: true,
    setSpreadProperties: true,
  },
  env: {
    cjs: {
      presets: [
        ['@babel/preset-env', { ...presetEnvOptions, modules: 'cjs' }],
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
    },
  },
  presets: [
    ['@babel/preset-env', presetEnvOptions],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
