module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    'storybook-addon-playroom',
  ],
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
  stories: ['../stories/**/*.stories.js'],
};
