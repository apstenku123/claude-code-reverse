/**
 * Validates and normalizes a service config choice object.
 * Ensures required fields are present and valid, and returns a normalized copy.
 *
 * @param {Object} serviceConfigChoice - The object representing a service config choice to validate and normalize.
 * @param {Object} serviceConfigChoice.serviceConfig - The service configuration object (required).
 * @param {string[]} [serviceConfigChoice.clientLanguage] - Optional array of client language strings.
 * @param {string[]} [serviceConfigChoice.clientHostname] - Optional array of client hostname strings.
 * @param {number} [serviceConfigChoice.percentage] - Optional percentage (0-100).
 * @returns {Object} Normalized and validated service config choice object.
 * @throws {Error} If validation fails for any field or unexpected fields are present.
 */
function validateAndNormalizeServiceConfigChoice(serviceConfigChoice) {
  // Ensure the required 'serviceConfig' field exists
  if (!('serviceConfig' in serviceConfigChoice)) {
    throw new Error('Invalid service config choice: missing service config');
  }

  // Normalize the output object
  const normalizedConfig = {
    serviceConfig: parseServiceConfig(serviceConfigChoice.serviceConfig)
  };

  // Validate and copy 'clientLanguage' if present
  if ('clientLanguage' in serviceConfigChoice) {
    if (Array.isArray(serviceConfigChoice.clientLanguage)) {
      normalizedConfig.clientLanguage = [];
      for (const language of serviceConfigChoice.clientLanguage) {
        if (typeof language === 'string') {
          normalizedConfig.clientLanguage.push(language);
        } else {
          throw new Error('Invalid service config choice: invalid clientLanguage');
        }
      }
    } else {
      throw new Error('Invalid service config choice: invalid clientLanguage');
    }
  }

  // Validate and copy 'clientHostname' if present
  if ('clientHostname' in serviceConfigChoice) {
    if (Array.isArray(serviceConfigChoice.clientHostname)) {
      normalizedConfig.clientHostname = [];
      for (const hostname of serviceConfigChoice.clientHostname) {
        if (typeof hostname === 'string') {
          normalizedConfig.clientHostname.push(hostname);
        } else {
          throw new Error('Invalid service config choice: invalid clientHostname');
        }
      }
    } else {
      throw new Error('Invalid service config choice: invalid clientHostname');
    }
  }

  // Validate and copy 'percentage' if present
  if ('percentage' in serviceConfigChoice) {
    const percentage = serviceConfigChoice.percentage;
    if (typeof percentage === 'number' && percentage >= 0 && percentage <= 100) {
      normalizedConfig.percentage = percentage;
    } else {
      throw new Error('Invalid service config choice: invalid percentage');
    }
  }

  // List of allowed fields
  const allowedFields = [
    'clientLanguage',
    'percentage',
    'clientHostname',
    'serviceConfig'
  ];

  // Check for unexpected fields
  for (const fieldName in serviceConfigChoice) {
    if (!allowedFields.includes(fieldName)) {
      throw new Error(`Invalid service config choice: unexpected field ${fieldName}`);
    }
  }

  return normalizedConfig;
}

module.exports = validateAndNormalizeServiceConfigChoice;