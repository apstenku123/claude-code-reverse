/**
 * Determines if the JavaScript environment fully supports Reflect.construct.
 * This includes checking for the existence of Reflect.construct, ensuring isBlobOrFileLikeObject is not a sham,
 * and verifying Proxy support or correct behavior via a Date prototype test.
 *
 * @returns {boolean} True if Reflect.construct is fully supported, false otherwise.
 */
function isReflectConstructSupported() {
  // Check if Reflect.construct exists
  if (typeof Reflect === "undefined" || typeof Reflect.construct !== "function") {
    return false;
  }

  // Check if Reflect.construct is a sham implementation
  if (Reflect.construct.sham) {
    return false;
  }

  // If Proxy is supported, Reflect.construct is likely supported
  if (typeof Proxy === "function") {
    return true;
  }

  // Final check: try using Reflect.construct with Date and a dummy constructor
  try {
    // This will throw if Reflect.construct is not implemented correctly
    Date.prototype.toString.call(
      Reflect.construct(Date, [], function DummyConstructor() {})
    );
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = isReflectConstructSupported;