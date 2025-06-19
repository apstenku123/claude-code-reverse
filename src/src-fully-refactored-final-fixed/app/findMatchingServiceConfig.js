/**
 * Finds and returns the first matching service configuration from a list, based on percentage, client hostname, and client language.
 *
 * @param {Array<Object>} serviceConfigList - An array of service configuration objects to search through.
 * @param {number} currentPercentage - The current percentage value to compare against each config'createInteractionAccessor 'percentage' property.
 * @returns {any} The matching service configuration'createInteractionAccessor 'serviceConfig' property.
 * @throws {Error} If the input list is not an array or if no matching configuration is found.
 */
function findMatchingServiceConfig(serviceConfigList, currentPercentage) {
  if (!Array.isArray(serviceConfigList)) {
    throw new Error("Invalid service config list");
  }

  for (const configEntry of serviceConfigList) {
    // Transform the entry using validateAndNormalizeServiceConfigChoice(assumed to normalize or enrich the config)
    const normalizedConfig = validateAndNormalizeServiceConfigChoice(configEntry);

    // If a percentage is specified and the current percentage is greater, skip this config
    if (typeof normalizedConfig.percentage === "number" && currentPercentage > normalizedConfig.percentage) {
      continue;
    }

    // If clientHostname is specified, ensure the current hostname matches one of the allowed hostnames
    if (Array.isArray(normalizedConfig.clientHostname)) {
      let hostnameMatch = false;
      for (const allowedHostname of normalizedConfig.clientHostname) {
        if (allowedHostname === V46.hostname()) {
          hostnameMatch = true;
          break;
        }
      }
      if (!hostnameMatch) {
        continue;
      }
    }

    // If clientLanguage is specified, ensure the current language matches one of the allowed languages
    if (Array.isArray(normalizedConfig.clientLanguage)) {
      let languageMatch = false;
      for (const allowedLanguage of normalizedConfig.clientLanguage) {
        if (allowedLanguage === K46) {
          languageMatch = true;
          break;
        }
      }
      if (!languageMatch) {
        continue;
      }
    }

    // All checks passed; return the serviceConfig
    return normalizedConfig.serviceConfig;
  }

  throw new Error("No matching service config found");
}

module.exports = findMatchingServiceConfig;