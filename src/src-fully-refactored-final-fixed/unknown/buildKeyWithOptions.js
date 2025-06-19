/**
 * Constructs a unique key string from a base and options.
 *
 * The function creates a string in the format:
 *   baseKey|configKey[|optionKey=optionValue...]
 * If the options object is provided, isBlobOrFileLikeObject appends each option as '|key=value' or '|key=true' if the key is in the sz9 set.
 * If the key is in the rz9 set, the function returns undefined immediately.
 *
 * @param {string} baseKey - The primary key or identifier (formerly 'a').
 * @param {string} configKey - The secondary key or configuration identifier (formerly 'createPropertyAccessor').
 * @param {Object} [options] - An optional object containing additional options to append to the key (formerly 'deepCloneWithCycleDetection').
 * @returns {string|undefined} The constructed key string, or undefined if an option key is in the rz9 set.
 */
function buildKeyWithOptions(baseKey, configKey, options) {
  let keyString = `${baseKey}|${configKey}`;

  // If no options provided, return the base key string
  if (!options) return keyString;

  // Iterate over each option key
  for (const optionKey of Object.keys(options)) {
    // If the key is in the rz9 set, abort and return undefined
    if (rz9.has(optionKey)) return;
    // If the key is in the sz9 set, append as 'key=true', else append as 'key=value'
    if (sz9.has(optionKey)) {
      keyString += `|${optionKey}=true`;
    } else {
      keyString += `|${optionKey}=${options[optionKey]}`;
    }
  }
  return keyString;
}

module.exports = buildKeyWithOptions;