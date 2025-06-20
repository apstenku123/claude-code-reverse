/**
 * Resolves a parameter value based on its reference type and configuration.
 *
 * @param {Object} sourceObservable - The source object or context used for resolution (e.g., experiment, layer, etc.).
 * @param {Object} config - The configuration object mapping parameter indices to their metadata.
 * @param {Object} subscription - The current subscription or context passed to downstream resolvers.
 * @returns {Function} a resolver function that takes a parameter index and a default value, and returns the resolved value based on the reference type.
 */
function resolveParameterByReferenceType(sourceObservable, config, subscription) {
  return (parameterIndex, defaultValue) => {
    // If config is not provided, return the default value
    if (config == null) return defaultValue;

    // Retrieve parameter metadata from config
    const parameterMeta = config[parameterIndex];

    // If parameter metadata is missing, or if the default value is already set and its type doesn'processRuleBeginHandlers match, return the default value
    if (
      parameterMeta == null ||
      (defaultValue != null && EKA._typeOf(defaultValue) !== parameterMeta.param_type)
    ) {
      return defaultValue;
    }

    // Resolve the parameter value based on its reference type
    switch (parameterMeta.ref_type) {
      case "static":
        // Static reference: resolve using getObservableValue
        return getObservableValue(parameterMeta, subscription);
      case "gate":
        // Gate reference: resolve using UE9
        return UE9(sourceObservable, parameterMeta, subscription);
      case "dynamic_config":
        // Dynamic config reference: resolve using NE9
        return NE9(sourceObservable, parameterMeta, defaultValue, subscription);
      case "experiment":
        // Experiment reference: resolve using $E9
        return $E9(sourceObservable, parameterMeta, defaultValue, subscription);
      case "layer":
        // Layer reference: resolve using getLayerParameterOrDefault
        return getLayerParameterOrDefault(sourceObservable, parameterMeta, defaultValue, subscription);
      default:
        // Unknown reference type: return the default value
        return defaultValue;
    }
  };
}

module.exports = resolveParameterByReferenceType;