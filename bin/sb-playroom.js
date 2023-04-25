#!/usr/bin/env node
const program = require('commander')
const { version } = require('../package.json')

program
  .command('gen-snippets [config-dir]')
  .description('generate Playroom snippets from stories (experimental)')
  .option('-o, --out-file <path>', 'output file', 'snippets.json')
  .option('-c, --config-file <path>', 'Babel config file')
  .action((configDir = '.storybook', { configFile, ...options }) => {
    require('@babel/register')({
      configFile,
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      only: [new RegExp()],
    })
    require('../dist/generateSnippets.js')(configDir, options)
    process.exit()
  })

program.version(version, '-v, --version').parse(process.argv)

if (program.rawArgs.length < 3) {
  program.help()
}
