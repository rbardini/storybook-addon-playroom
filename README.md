# Storybook Playroom Addon

[![npm package version](https://img.shields.io/npm/v/storybook-addon-playroom)](https://www.npmjs.com/package/storybook-addon-playroom)
[![Build status](https://img.shields.io/github/workflow/status/rbardini/storybook-addon-playroom/Main)](https://github.com/rbardini/storybook-addon-playroom/actions)
[![Dependencies status](https://img.shields.io/david/rbardini/storybook-addon-playroom)](https://david-dm.org/rbardini/storybook-addon-playroom)
[![devDependencies status](https://img.shields.io/david/dev/rbardini/storybook-addon-playroom)](https://david-dm.org/rbardini/storybook-addon-playroom?type=dev)

Design with [Playroom](https://github.com/seek-oss/playroom) inside [Storybook](https://storybook.js.org), using each story source as a starting point.

[Live demo](https://storybook-addon-playroom.netlify.com)

![Demo](demo.gif)

## Installation

```console
npm install --save-dev storybook-addon-playroom
```

within `.storybook/main.js`:

```js
module.exports = {
  addons: ['storybook-addon-playroom']
}
```

within `.storybook/preview.js`:

```js
import { addDecorator } from '@storybook/react';
import { withPlayroom } from 'storybook-addon-playroom';

addDecorator(withPlayroom); // before any other decorators
```

See [`example`](example) for a minimal working setup.

## Configuration

The addon can be configured globally and per story with the `playroom` parameter. The following options are available:

| Option                           | Description                              | Default                 |
|:---------------------------------|:-----------------------------------------|:------------------------|
| `url`                            | the Playroom URL                         | `http://localhost:9000` |
| `disabled`                       | whether to disable the addon             | `false`                 |
| `reactElementToJSXStringOptions` | [react-element-to-jsx-string options][1] | `{ sortProps: false }`  |

### Global configuration

To add Playroom to all stories, call `addParameters` in `.storybook/preview.js`:

```js
import { addParameters } from '@storybook/react';

addParameters({
  playroom: {
    url: 'http://localhost:9000', // your Playroom URL (default)
  },
});
```

### Per-story configuration

To configure Playroom for a single story or a set of stories, add the `playroom` parameter:

```js
export default {
  title: 'Stories',
  parameters: {
    playroom: {
      url: 'http://localhost:9000',
    },
  },
};

export const myStory = () => '<h1>Hello World</h1>';
myStory.story = {
  parameters: {
    playroom: {
      url: 'http://localhost:9000',
    },
  },
};
```

[1]: https://github.com/algolia/react-element-to-jsx-string#reactelementtojsxstringreactelement-options
