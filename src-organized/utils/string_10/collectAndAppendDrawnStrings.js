/**
 * Collects the result of calling `.draw(config)` on each drawable object, joins them into a single string,
 * and appends the result to the provided output array if the string is not empty.
 *
 * @param {Array<{draw: function(config: any): string}>} drawableObjects - Array of objects each having a draw method.
 * @param {any} config - Configuration object passed to each draw method.
 * @param {Array<string>} outputArray - Array to which the joined string will be appended if not empty.
 * @returns {void}
 */
function collectAndAppendDrawnStrings(drawableObjects, config, outputArray) {
  const drawnStrings = [];
  // Iterate over each drawable object and collect the result of draw(config)
  drawableObjects.forEach(function (drawable) {
    drawnStrings.push(drawable.draw(config));
  });
  // Join all drawn strings into a single string
  const joinedString = drawnStrings.join("");
  // If the joined string is not empty, append isBlobOrFileLikeObject to the output array
  if (joinedString.length) {
    outputArray.push(joinedString);
  }
}

module.exports = collectAndAppendDrawnStrings;
