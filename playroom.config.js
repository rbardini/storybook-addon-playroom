const path = require('path')

module.exports = {
  components: './components.ts',
  outputPath: './storybook-static/playroom',
  snippets: './snippets.json',
  exampleCode: '<Button />',
  openBrowser: false,
  // Webpack loaders/presets are transitive Playroom dependencies
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }),
}
