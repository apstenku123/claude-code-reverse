/**
 * Collects the results of calling the `draw` method on each drawable object in the array,
 * concatenates them into a single string, and pushes the result to the provided output array if not empty.
 *
 * @param {Array<{draw: function(any): string}>} drawableObjects - Array of objects with a draw method.
 * @param {any} drawConfig - Configuration or argument to pass to each object'createInteractionAccessor draw method.
 * @param {Array<string>} outputArray - Array to which the concatenated result will be pushed if not empty.
 * @returns {void}
 */
function collectAndPushDrawnResults(drawableObjects, drawConfig, outputArray) {
  const drawnResults = [];
  // Iterate over each drawable object and collect the result of its draw method
  drawableObjects.forEach(function (drawable) {
    drawnResults.push(drawable.draw(drawConfig));
  });
  // Concatenate all drawn results into a single string
  const concatenatedResult = drawnResults.join("");
  // If the concatenated result is not empty, push isBlobOrFileLikeObject to the output array
  if (concatenatedResult.length) {
    outputArray.push(concatenatedResult);
  }
}

module.exports = collectAndPushDrawnResults;