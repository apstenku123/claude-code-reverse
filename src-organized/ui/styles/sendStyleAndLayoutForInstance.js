/**
 * Sends the style and layout information for a given instance to the client.
 * If the instance or its style is not found, sends nulls for layout and style.
 * If the instance supports measurement, includes layout metrics (position, size, margin, padding).
 *
 * @param {object} renderer - The renderer object with getInstanceAndStyle method.
 * @param {object} client - The client communication object with a send method.
 * @param {function} styleProcessor - Function to process the style object.
 * @param {string|number} instanceId - The unique identifier for the instance.
 * @param {string|number} rendererId - The unique identifier for the renderer.
 * @returns {void}
 */
function sendStyleAndLayoutForInstance(renderer, client, styleProcessor, instanceId, rendererId) {
  // Retrieve the instance and its style using the renderer
  const instanceAndStyle = renderer.getInstanceAndStyle({
    id: instanceId,
    rendererID: rendererId
  });

  // If instance or style is missing, send nulls
  if (!instanceAndStyle || !instanceAndStyle.style) {
    client.send("NativeStyleEditor_styleAndLayout", {
      id: instanceId,
      layout: null,
      style: null
    });
    return;
  }

  const { instance, style } = instanceAndStyle;
  // Process the style using the provided styleProcessor function
  let processedStyle = styleProcessor(style);

  // Retrieve any style overrides for this instance
  const styleOverrides = kT.get(instanceId);
  if (styleOverrides != null) {
    // Merge overrides into the processed style
    processedStyle = Object.assign({}, processedStyle, styleOverrides);
  }

  // If the instance does not support measurement, send style only
  if (!instance || typeof instance.measure !== "function") {
    client.send("NativeStyleEditor_styleAndLayout", {
      id: instanceId,
      layout: null,
      style: processedStyle || null
    });
    return;
  }

  // Otherwise, measure the instance to get layout information
  instance.measure(function (
    x,
    mapArraysToObjectWithCallback,
    width,
    height,
    left,
    top
  ) {
    // If measurement failed, send style only
    if (typeof x !== "number") {
      client.send("NativeStyleEditor_styleAndLayout", {
        id: instanceId,
        layout: null,
        style: processedStyle || null
      });
      return;
    }

    // Extract margin and padding from style, or use defaults
    const margin = processedStyle != null && extractDirectionalValues("margin", processedStyle) || lA1;
    const padding = processedStyle != null && extractDirectionalValues("padding", processedStyle) || lA1;

    // Send the full style and layout information to the client
    client.send("NativeStyleEditor_styleAndLayout", {
      id: instanceId,
      layout: {
        x,
        mapArraysToObjectWithCallback,
        width,
        height,
        left,
        top,
        margin,
        padding
      },
      style: processedStyle || null
    });
  });
}

module.exports = sendStyleAndLayoutForInstance;