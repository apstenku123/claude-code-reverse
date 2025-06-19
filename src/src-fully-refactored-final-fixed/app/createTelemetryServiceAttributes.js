/**
 * Generates a set of default telemetry service attributes for use in application monitoring.
 *
 * This function constructs an object containing the service name and SDK metadata,
 * which can be used for telemetry reporting or tracing purposes.
 *
 * @returns {Object} An object containing telemetry service attributes.
 */
function createTelemetryServiceAttributes() {
  // Retrieve the default service name for telemetry
  const serviceName = defaultServiceNameProvider.defaultServiceName();

  // Extract SDK information from the SDK info provider
  const sdkLanguage = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE];
  const sdkName = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME];
  const sdkVersion = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION];

  // Construct the attributes object with the required telemetry fields
  const telemetryAttributes = {
    [TelemetryAttributeKeys.ATTR_SERVICE_NAME]: serviceName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE]: sdkLanguage,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME]: sdkName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION]: sdkVersion
  };

  // Pass the attributes to the telemetry attribute builder function
  return buildTelemetryAttributes(telemetryAttributes);
}

// External dependencies (assumed to be imported elsewhere in the actual codebase)
// const buildTelemetryAttributes = bv1;
// const defaultServiceNameProvider = oo4;
// const sdkInfoProvider = vv1;
// const TelemetryAttributeKeys = F_;

module.exports = createTelemetryServiceAttributes;
