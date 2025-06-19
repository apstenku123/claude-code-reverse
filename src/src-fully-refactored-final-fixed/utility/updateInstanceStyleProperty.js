/**
 * Updates a specific style property (or properties) for a React instance, handling both native and virtual instances.
 *
 * @param {object} renderer - The renderer object with methods to get instance/style and override values.
 * @param {string} instanceId - The unique updateSnapshotAndNotify of the instance to update.
 * @param {number|string} rendererId - The renderer'createInteractionAccessor unique updateSnapshotAndNotify.
 * @param {string} stylePropToRemove - The style property to remove or set to undefined.
 * @param {string} [stylePropToSet] - (Optional) The style property to set to a new value.
 * @param {*} [stylePropValue] - (Optional) The value to set for stylePropToSet.
 * @returns {void}
 */
function updateInstanceStyleProperty(
  renderer,
  instanceId,
  rendererId,
  stylePropToRemove,
  stylePropToSet,
  stylePropValue
) {
  // Retrieve the instance and its style using the renderer
  const instanceAndStyle = renderer.getInstanceAndStyle({
    id: instanceId,
    rendererID: rendererId
  });

  if (!instanceAndStyle || !instanceAndStyle.style) return;

  const { instance, style } = instanceAndStyle;

  // Prepare the new style object to apply
  let newStyle;
  if (stylePropToSet) {
    // If a property is to be set, create an object with both properties
    newStyle = {};
    popOpenElementsUntilTagOrSpecial(newStyle, stylePropToRemove, undefined);
    popOpenElementsUntilTagOrSpecial(newStyle, stylePropToSet, stylePropValue);
  } else {
    // Only remove the specified property
    newStyle = popOpenElementsUntilTagOrSpecial({}, stylePropToRemove, undefined);
  }

  // If the instance is a native component with setNativeProps
  if (instance !== null && typeof instance.setNativeProps === "function") {
    // Use a cache (kT) to store the style for this instance
    let cachedStyle = kT.get(instanceId);
    if (!cachedStyle) {
      kT.set(instanceId, newStyle);
    } else {
      Object.assign(cachedStyle, newStyle);
    }
    instance.setNativeProps({ style: newStyle });
  } else if (arraySome(style)) {
    // If style is an array (multiple style objects)
    const lastStyleIndex = style.length - 1;
    if (Wq(style[lastStyleIndex]) === "object" && !arraySome(style[lastStyleIndex])) {
      // If the last style entry is an object (not an array)
      let mergedStyle = shallowCloneObject(style[lastStyleIndex]);
      delete mergedStyle[stylePropToRemove];
      if (stylePropToSet) {
        mergedStyle[stylePropToSet] = stylePropValue;
      } else {
        mergedStyle[stylePropToRemove] = undefined;
      }
      renderer.overrideValueAtPath({
        type: "props",
        id: instanceId,
        rendererID: rendererId,
        path: ["style", lastStyleIndex],
        value: mergedStyle
      });
    } else {
      // Otherwise, append the new style object to the style array
      renderer.overrideValueAtPath({
        type: "props",
        id: instanceId,
        rendererID: rendererId,
        path: ["style"],
        value: style.concat([newStyle])
      });
    }
  } else if (Wq(style) === "object") {
    // If style is a single object
    let mergedStyle = shallowCloneObject(style);
    delete mergedStyle[stylePropToRemove];
    if (stylePropToSet) {
      mergedStyle[stylePropToSet] = stylePropValue;
    } else {
      mergedStyle[stylePropToRemove] = undefined;
    }
    renderer.overrideValueAtPath({
      type: "props",
      id: instanceId,
      rendererID: rendererId,
      path: ["style"],
      value: mergedStyle
    });
  } else {
    // If style is neither an array nor an object, create a new array with the old style and the new style
    renderer.overrideValueAtPath({
      type: "props",
      id: instanceId,
      rendererID: rendererId,
      path: ["style"],
      value: [style, newStyle]
    });
  }

  // Hide any native highlight that may be present
  renderer.emit("hideNativeHighlight");
}

module.exports = updateInstanceStyleProperty;