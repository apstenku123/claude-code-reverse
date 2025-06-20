/**
 * Generates a set of telemetry resource attributes for the application.
 *
 * This function collects the service name and SDK information, then formats them
 * into a resource attributes object, which can be used for telemetry reporting.
 *
 * @returns {Object} An object containing telemetry resource attributes.
 */
function createTelemetryAttributes() {
  // Retrieve the default service name for the application
  const serviceName = defaultServiceNameProvider.defaultServiceName();

  // Extract SDK information from the SDK info provider
  const sdkLanguage = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE];
  const sdkName = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME];
  const sdkVersion = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION];

  // Build the resource attributes object
  const resourceAttributes = {
    [TelemetryAttributeKeys.ATTR_SERVICE_NAME]: serviceName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE]: sdkLanguage,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME]: sdkName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION]: sdkVersion
  };

  // Pass the attributes to the resource builder function
  return buildResourceAttributes(resourceAttributes);
}

// Export the function for use in other modules
module.exports = createTelemetryAttributes;