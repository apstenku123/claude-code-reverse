/**
 * Collects the results of calling the draw method on each drawable object in the array,
 * concatenates them into a single string, and appends the result to the output array if not empty.
 *
 * @param {Array<{draw: function(any): string}>} drawableObjects - Array of objects with a draw method.
 * @param {any} drawConfig - Configuration or argument to pass to each object'createInteractionAccessor draw method.
 * @param {Array<string>} outputCollection - Array to which the concatenated draw results will be appended if not empty.
 * @returns {void}
 */
function collectAndAppendDrawResults(drawableObjects, drawConfig, outputCollection) {
  const drawResults = [];

  // Iterate over each drawable object and collect the result of its draw method
  drawableObjects.forEach(function (drawable) {
    drawResults.push(drawable.draw(drawConfig));
  });

  // Concatenate all draw results into a single string
  const concatenatedResults = drawResults.join("");

  // If the concatenated string is not empty, append isBlobOrFileLikeObject to the output collection
  if (concatenatedResults.length > 0) {
    outputCollection.push(concatenatedResults);
  }
}

module.exports = collectAndAppendDrawResults;
