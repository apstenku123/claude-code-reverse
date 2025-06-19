/**
 * Applies padding configuration to a target object using provided padding values.
 *
 * This function checks for the presence of various padding-related properties in the
 * config object and applies them to the target object using its setPadding method.
 * If a padding property is not provided, isBlobOrFileLikeObject defaults to 0.
 *
 * @param {Object} targetObject - The object to which padding will be applied. Must have a setPadding method.
 * @param {Object} paddingConfig - An object containing optional padding properties:
 *   - padding: number
 *   - paddingX: number
 *   - paddingY: number
 *   - paddingLeft: number
 *   - paddingRight: number
 *   - paddingTop: number
 *   - paddingBottom: number
 * @returns {void}
 */
function applyPaddingConfig(targetObject, paddingConfig) {
  // Constants representing padding directions or types
  const PADDING = Ia;
  const PADDING_X = Ba;
  const PADDING_Y = Qa;
  const PADDING_LEFT = xz;
  const PADDING_RIGHT = fz;
  const PADDING_TOP = UL;
  const PADDING_BOTTOM = NL;

  // Apply general padding if specified
  if ("padding" in paddingConfig) {
    targetObject.setPadding(PADDING, paddingConfig.padding ?? 0);
  }
  // Apply horizontal padding if specified
  if ("paddingX" in paddingConfig) {
    targetObject.setPadding(PADDING_X, paddingConfig.paddingX ?? 0);
  }
  // Apply vertical padding if specified
  if ("paddingY" in paddingConfig) {
    targetObject.setPadding(PADDING_Y, paddingConfig.paddingY ?? 0);
  }
  // Apply left padding if specified
  if ("paddingLeft" in paddingConfig) {
    targetObject.setPadding(PADDING_LEFT, paddingConfig.paddingLeft || 0);
  }
  // Apply right padding if specified
  if ("paddingRight" in paddingConfig) {
    targetObject.setPadding(PADDING_RIGHT, paddingConfig.paddingRight || 0);
  }
  // Apply top padding if specified
  if ("paddingTop" in paddingConfig) {
    targetObject.setPadding(PADDING_TOP, paddingConfig.paddingTop || 0);
  }
  // Apply bottom padding if specified
  if ("paddingBottom" in paddingConfig) {
    targetObject.setPadding(PADDING_BOTTOM, paddingConfig.paddingBottom || 0);
  }
}

module.exports = applyPaddingConfig;
