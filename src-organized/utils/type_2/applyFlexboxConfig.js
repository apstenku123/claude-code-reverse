/**
 * Applies flexbox-related configuration properties to a target layout object.
 *
 * @param {Object} layoutTarget - The object representing the layout target, expected to have setter methods for flexbox properties.
 * @param {Object} flexboxConfig - The configuration object containing flexbox properties to apply.
 *
 * This function checks for the presence of various flexbox properties in the configuration object
 * and applies them to the layout target using the appropriate setter methods. It handles default values
 * and type conversions as needed.
 */
function applyFlexboxConfig(layoutTarget, flexboxConfig) {
  // Apply flexGrow if present, defaulting to 0 if undefined
  if ("flexGrow" in flexboxConfig) {
    layoutTarget.setFlexGrow(flexboxConfig.flexGrow ?? 0);
  }

  // Apply flexShrink if present, defaulting to 1 if not a number
  if ("flexShrink" in flexboxConfig) {
    const flexShrinkValue = typeof flexboxConfig.flexShrink === "number" ? flexboxConfig.flexShrink : 1;
    layoutTarget.setFlexShrink(flexShrinkValue);
  }

  // Apply flexWrap if present
  if ("flexWrap" in flexboxConfig) {
    switch (flexboxConfig.flexWrap) {
      case "nowrap":
        layoutTarget.setFlexWrap(NO_WRAP_CONSTANT);
        break;
      case "wrap":
        layoutTarget.setFlexWrap(WRAP_CONSTANT);
        break;
      case "wrap-reverse":
        layoutTarget.setFlexWrap(WRAP_REVERSE_CONSTANT);
        break;
      // No default; do nothing if value is unrecognized
    }
  }

  // Apply flexDirection if present
  if ("flexDirection" in flexboxConfig) {
    switch (flexboxConfig.flexDirection) {
      case "row":
        layoutTarget.setFlexDirection(ROW_CONSTANT);
        break;
      case "row-reverse":
        layoutTarget.setFlexDirection(ROW_REVERSE_CONSTANT);
        break;
      case "column":
        layoutTarget.setFlexDirection(COLUMN_CONSTANT);
        break;
      case "column-reverse":
        layoutTarget.setFlexDirection(COLUMN_REVERSE_CONSTANT);
        break;
      // No default; do nothing if value is unrecognized
    }
  }

  // Apply flexBasis if present
  if ("flexBasis" in flexboxConfig) {
    if (typeof flexboxConfig.flexBasis === "number") {
      layoutTarget.setFlexBasis(flexboxConfig.flexBasis);
    } else if (typeof flexboxConfig.flexBasis === "string") {
      // Parse string as integer percentage
      layoutTarget.setFlexBasisPercent(Number.parseInt(flexboxConfig.flexBasis, 10));
    } else {
      // If flexBasis is neither number nor string, set as NaN
      layoutTarget.setFlexBasis(Number.NaN);
    }
  }

  // Apply alignItems if present
  if ("alignItems" in flexboxConfig) {
    switch (flexboxConfig.alignItems) {
      case "stretch":
      case undefined:
      case null:
        layoutTarget.setAlignItems(ALIGN_ITEMS_STRETCH_CONSTANT);
        break;
      case "flex-start":
        layoutTarget.setAlignItems(ALIGN_ITEMS_FLEX_START_CONSTANT);
        break;
      case "center":
        layoutTarget.setAlignItems(ALIGN_ITEMS_CENTER_CONSTANT);
        break;
      case "flex-end":
        layoutTarget.setAlignItems(ALIGN_ITEMS_FLEX_END_CONSTANT);
        break;
      // No default; do nothing if value is unrecognized
    }
  }

  // Apply alignSelf if present
  if ("alignSelf" in flexboxConfig) {
    switch (flexboxConfig.alignSelf) {
      case "auto":
      case undefined:
      case null:
        layoutTarget.setAlignSelf(ALIGN_SELF_AUTO_CONSTANT);
        break;
      case "flex-start":
        layoutTarget.setAlignSelf(ALIGN_SELF_FLEX_START_CONSTANT);
        break;
      case "center":
        layoutTarget.setAlignSelf(ALIGN_SELF_CENTER_CONSTANT);
        break;
      case "flex-end":
        layoutTarget.setAlignSelf(ALIGN_SELF_FLEX_END_CONSTANT);
        break;
      // No default; do nothing if value is unrecognized
    }
  }

  // Apply justifyContent if present
  if ("justifyContent" in flexboxConfig) {
    switch (flexboxConfig.justifyContent) {
      case "flex-start":
      case undefined:
      case null:
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_FLEX_START_CONSTANT);
        break;
      case "center":
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_CENTER_CONSTANT);
        break;
      case "flex-end":
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_FLEX_END_CONSTANT);
        break;
      case "space-between":
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_SPACE_BETWEEN_CONSTANT);
        break;
      case "space-around":
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_SPACE_AROUND_CONSTANT);
        break;
      case "space-evenly":
        layoutTarget.setJustifyContent(JUSTIFY_CONTENT_SPACE_EVENLY_CONSTANT);
        break;
      // No default; do nothing if value is unrecognized
    }
  }
}

module.exports = applyFlexboxConfig;