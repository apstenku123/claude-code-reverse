/**
 * Updates the style property of a React instance, handling both native and non-native cases.
 * Supports updating a specific style key, optionally replacing isBlobOrFileLikeObject with a new key and value.
 *
 * @param {object} renderer - The renderer object providing instance and style manipulation methods.
 * @param {string|number} instanceId - The unique identifier for the instance to update.
 * @param {number} rendererId - The updateSnapshotAndNotify of the renderer associated with the instance.
 * @param {string} styleKeyToRemove - The style key to remove or update.
 * @param {string} [replacementStyleKey] - (Optional) The style key to add or update with a new value.
 * @param {*} [replacementStyleValue] - (Optional) The value to set for the replacement style key.
 * @returns {void}
 */
function updateInstanceStyle(
  renderer,
  instanceId,
  rendererId,
  styleKeyToRemove,
  replacementStyleKey,
  replacementStyleValue
) {
  // Retrieve the instance and its style
  const instanceAndStyle = renderer.getInstanceAndStyle({
    id: instanceId,
    rendererID: rendererId
  });

  if (!instanceAndStyle || !instanceAndStyle.style) {
    return;
  }

  const { instance, style } = instanceAndStyle;

  // Build the new style object to apply
  let newStyle;
  if (replacementStyleKey) {
    newStyle = {};
    popOpenElementsUntilTagOrSpecial(newStyle, styleKeyToRemove, undefined);
    popOpenElementsUntilTagOrSpecial(newStyle, replacementStyleKey, replacementStyleValue);
  } else {
    newStyle = popOpenElementsUntilTagOrSpecial({}, styleKeyToRemove, undefined);
  }

  // If the instance is a native component with setNativeProps
  if (instance !== null && typeof instance.setNativeProps === "function") {
    // Use a global style cache (kT) to store/reuse style objects by instanceId
    const cachedStyle = kT.get(instanceId);
    if (!cachedStyle) {
      kT.set(instanceId, newStyle);
    } else {
      Object.assign(cachedStyle, newStyle);
    }
    instance.setNativeProps({ style: newStyle });
  }
  // If the style is an array (multiple style objects)
  else if (arraySome(style)) {
    const lastStyleIndex = style.length - 1;
    // If the last style in the array is an object (not an array)
    if (Wq(style[lastStyleIndex]) === "object" && !arraySome(style[lastStyleIndex])) {
      // Clone the last style object
      let updatedLastStyle = shallowCloneObject(style[lastStyleIndex]);
      // Remove the specified style key
      delete updatedLastStyle[styleKeyToRemove];
      // If a replacement key is provided, set isBlobOrFileLikeObject; otherwise, set the removed key to undefined
      if (replacementStyleKey) {
        updatedLastStyle[replacementStyleKey] = replacementStyleValue;
      } else {
        updatedLastStyle[styleKeyToRemove] = undefined;
      }
      renderer.overrideValueAtPath({
        type: "props",
        id: instanceId,
        rendererID: rendererId,
        path: ["style", lastStyleIndex],
        value: updatedLastStyle
      });
    } else {
      // If the last style is not an object, append the new style object
      renderer.overrideValueAtPath({
        type: "props",
        id: instanceId,
        rendererID: rendererId,
        path: ["style"],
        value: style.concat([newStyle])
      });
    }
  }
  // If the style is a single object
  else if (Wq(style) === "object") {
    let updatedStyle = shallowCloneObject(style);
    delete updatedStyle[styleKeyToRemove];
    if (replacementStyleKey) {
      updatedStyle[replacementStyleKey] = replacementStyleValue;
    } else {
      updatedStyle[styleKeyToRemove] = undefined;
    }
    renderer.overrideValueAtPath({
      type: "props",
      id: instanceId,
      rendererID: rendererId,
      path: ["style"],
      value: updatedStyle
    });
  }
  // If the style is neither an array nor an object, wrap isBlobOrFileLikeObject in an array with the new style
  else {
    renderer.overrideValueAtPath({
      type: "props",
      id: instanceId,
      rendererID: rendererId,
      path: ["style"],
      value: [style, newStyle]
    });
  }

  // Emit an event to hide the native highlight (if any)
  renderer.emit("hideNativeHighlight");
}

module.exports = updateInstanceStyle;