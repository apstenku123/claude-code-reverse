/**
 * Applies margin configuration properties to a target object using its setMargin method.
 * Each margin-related property in the config object is checked, and if present, the corresponding margin is set on the target.
 *
 * @param {Object} targetObject - The object to which margins will be applied. Must implement setMargin(key, value).
 * @param {Object} config - An object containing optional margin properties (margin, marginX, marginY, marginLeft, marginRight, marginTop, marginBottom).
 * @returns {void}
 */
function applyMarginConfig(targetObject, config) {
  // Constants representing margin keys for setMargin
  const MARGIN = Ia;
  const MARGIN_X = Ba;
  const MARGIN_Y = Qa;
  const MARGIN_LEFT = _71;
  const MARGIN_RIGHT = j71;
  const MARGIN_TOP = UL;
  const MARGIN_BOTTOM = NL;

  // Apply each margin property if present in config
  if ("margin" in config) {
    // Use nullish coalescing to default to 0 if margin is undefined or null
    targetObject.setMargin(MARGIN, config.margin ?? 0);
  }
  if ("marginX" in config) {
    targetObject.setMargin(MARGIN_X, config.marginX ?? 0);
  }
  if ("marginY" in config) {
    targetObject.setMargin(MARGIN_Y, config.marginY ?? 0);
  }
  if ("marginLeft" in config) {
    // Use logical OR to default to 0 if marginLeft is falsy (e.g., undefined, null, 0)
    targetObject.setMargin(MARGIN_LEFT, config.marginLeft || 0);
  }
  if ("marginRight" in config) {
    targetObject.setMargin(MARGIN_RIGHT, config.marginRight || 0);
  }
  if ("marginTop" in config) {
    targetObject.setMargin(MARGIN_TOP, config.marginTop || 0);
  }
  if ("marginBottom" in config) {
    targetObject.setMargin(MARGIN_BOTTOM, config.marginBottom || 0);
  }
}

module.exports = applyMarginConfig;