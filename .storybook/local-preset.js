function previewAnnotations(entry = []) {
  return [...entry, require.resolve('../dist/preview.js')]
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('../dist/manager.js')]
}

module.exports = {
  managerEntries,
  previewAnnotations,
}
