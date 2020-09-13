/* eslint-disable global-require, no-console, no-underscore-dangle */
/* eslint-disable import/no-dynamic-require, @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import global from 'global';
import { yellow } from 'ansi-colors';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import plur from 'plur';
import { ReactNode } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Loadable } from '@storybook/addons';
import { ClientApi, ArgTypesEnhancer, DecoratorFunction } from '@storybook/client-api';
import { toRequireContext } from '@storybook/core/server';
import * as storybook from '@storybook/react';

import { getOptions } from './utils';

interface ConfigurableClientApi extends ClientApi {
  configure(
    loader: Loadable,
    module: NodeJS.Module | false,
    showDeprecationWarning?: boolean,
  ): void;
}

type Output = {
  preview?: string;
  stories?: string[];
}

type Configuration = {
  configDir?: string;
}

type Options = {
  outFile: string;
}

registerRequireContextHook();

const isFile = (file: string) => {
  try {
    return fs.lstatSync(file).isFile();
  } catch (err) {
    return false;
  }
};

const extensions = ['ts', 'tsx', 'js', 'jsx'];

const resolveFile = (configDir: string, filenames: string[]) => filenames
  .flatMap((filename) => extensions.map((ext) => path.join(configDir, `${filename}.${ext}`)))
  .find(isFile) || false;

const getPreviewFile = (configDir: string) => resolveFile(configDir, ['preview', 'config']);

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

      output.stories = stories.map(
        (pattern: string | { path: string; recursive: boolean; match: string }) => {
          const { path: basePath, recursive, match } = toRequireContext(pattern);
          const regex = new RegExp(match);

          return global.__requireContext(
            configDir,
            basePath,
            recursive,
            regex,
          );
        },
      );
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
      argTypesEnhancers,
    } = require(preview);

    if (decorators) {
      decorators.forEach((decorator: DecoratorFunction) => (
        (storybook as unknown as ConfigurableClientApi).addDecorator(decorator)));
    }

    if (parameters || globals || globalTypes) {
      (storybook as unknown as ConfigurableClientApi)
        .addParameters({ ...parameters, globals, globalTypes });
    }

    if (argTypesEnhancers) {
      argTypesEnhancers.forEach((enhancer: ArgTypesEnhancer) => (
        storybook as unknown as ConfigurableClientApi).addArgTypesEnhancer(enhancer));
    }
  }

  if (stories?.length > 0) {
    (storybook as unknown as ConfigurableClientApi).configure(stories, false, false);
  }
};

export default (configDir: string, { outFile }: Options) => {
  configure({
    configDir,
  });

  const snippets = (storybook as unknown as ConfigurableClientApi)
    .raw()
    .map(({
      kind: group,
      name,
      getOriginal,
      parameters: {
        playroom,
      } = {},
    }) => {
      const { disabled, reactElementToJSXStringOptions } = getOptions(playroom);

      if (disabled) {
        return undefined;
      }

      console.log(`Generating ${yellow([group, name].join('/'))} snippet...`);

      const element = getOriginal()() as ReactNode;
      const code = reactElementToJSXString(element, reactElementToJSXStringOptions);

      return { group, name, code };
    })
    .filter(Boolean);

  fs.writeFileSync(
    path.resolve(process.cwd(), outFile),
    JSON.stringify(snippets, null, 2),
  );

  console.log(`\n${snippets.length} ${plur('snippet', snippets.length)} generated.`);
};
