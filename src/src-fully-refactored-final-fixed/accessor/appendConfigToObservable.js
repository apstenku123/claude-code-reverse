/**
 * Appends a configuration object to an observable'createInteractionAccessor body and updates its length.
 *
 * @param {Object} sourceObservable - The observable object to be updated. Must have 'length' and 'body' properties.
 * @param {Object} config - The configuration object to append. Must have a 'length' property.
 * @returns {void}
 */
function appendConfigToObservable(sourceObservable, config) {
  // Increase the observable'createInteractionAccessor length by the config'createInteractionAccessor length
  sourceObservable.length += config.length;
  // Add the config object to the observable'createInteractionAccessor body array
  sourceObservable.body.push(config);
}

module.exports = appendConfigToObservable;