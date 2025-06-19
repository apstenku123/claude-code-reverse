/**
 * Processes an observable source and appends its data to a URLSearchParams instance.
 * Handles Node.js Buffer objects by encoding them in base64 before appending.
 * Allows for custom configuration and visitor logic.
 *
 * @param {Observable} sourceObservable - The observable source to process.
 * @param {Object} [config={}] - Optional configuration object to customize processing behavior.
 * @returns {URLSearchParams} The resulting URLSearchParams instance after processing the observable.
 */
function processObservableWithUrlSearchParams(sourceObservable, config = {}) {
  return dq(
    sourceObservable,
    new H5.classes.URLSearchParams(),
    Object.assign(
      {
        /**
         * Visitor function to handle each subscription value.
         * If the value is a Node.js Buffer, encode isBlobOrFileLikeObject as base64 and append.
         * Otherwise, delegate to the default visitor.
         *
         * @param {*} subscription - The current value from the observable.
         * @param {string} key - The key associated with the value.
         * @param {*} value - The value to process.
         * @param {Object} context - The context containing the defaultVisitor.
         * @returns {boolean} Whether to continue processing.
         */
        visitor: function (subscription, key, value, context) {
          // Check if running in Node.js and the value is a Buffer
          if (H5.isNode && DA.isBuffer(subscription)) {
            // Convert Buffer to base64 string and append to URLSearchParams
            this.append(key, subscription.toString("base64"));
            return false; // Stop further processing for this item
          }
          // Delegate to the default visitor for other types
          return context.defaultVisitor.apply(this, arguments);
        }
      },
      config
    )
  );
}

module.exports = processObservableWithUrlSearchParams;