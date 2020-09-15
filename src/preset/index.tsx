type PlayroomOptions = {
  addDecorator?: boolean;
};

export function managerEntries(entry: unknown[] = []) {
  return [...entry, require.resolve('../register')];
}

export function config(
  entry: unknown[] = [],
  { addDecorator = true }: PlayroomOptions = {},
) {
  const playroomConfig = [];

  if (addDecorator) {
    playroomConfig.push(require.resolve('./addDecorator'));
  }

  return [...entry, ...playroomConfig];
}
