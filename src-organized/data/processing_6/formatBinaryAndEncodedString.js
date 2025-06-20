/**
 * Formats two processed string values into a single string separated by a dot.
 *
 * The function takes two input values, processes them through a series of transformation functions,
 * and formats the results into a string using the Vs1.format method. The first value is always encoded
 * as 'binary', while the second value can be encoded using a specified encoding (defaults to 'utf8').
 *
 * @param {string} sourceValue - The first value to be processed and encoded as 'binary'.
 * @param {string} targetValue - The second value to be processed and encoded with the specified encoding.
 * @param {string} [encoding='utf8'] - The encoding to use for the second value (defaults to 'utf8').
 * @returns {string} The formatted string in the form '<processedSource>.<processedTarget>'.
 */
function formatBinaryAndEncodedString(sourceValue, targetValue, encoding = 'utf8') {
  // Ensure encoding has a default value if not provided
  encoding = encoding || 'utf8';

  // Process the source value: first transform, then encode as 'binary'
  const processedSource = tF2(oF2(sourceValue), 'binary');

  // Process the target value: first transform, then encode with the specified encoding
  const processedTarget = tF2(oF2(targetValue), encoding);

  // Format the two processed values into a single string separated by a dot
  return Vs1.format("%createInteractionAccessor.%createInteractionAccessor", processedSource, processedTarget);
}

module.exports = formatBinaryAndEncodedString;