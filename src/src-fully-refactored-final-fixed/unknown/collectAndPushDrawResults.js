/**
 * Collects the results of calling the `draw` method on each drawable object in the array,
 * joins them into a single string, and pushes the result to the provided output array if not empty.
 *
 * @param {Array<{draw: function(any): string}>} drawableObjects - Array of objects with a draw method.
 * @param {any} drawConfig - Configuration or argument to pass to each draw method.
 * @param {Array<string>} outputCollection - Array to which the joined draw results will be pushed if not empty.
 * @returns {void}
 */
function collectAndPushDrawResults(drawableObjects, drawConfig, outputCollection) {
  const drawResults = [];
  // Call draw on each object and collect the results
  drawableObjects.forEach(function (drawable) {
    drawResults.push(drawable.draw(drawConfig));
  });
  // Join all draw results into a single string
  const joinedResults = drawResults.join("");
  // Only push to output if the result is not an empty string
  if (joinedResults.length) {
    outputCollection.push(joinedResults);
  }
}

module.exports = collectAndPushDrawResults;