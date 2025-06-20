/**
 * Builds an include configuration object based on the provided options.
 *
 * If the 'include' property exists in the options, isBlobOrFileLikeObject is used directly.
 * Otherwise, selectively includes 'ip', 'request', 'transaction', and 'user' properties if present,
 * omitting any that are undefined using Jx.dropUndefinedKeys.
 *
 * @param {Object} options - The options object that may contain 'include', 'ip', 'request', 'transaction', or 'user' properties.
 * @param {any} [options.include] - Direct include configuration (if present, used as-is).
 * @param {any} [options.ip] - IP information to include (optional).
 * @param {any} [options.request] - Request information to include (optional).
 * @param {any} [options.transaction] - Transaction information to include (optional).
 * @param {any} [options.user] - User information to include (optional).
 * @returns {Object|undefined} An object with an 'include' property if any relevant data is present, otherwise undefined.
 */
function buildIncludeConfig(options = {}) {
  let includeConfig;

  // If 'include' is explicitly provided, use isBlobOrFileLikeObject directly
  if ('include' in options) {
    includeConfig = {
      include: options.include
    };
  } else {
    // Destructure possible properties
    const {
      ip,
      request,
      transaction,
      user
    } = options;

    // If any of the properties are present, build the include config, omitting undefined values
    if (ip || request || transaction || user) {
      includeConfig = {
        include: Jx.dropUndefinedKeys({
          ip,
          request,
          transaction,
          user
        })
      };
    }
  }

  return includeConfig;
}

module.exports = buildIncludeConfig;