function config(entry = []) {
  return [...entry, require.resolve('./dist/esm/preset/addDecorator')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}

module.exports = {
  config,
  managerEntries,
};
