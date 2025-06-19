/**
 * Creates a standardized result object for an interaction event.
 *
 * @param {boolean} isSuccess - Indicates if the interaction was successful.
 * @param {object} sourceConfig - The configuration or source object related to the interaction.
 * @param {number} interactionDuration - The duration of the interaction in milliseconds.
 * @param {Error|null} errorObject - The error object if the interaction failed, otherwise null.
 * @param {string} sourceUrl - The URL from which the interaction originated.
 * @param {Array<string>} warningMessages - An array of warning messages related to the interaction.
 * @returns {object} An object summarizing the interaction result.
 */
const createInteractionResultObject = (
  isSuccess,
  sourceConfig,
  interactionDuration,
  errorObject,
  sourceUrl,
  warningMessages
) => {
  return {
    duration: interactionDuration, // Duration of the interaction
    source: sourceConfig,         // Source configuration or object
    success: isSuccess,           // Whether the interaction was successful
    error: errorObject,           // Error object if any
    sourceUrl: sourceUrl,         // URL of the interaction source
    warnings: warningMessages     // Any warnings encountered
  };
};

module.exports = createInteractionResultObject;
