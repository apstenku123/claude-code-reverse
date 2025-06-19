/**
 * Constructs an 'include' options object for a transaction, based on the provided configuration.
 *
 * @param {Object} options - The options object containing transaction naming and include settings.
 * @param {string} options.transactionNamingScheme - The transaction naming scheme to use.
 * @param {Object} options.include - The include options specifying which fields to include.
 * @param {boolean|Object|undefined} options.include.user - User inclusion settings; can be boolean, object, or undefined.
 * @param {boolean|undefined} options.include.ip - Whether to include the IP address.
 * @param {Object} [options.include.*] - Any additional fields to include (e.g., request fields).
 * @returns {Object} An object containing the constructed 'include' options for the transaction.
 */
function buildIncludeOptions(options) {
  const {
    transactionNamingScheme,
    include: {
      ip: includeIp,
      user: includeUser,
      ...otherIncludeFields
    }
  } = options;

  // Collect additional include fields that are truthy
  const additionalRequestFields = [];
  for (const [fieldName, fieldValue] of Object.entries(otherIncludeFields)) {
    if (fieldValue) {
      additionalRequestFields.push(fieldName);
    }
  }

  // Determine the user inclusion value
  let userIncludeValue;
  if (includeUser === undefined) {
    // If user is undefined, default to true
    userIncludeValue = true;
  } else if (typeof includeUser === "boolean") {
    userIncludeValue = includeUser;
  } else {
    // If user is an object, collect the keys with truthy values
    const includedUserFields = [];
    for (const [userField, isIncluded] of Object.entries(includeUser)) {
      if (isIncluded) {
        includedUserFields.push(userField);
      }
    }
    userIncludeValue = includedUserFields;
  }

  return {
    include: {
      ip: includeIp,
      user: userIncludeValue,
      request: additionalRequestFields.length !== 0 ? additionalRequestFields : undefined,
      transaction: transactionNamingScheme
    }
  };
}

module.exports = buildIncludeOptions;