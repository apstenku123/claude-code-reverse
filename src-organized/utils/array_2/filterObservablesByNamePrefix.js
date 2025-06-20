/**
 * Filters out observables whose 'name' property starts with a specific prefix based on the provided config.
 *
 * @param {Array<Object>} observables - The array of observable objects to filter. Each object may have a 'name' property.
 * @param {string} config - The configuration string used to build the prefix for filtering.
 * @returns {Array<Object>} a new array containing only observables whose 'name' does NOT start with the generated prefix.
 */
function filterObservablesByNamePrefix(observables, config) {
  // Construct the prefix to filter out: 'mcp__<config>__'
  const namePrefix = `mcp__${config}__`;

  // Filter out observables whose 'name' starts with the prefix
  return observables.filter(observable => {
    // Use optional chaining in case 'name' is undefined
    return !observable.name?.startsWith(namePrefix);
  });
}

module.exports = filterObservablesByNamePrefix;