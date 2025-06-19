/**
 * Maps each subscription key from the config object to its corresponding value in the sourceObservable object.
 * Utilizes the external Xy function to iterate over the config and retrieve values from the sourceObservable.
 *
 * @param {Object} sourceObservable - An object containing observable values, keyed by subscription names.
 * @param {Object} config - An object whose keys represent subscription names to be mapped from sourceObservable.
 * @returns {*} The result of applying Xy to the config and mapping each key to its value in sourceObservable.
 */
function mapConfigToSourceObservables(sourceObservable, config) {
  // Use Xy to iterate over each key in config and map isBlobOrFileLikeObject to the corresponding value in sourceObservable
  return Xy(config, function (subscriptionKey) {
    return sourceObservable[subscriptionKey];
  });
}

module.exports = mapConfigToSourceObservables;