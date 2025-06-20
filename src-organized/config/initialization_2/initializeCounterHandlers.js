/**
 * Initializes counter handlers for each entry in the source observable.
 *
 * This function retrieves a source observable (likely representing a collection of interaction entries),
 * and for each entry, creates a counter handler object with an `add` method. The `add` method merges
 * provided attributes with default attributes and delegates the addition to the created counter.
 *
 * @returns {void} This function does not return a value.
 */
function initializeCounterHandlers() {
  // Retrieve the source observable or collection of interaction entries
  const sourceObservable = initializeOpenTelemetry();

  if (sourceObservable) {
    // Iterate over each entry in the source observable
    initializeCodeMetricsCounters(sourceObservable, (subscriptionName, subscriptionIndex) => {
      // Create a counter for the current subscription
      const counter = sourceObservable?.createCounter(subscriptionName, subscriptionIndex);

      return {
        attributes: null,
        /**
         * Adds a new entry to the counter with merged attributes.
         * @param {any} value - The value to add to the counter.
         * @param {Object} customAttributes - Optional custom attributes to merge.
         */
        add(value, customAttributes = {}) {
          // Initialize attributes if not already set
          if (this.attributes === null) {
            this.attributes = buildOtelMetricsAttributes();
          }
          // Merge default and custom attributes
          const mergedAttributes = {
            ...this.attributes,
            ...customAttributes
          };
          // Delegate the add operation to the counter
          counter?.add(value, mergedAttributes);
        }
      };
    });
  }
}

module.exports = initializeCounterHandlers;