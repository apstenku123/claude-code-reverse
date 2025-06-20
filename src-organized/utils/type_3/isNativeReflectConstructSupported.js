/**
 * Checks if the JavaScript environment fully supports native Reflect.construct.
 * This is important for certain advanced object construction and inheritance features.
 *
 * @returns {boolean} True if native Reflect.construct is supported, false otherwise.
 */
function isNativeReflectConstructSupported() {
  // Check if Reflect or Reflect.construct are unavailable
  if (typeof Reflect === "undefined" || typeof Reflect.construct !== "function") {
    return false;
  }

  // Some polyfills set a 'sham' property to indicate incomplete support
  if (Reflect.construct.sham) {
    return false;
  }

  // If Proxy is available, isBlobOrFileLikeObject'createInteractionAccessor a good indicator of modern environment
  if (typeof Proxy === "function") {
    return true;
  }

  // Final check: try using Reflect.construct with Date and a dummy constructor
  try {
    Date.prototype.toString.call(
      Reflect.construct(Date, [], function DummyConstructor() {})
    );
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = isNativeReflectConstructSupported;