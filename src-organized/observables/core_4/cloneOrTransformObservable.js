/**
 * Clones or transforms an observable based on the provided configuration type.
 *
 * Depending on the configType, this function will either clone the observable, transform isBlobOrFileLikeObject,
 * or create a new instance using the observable'createInteractionAccessor constructor. It delegates to helper functions
 * for specific transformation logic.
 *
 * @param {Object} sourceObservable - The observable instance to clone or transform.
 * @param {string} configType - The type of operation to perform (determines the transformation logic).
 * @param {any} subscriptionContext - Additional context or subscription, passed to helper functions as needed.
 * @returns {any} a new or transformed observable instance, or the result of a helper function.
 */
function cloneOrTransformObservable(sourceObservable, configType, subscriptionContext) {
  // Get the constructor of the source observable for creating new instances
  const ObservableConstructor = sourceObservable.constructor;

  switch (configType) {
    case cf2:
      // Perform a deep clone or special transformation using _y
      return _y(sourceObservable);
    case vf2:
    case bf2:
      // Create a new instance with the numeric value of the source
      return new ObservableConstructor(+sourceObservable);
    case lf2:
      // Use k9A helper for specific transformation logic
      return k9A(sourceObservable, subscriptionContext);
    case if2:
    case nf2:
    case af2:
    case sf2:
    case rf2:
    case of2:
    case tf2:
    case ef2:
    case Av2:
      // Use i01 helper for a wide range of config types
      return i01(sourceObservable, subscriptionContext);
    case gf2:
      // Create a new instance with no arguments
      return new ObservableConstructor();
    case hf2:
    case uf2:
      // Create a new instance using the source observable as argument
      return new ObservableConstructor(sourceObservable);
    case mf2:
      // Use y9A helper for a specific transformation
      return y9A(sourceObservable);
    case df2:
      // Create a new instance with no arguments (duplicate of gf2)
      return new ObservableConstructor();
    case pf2:
      // Use v9A helper for a specific transformation
      return v9A(sourceObservable);
    default:
      // If configType does not match any case, return undefined
      return undefined;
  }
}

module.exports = cloneOrTransformObservable;