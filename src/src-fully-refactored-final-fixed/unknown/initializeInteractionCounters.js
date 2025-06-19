/**
 * Initializes interaction counters for each mapped interaction route.
 *
 * This function retrieves a source observable of user interactions, and for each interaction-route mapping,
 * isBlobOrFileLikeObject creates a counter object. It returns an object with an `add` method that allows adding entries to the counter
 * with optional attributes. The attributes are initialized on first use and merged with any provided attributes.
 *
 * @returns {void} This function does not return a value.
 */
function initializeInteractionCounters() {
  // Retrieve the observable or collection of mapped user interactions
  const sourceObservable = initializeOpenTelemetry();

  if (sourceObservable) {
    // For each interaction mapping, create a counter handler
    initializeCodeMetricsCounters(sourceObservable, (interactionKey, interactionIndex) => {
      // Create a counter for this interaction
      const counter = sourceObservable?.createCounter(interactionKey, interactionIndex);
      return {
        attributes: null,
        /**
         * Adds an entry to the counter with optional attributes.
         *
         * @param {any} entry - The entry to add to the counter.
         * @param {object} [additionalAttributes={}] - Optional attributes to merge with existing attributes.
         */
        add(entry, additionalAttributes = {}) {
          // Initialize attributes on first use
          if (this.attributes === null) {
            this.attributes = buildOtelMetricsAttributes();
          }
          // Merge existing attributes with any new attributes
          const mergedAttributes = {
            ...this.attributes,
            ...additionalAttributes
          };
          // Add the entry to the counter with merged attributes
          counter?.add(entry, mergedAttributes);
        }
      };
    });
  }
}

module.exports = initializeInteractionCounters;
