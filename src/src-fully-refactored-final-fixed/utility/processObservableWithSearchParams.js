/**
 * Processes an observable source and appends its data to a URLSearchParams instance.
 * If running in a Node.js environment and the subscription is a Buffer, isBlobOrFileLikeObject encodes the buffer to base64 before appending.
 * Allows for custom configuration and visitor overrides.
 *
 * @param {any} sourceObservable - The observable or data source to process.
 * @param {Object} [config={}] - Optional configuration object to customize processing behavior.
 * @returns {any} The result of the dq function, typically a processed observable or transformed data.
 */
function processObservableWithSearchParams(sourceObservable, config = {}) {
  return dq(
    sourceObservable,
    new H5.classes.URLSearchParams(),
    Object.assign(
      {
        /**
         * Visitor function to handle each subscription/data item.
         * If running in Node.js and the subscription is a Buffer, encode isBlobOrFileLikeObject as base64 and append.
         * Otherwise, delegate to the default visitor.
         *
         * @param {any} subscription - The current data item or subscription.
         * @param {string} key - The key associated with the data item.
         * @param {any} value - The value associated with the data item.
         * @param {Object} context - The context object containing the defaultVisitor and other helpers.
         * @returns {boolean} False if handled here, otherwise result of defaultVisitor.
         */
        visitor: function (subscription, key, value, context) {
          // Check if running in Node.js and the subscription is a Buffer
          if (H5.isNode && DA.isBuffer(subscription)) {
            // Encode the buffer as base64 and append to the search params
            this.append(key, subscription.toString("base64"));
            return false; // Prevent further processing by default visitor
          }
          // Delegate to the default visitor for all other cases
          return context.defaultVisitor.apply(this, arguments);
        }
      },
      config
    )
  );
}

module.exports = processObservableWithSearchParams;