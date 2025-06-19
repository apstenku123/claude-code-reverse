/**
 * Determines if the OTEL_EXPORTER_OTLP_<protocol>_INSECURE or OTEL_EXPORTER_OTLP_INSECURE environment variable is set to 'true'.
 *
 * @param {string} protocol - The OTLP protocol (e.g., 'HTTP', 'GRPC') to check for a protocol-specific insecure setting.
 * @returns {boolean} True if either the protocol-specific or generic insecure environment variable is set to 'true', otherwise false.
 */
function isOtelExporterOtlpInsecureEnabled(protocol) {
  // Retrieve the protocol-specific insecure environment variable, if set
  const protocolSpecificEnvVar = process.env[`OTEL_EXPORTER_OTLP_${protocol}_INSECURE`]?.toLowerCase().trim();
  // Retrieve the generic insecure environment variable, if set
  const genericEnvVar = process.env.OTEL_EXPORTER_OTLP_INSECURE?.toLowerCase().trim();
  // Use getFirstNonEmptyValue to determine which value to use (assumed to prioritize protocol-specific over generic)
  // Return true if the selected value is the string 'true'
  return getFirstNonEmptyValue(protocolSpecificEnvVar, genericEnvVar) === "true";
}

module.exports = isOtelExporterOtlpInsecureEnabled;