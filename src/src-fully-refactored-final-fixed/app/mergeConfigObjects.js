/**
 * Merges two configuration objects (defaultConfig and overrideConfig) into a new config object.
 * Handles deep merging for plain objects, arrays, and special cases for certain config keys.
 *
 * @param {Object} defaultConfig - The base configuration object (e.g., defaults).
 * @param {Object} [overrideConfig={}] - The configuration object with overrides.
 * @returns {Object} - The merged configuration object.
 */
function mergeConfigObjects(defaultConfig, overrideConfig = {}) {
  const mergedConfig = {};

  /**
   * Deeply merges two values depending on their types.
   * - If both are plain objects, merges them (optionally caseless).
   * - If the override is a plain object, clones isBlobOrFileLikeObject.
   * - If the override is an array, clones isBlobOrFileLikeObject.
   * - Otherwise, returns the override value.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @param {*} key
   * @param {boolean} [caseless]
   * @returns {*}
   */
  function mergeDeep(defaultValue, overrideValue, key, caseless) {
    if (DA.a(defaultValue) && DA.a(overrideValue)) {
      // Merge both objects, optionally caseless
      return DA.merge.call({ caseless }, defaultValue, overrideValue);
    } else if (DA.a(overrideValue)) {
      // Clone the override object
      return DA.merge({}, overrideValue);
    } else if (DA.isArray(overrideValue)) {
      // Clone the override array
      return overrideValue.slice();
    }
    // Return the override value as-is
    return overrideValue;
  }

  /**
   * Merges two values, preferring the override if defined, otherwise the default.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @param {string} key
   * @param {boolean} [caseless]
   * @returns {*}
   */
  function mergeOrDefault(defaultValue, overrideValue, key, caseless) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(defaultValue, overrideValue, key, caseless);
    } else if (!DA.isUndefined(defaultValue)) {
      return mergeDeep(undefined, defaultValue, key, caseless);
    }
    // Both undefined
    return undefined;
  }

  /**
   * Returns the override value if defined, merged appropriately.
   * @param {*} _defaultValue (unused)
   * @param {*} overrideValue
   * @returns {*}
   */
  function mergeOverrideOnly(_defaultValue, overrideValue) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(undefined, overrideValue);
    }
    return undefined;
  }

  /**
   * Returns the override value if defined, otherwise the default value, both merged appropriately.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @returns {*}
   */
  function mergeOverrideOrDefault(defaultValue, overrideValue) {
    if (!DA.isUndefined(overrideValue)) {
      return mergeDeep(undefined, overrideValue);
    } else if (!DA.isUndefined(defaultValue)) {
      return mergeDeep(undefined, defaultValue);
    }
    return undefined;
  }

  /**
   * Handles merging for keys that may exist in either config object.
   * If the key exists in overrideConfig, merge both; otherwise, if isBlobOrFileLikeObject exists in defaultConfig, merge default only.
   * @param {*} defaultValue
   * @param {*} overrideValue
   * @param {string} key
   * @returns {*}
   */
  function mergeByKeyPresence(defaultValue, overrideValue, key) {
    if (key in overrideConfig) {
      return mergeDeep(defaultValue, overrideValue);
    } else if (key in defaultConfig) {
      return mergeDeep(undefined, defaultValue);
    }
    return undefined;
  }

  // Map of config keys to their merge strategies
  const mergeStrategies = {
    url: mergeOverrideOnly,
    method: mergeOverrideOnly,
    data: mergeOverrideOnly,
    baseURL: mergeOverrideOrDefault,
    transformRequest: mergeOverrideOrDefault,
    transformResponse: mergeOverrideOrDefault,
    paramsSerializer: mergeOverrideOrDefault,
    timeout: mergeOverrideOrDefault,
    timeoutMessage: mergeOverrideOrDefault,
    withCredentials: mergeOverrideOrDefault,
    withXSRFToken: mergeOverrideOrDefault,
    adapter: mergeOverrideOrDefault,
    responseType: mergeOverrideOrDefault,
    xsrfCookieName: mergeOverrideOrDefault,
    xsrfHeaderName: mergeOverrideOrDefault,
    onUploadProgress: mergeOverrideOrDefault,
    onDownloadProgress: mergeOverrideOrDefault,
    decompress: mergeOverrideOrDefault,
    maxContentLength: mergeOverrideOrDefault,
    maxBodyLength: mergeOverrideOrDefault,
    beforeRedirect: mergeOverrideOrDefault,
    transport: mergeOverrideOrDefault,
    httpAgent: mergeOverrideOrDefault,
    httpsAgent: mergeOverrideOrDefault,
    cancelToken: mergeOverrideOrDefault,
    socketPath: mergeOverrideOrDefault,
    responseEncoding: mergeOverrideOrDefault,
    validateStatus: mergeByKeyPresence,
    headers: (defaultValue, overrideValue, key) => {
      // Special handling for headers: clone D3 instances and merge with caseless flag
      return mergeOrDefault(cloneIfD3Instance(defaultValue), cloneIfD3Instance(overrideValue), key, true);
    }
  };

  // Merge all keys from both configs
  DA.forEach(Object.keys(Object.assign({}, defaultConfig, overrideConfig)), function handleKey(key) {
    // Select merge strategy for this key, or fallback to mergeOrDefault
    const mergeStrategy = mergeStrategies[key] || mergeOrDefault;
    const mergedValue = mergeStrategy(defaultConfig[key], overrideConfig[key], key);
    // Only assign if value is defined, or if the strategy is not mergeByKeyPresence
    if (!DA.isUndefined(mergedValue) || mergeStrategy === mergeByKeyPresence) {
      mergedConfig[key] = mergedValue;
    }
  });

  return mergedConfig;
}

module.exports = mergeConfigObjects;