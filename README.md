# Storybook Playroom Addon

[![npm package version](https://img.shields.io/npm/v/storybook-addon-playroom)](https://www.npmjs.com/package/storybook-addon-playroom)
[![Build status](https://img.shields.io/github/workflow/status/rbardini/storybook-addon-playroom/Main)](https://github.com/rbardini/storybook-addon-playroom/actions)
[![Dependencies status](https://img.shields.io/librariesio/release/npm/storybook-addon-playroom)](https://libraries.io/npm/storybook-addon-playroom)

🧩 Design with [Playroom](https://github.com/seek-oss/playroom) inside [Storybook](https://storybook.js.org), using each story source as a starting point.

![Demo](demo.gif)

[View demo →](https://storybook-addon-playroom.js.org)

## Getting started

> **Note:** Playroom must be set up and running before using this addon, see [instructions](https://github.com/seek-oss/playroom#getting-started).

```console
npm install --save-dev storybook-addon-playroom
```

within [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ['storybook-addon-playroom'],
};
```

See [`example`](example) for a minimal working setup.

## Configuration

The addon can be configured via the `playroom` [parameter](https://storybook.js.org/docs/react/writing-stories/parameters). The following options are available:

| Option                           | Type      | Description                              | Default                 |
| :------------------------------- | :-------- | :--------------------------------------- | :---------------------- |
| `url`                            | `string`  | the Playroom URL                         | `http://localhost:9000` |
| `code`                           | `string`  | code to be used instead of story source  |                         |
| `disable`                        | `boolean` | whether to disable the addon             | `false`                 |
| `reactElementToJSXStringOptions` | `object`  | [react-element-to-jsx-string options][1] | `{ sortProps: false }`  |

To configure for all stories, set the `playroom` parameter in [`.storybook/preview.js`](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering):

```js
export const parameters = {
  playroom: {
    url: 'http://localhost:9000',
  },
};
```

You can also configure on per-story or per-component basis using [parameter inheritance](https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters):

```jsx
// Button.stories.js

// Use predefined code instead of story source in all Button stories
export default {
  title: 'Button',
  parameters: {
    playroom: {
      code: '<Button>Hello Button</Button>',
    },
  },
};

// Disable addon in Button/Large story only
export const Large = Template.bind({});
Large.parameters = {
  playroom: {
    disable: true,
  },
};
```

> **Note:** Disabling the addon does not hide the _Playroom_ tab from preview. For that, you must use Storybook's own [`previewTabs`](https://github.com/storybookjs/storybook/pull/9095) parameter:

```js
Story.parameters = {
  previewTabs: {
    'storybook/playroom/panel': {
      hidden: true,
    },
  },
};
```

## Generating Playroom snippets from stories

> **Note:** This is an experimental feature.

Playroom addon comes with a `sb-playroom` CLI tool that can auto-generate [Playroom snippets](https://github.com/seek-oss/playroom#snippets) from Storybook stories via the `gen-snippets` command:

```console
$ sb-playroom gen-snippets --help
Usage: sb-playroom gen-snippets [options] [config-dir]

generate Playroom snippets from stories (experimental)

Options:
  -o, --out-file <path>     output file (default: "snippets.json")
  -c, --config-file <path>  Babel config file
  -h, --help                display help for command
```

By default, `gen-snippets` will fetch the Storybook configuration from the `.storybook` directory and output the snippets to a `snippets.json` file. Different input and output paths can be passed as arguments.

You can then reference the output file in [`playroom.config.js`](https://github.com/seek-oss/playroom#getting-started).

### Babel configuration

Because Playroom addon programmatically runs Storybook to collect story sources, Babel is used to compile stories on the fly. If the loaded Babel configuration does not work with your Storybook, a [Babel config file](https://babeljs.io/docs/en/config-files) can be defined with the `-c, --config-file` option.

[1]: https://github.com/algolia/react-element-to-jsx-string#reactelementtojsxstringreactelement-options
