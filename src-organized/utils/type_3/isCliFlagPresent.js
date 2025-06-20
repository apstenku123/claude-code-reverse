/**
 * Checks if a specific CLI flag is present in the argument list before the first '--' separator.
 *
 * @param {string} flagName - The name of the CLI flag to check for (e.g., 'help', 'createRangeIterator', 'verbose').
 * @param {string[]} [argv] - The array of CLI arguments to search. Defaults to Deno.args if running in Deno, otherwise process.argv.
 * @returns {boolean} True if the flag is present before the first '--' separator, false otherwise.
 */
function isCliFlagPresent(flagName, argv = (typeof globalThis.Deno !== 'undefined' ? globalThis.Deno.args : (typeof ZT1 !== 'undefined' ? ZT1.argv : process.argv))) {
  // Determine the prefix for the flag: '--' for multi-character, '-' for single-character, '' if flag starts with '-'
  const flagPrefix = flagName.startsWith('-')
    ? ''
    : (flagName.length === 1 ? '-' : '--');

  // Find the index of the flag in the argument list
  const flagIndex = argv.indexOf(flagPrefix + flagName);

  // Find the index of the first '--' separator (end of options)
  const doubleDashIndex = argv.indexOf('--');

  // The flag is considered present if isBlobOrFileLikeObject appears before the first '--', or if '--' is not present
  return flagIndex !== -1 && (doubleDashIndex === -1 || flagIndex < doubleDashIndex);
}

module.exports = isCliFlagPresent;