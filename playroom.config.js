import path from 'path'

export default {
  components: './components.ts',
  outputPath: './storybook-static/playroom',
  exampleCode: '<Button />',
  openBrowser: false,
  // Webpack loaders/presets are transitive Playroom dependencies
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          include: path.resolve(import.meta.dirname, 'src'),
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
          test: /\.css$/i,
          include: path.resolve(import.meta.dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }),
}
