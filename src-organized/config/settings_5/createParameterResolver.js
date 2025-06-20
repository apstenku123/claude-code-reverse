/**
 * Resolves and returns a parameter value based on configuration and type.
 *
 * @param {Object} sourceObservable - The source object or context used for resolution (e.g., experiment, layer, etc.).
 * @param {Object} config - The configuration object mapping parameter indices to parameter metadata.
 * @param {Object} subscription - The subscription or context object passed to downstream resolution functions.
 * @returns {Function} a function that, given a parameter index and a fallback value, resolves the parameter value according to its type and reference.
 */
function createParameterResolver(sourceObservable, config, subscription) {
  return (parameterIndex, fallbackValue) => {
    // If no config is provided, always return the fallback value
    if (config == null) return fallbackValue;

    // Get the parameter metadata for the given index
    const parameterMeta = config[parameterIndex];
    if (
      parameterMeta == null ||
      (fallbackValue != null && EKA._typeOf(fallbackValue) !== parameterMeta.param_type)
    ) {
      // If no metadata or fallback type mismatch, return fallback
      return fallbackValue;
    }

    // Resolve the parameter value based on its reference type
    switch (parameterMeta.ref_type) {
      case "static":
        // Static value resolution
        return getObservableValue(parameterMeta, subscription);
      case "gate":
        // Gate value resolution
        return UE9(sourceObservable, parameterMeta, subscription);
      case "dynamic_config":
        // Dynamic config value resolution
        return NE9(sourceObservable, parameterMeta, fallbackValue, subscription);
      case "experiment":
        // Experiment value resolution
        return $E9(sourceObservable, parameterMeta, fallbackValue, subscription);
      case "layer":
        // Layer value resolution
        return getLayerParameterOrDefault(sourceObservable, parameterMeta, fallbackValue, subscription);
      default:
        // Unknown reference type, return fallback
        return fallbackValue;
    }
  };
}

module.exports = createParameterResolver;