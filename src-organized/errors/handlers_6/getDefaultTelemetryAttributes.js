/**
 * Returns a set of default telemetry attributes for the application.
 *
 * This function gathers the default service name and SDK information (language, name, version)
 * and returns them as an object, using the attribute keys defined in the F_ constants.
 *
 * @returns {Object} An object containing default telemetry attributes.
 */
function getDefaultTelemetryAttributes() {
  // Retrieve the default service name from the service name provider
  const defaultServiceName = serviceNameProvider.defaultServiceName();

  // Gather SDK information from the SDK info provider
  const sdkLanguage = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE];
  const sdkName = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME];
  const sdkVersion = sdkInfoProvider.SDK_INFO[TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION];

  // Construct the telemetry attributes object
  const telemetryAttributes = {
    [TelemetryAttributeKeys.ATTR_SERVICE_NAME]: defaultServiceName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_LANGUAGE]: sdkLanguage,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_NAME]: sdkName,
    [TelemetryAttributeKeys.ATTR_TELEMETRY_SDK_VERSION]: sdkVersion
  };

  // Pass the attributes object to the attribute builder function
  return buildTelemetryAttributes(telemetryAttributes);
}

module.exports = getDefaultTelemetryAttributes;