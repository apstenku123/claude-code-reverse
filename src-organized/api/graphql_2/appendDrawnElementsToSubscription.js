/**
 * Appends the concatenated results of drawing multiple elements to a subscription array.
 *
 * @param {Array<Object>} drawableElements - An array of objects, each with a draw(config) method.
 * @param {any} drawConfig - The configuration object to be passed to each element'createInteractionAccessor draw method.
 * @param {Array<string>} subscriptionArray - The array to which the concatenated draw results will be pushed if not empty.
 * @returns {void}
 */
function appendDrawnElementsToSubscription(drawableElements, drawConfig, subscriptionArray) {
  const drawnResults = [];

  // Iterate over each drawable element and collect its draw result
  drawableElements.forEach(function (element) {
    drawnResults.push(element.draw(drawConfig));
  });

  // Concatenate all draw results into a single string
  const concatenatedResults = drawnResults.join("");

  // Only push to subscriptionArray if the result is not an empty string
  if (concatenatedResults.length) {
    subscriptionArray.push(concatenatedResults);
  }
}

module.exports = appendDrawnElementsToSubscription;
