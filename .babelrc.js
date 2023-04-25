module.exports = api => {
  api.cache(true)

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]
  const plugins = []

  // Ignore CSS imports when generating snippets
  if (process.env.GEN_SNIPPETS) {
    plugins.push([
      'babel-plugin-transform-import-ignore',
      { patterns: ['.css'] },
    ])
  }

  return { presets, plugins }
}
