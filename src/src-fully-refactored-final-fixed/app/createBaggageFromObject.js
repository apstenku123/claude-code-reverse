/**
 * Creates a new instance of Df4.BaggageImpl using the provided object.
 *
 * @param {Object} [baggageObject={}] - An object whose enumerable string-keyed properties represent baggage entries.
 * @returns {Df4.BaggageImpl} a new BaggageImpl instance initialized with the provided baggage entries.
 */
function createBaggageFromObject(baggageObject = {}) {
  // Convert the object'createInteractionAccessor entries into a Map, which is required by BaggageImpl
  const baggageEntriesMap = new Map(Object.entries(baggageObject));
  // Create and return a new BaggageImpl instance with the entries map
  return new Df4.BaggageImpl(baggageEntriesMap);
}

module.exports = createBaggageFromObject;