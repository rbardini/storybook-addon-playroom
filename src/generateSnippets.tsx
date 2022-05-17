/* eslint-disable global-require, no-console, import/no-dynamic-require, @typescript-eslint/no-var-requires */
// Based on https://github.com/storybookjs/storybook/blob/next/addons/storyshots/storyshots-core/src/frameworks/configure.ts
import fs from 'fs';
import path from 'path';
import global from 'global';
import { yellow } from 'ansi-colors';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import registerGlobalJSDOM from 'global-jsdom';
import { ReactNode } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Loadable } from '@storybook/addons';
import { ClientApi } from '@storybook/client-api';
import {
  StoriesEntry,
  normalizeStoriesEntry,
  toRequireContext,
} from '@storybook/core-common';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  AnyFramework,
  ArgsEnhancer,
  ArgTypesEnhancer,
  DecoratorFunction,
} from '@storybook/csf';

import { getOptions } from './utils';

interface ConfigurableClientApi extends ClientApi<AnyFramework> {
  configure(
    loader: Loadable,
    module: NodeJS.Module | false,
    showDeprecationWarning?: boolean,
  ): void;
}

type Output = {
  preview?: string;
  stories?: string[];
};

type Configuration = {
  configDir?: string;
};

type Options = {
  outFile: string;
};

registerRequireContextHook();
registerGlobalJSDOM();

const storybook = require('@storybook/react') as ConfigurableClientApi;

const isFile = (file: string) => {
  try {
    return fs.lstatSync(file).isFile();
  } catch (err) {
    return false;
  }
};

const extensions = ['ts', 'tsx', 'js', 'jsx'];

const resolveFile = (configDir: string, filenames: string[]) =>
  filenames
    .flatMap((filename) =>
      extensions.map((ext) => path.join(configDir, `${filename}.${ext}`)),
    )
    .find(isFile) || false;

const getPreviewFile = (configDir: string) =>
  resolveFile(configDir, ['preview', 'config']);

const getMainFile = (configDir: string) => resolveFile(configDir, ['main']);

const getConfigPathParts = (input: string): Output => {
  const configDir = path.resolve(input);

  if (fs.lstatSync(configDir).isDirectory()) {
    const output: Output = {};
    const preview = getPreviewFile(configDir);
    const main = getMainFile(configDir);

    if (preview) {
      output.preview = preview;
    }

    if (main) {
      const { stories = [] } = require(main);
      const workingDir = process.cwd();

      output.stories = stories.map((entry: StoriesEntry) => {
        const specifier = normalizeStoriesEntry(entry, {
          configDir,
          workingDir,
        });
        const {
          path: basePath,
          recursive,
          match,
        } = toRequireContext(specifier);

        // eslint-disable-next-line no-underscore-dangle
        return global.__requireContext(workingDir, basePath, recursive, match);
      });
    }

    return output;
  }

  return { preview: configDir };
};

const configure = (options: Configuration) => {
  const { configDir } = options;
  const { preview, stories } = getConfigPathParts(configDir);

  if (preview) {
    const {
      parameters,
      decorators,
      globals,
      globalTypes,
      argsEnhancers,
      argTypesEnhancers,
    } = require(preview);

    if (decorators) {
      decorators.forEach((decorator: DecoratorFunction) =>
        storybook.addDecorator(decorator),
      );
    }

    if (parameters || globals || globalTypes) {
      storybook.addParameters({ ...parameters, globals, globalTypes });
    }

    if (argsEnhancers) {
      argsEnhancers.forEach((enhancer: ArgsEnhancer) =>
        storybook.addArgsEnhancer(enhancer),
      );
    }

    if (argTypesEnhancers) {
      argTypesEnhancers.forEach((enhancer: ArgTypesEnhancer) =>
        storybook.addArgTypesEnhancer(enhancer),
      );
    }
  }

  if (stories?.length > 0) {
    storybook.configure(stories, false, false);
  }
};

export default (configDir: string, { outFile }: Options) => {
  configure({
    configDir,
  });

  const snippets = storybook
    .raw()
    .map(({ kind: group, name, storyFn, parameters: { playroom } = {} }) => {
      const { disable, reactElementToJSXStringOptions } = getOptions(playroom);

      if (disable) {
        return undefined;
      }

      console.log(`Generating ${yellow([group, name].join('/'))} snippet...`);

      const code = reactElementToJSXString(
        storyFn() as ReactNode,
        reactElementToJSXStringOptions,
      );

      return { group, name, code };
    })
    .filter(Boolean);
  const count = snippets.length;

  fs.writeFileSync(
    path.resolve(process.cwd(), outFile),
    JSON.stringify(snippets, null, 2),
  );

  console.log(`\n${count} ${count === 1 ? 'snippet' : 'snippets'} generated.`);
};
