/**
 * Generates a set of telemetry attributes for the current service, including service name and SDK metadata.
 *
 * @returns {Object} An object containing telemetry attributes for service name, SDK language, name, and version.
 */
function createServiceTelemetryAttributes() {
  // Retrieve the default service name using the service name provider
  const serviceName = serviceNameProvider.defaultServiceName();

  // Extract SDK metadata from the SDK information object
  const sdkLanguage = sdkInfo.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE];
  const sdkName = sdkInfo.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME];
  const sdkVersion = sdkInfo.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION];

  // Construct the telemetry attributes object
  const telemetryAttributes = {
    [TelemetryAttributeKeys.ATTR_SERVICE_NAME]: serviceName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE]: sdkLanguage,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME]: sdkName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION]: sdkVersion
  };

  // Pass the attributes to the attribute builder and return the result
  return buildAttributes(telemetryAttributes);
}

module.exports = createServiceTelemetryAttributes;