/**
 * Applies a series of accessor functions to the provided source observable and configuration object.
 *
 * This function sequentially invokes multiple accessor functions, each of which may modify or augment
 * the source observable based on the provided configuration. This is typically used to set up or update
 * various properties or behaviors on the observable.
 *
 * @param {Object} sourceObservable - The target object (typically an observable) to which accessors are applied.
 * @param {Object} [config={}] - An optional configuration object containing properties for the accessors.
 * @returns {void}
 */
const applyAllAccessors = (sourceObservable, config = {}) => {
  // Apply base accessor modifications
  o_4(sourceObservable, config);
  // Apply margin-related configuration
  applyMarginConfig(sourceObservable, config);
  // Apply additional accessor logic
  e_4(sourceObservable, config);
  // Apply custom accessor Aj4
  Aj4(sourceObservable, config);
  // Apply custom accessor Bj4
  Bj4(sourceObservable, config);
  // Apply custom accessor Qj4
  Qj4(sourceObservable, config);
  // Apply custom accessor Ij4
  Ij4(sourceObservable, config);
  // Apply custom accessor Gj4
  Gj4(sourceObservable, config);
};

module.exports = applyAllAccessors;