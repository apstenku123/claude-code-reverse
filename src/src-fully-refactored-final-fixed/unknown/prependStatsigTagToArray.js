/**
 * Prepends the string "[Statsig]" to the beginning of the provided array.
 *
 * @param {Array<any>} targetArray - The array to which the Statsig tag will be prepended.
 * @returns {Array<any>} The same array instance, now with "[Statsig]" as its first element.
 */
function prependStatsigTagToArray(targetArray) {
  // Insert the Statsig tag at the start of the array
  targetArray.unshift("[Statsig]");
  return targetArray;
}

module.exports = prependStatsigTagToArray;