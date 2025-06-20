/**
 * Sets up event listeners for the Native Style Editor, handling style measurement,
 * attribute renaming, and value setting for React Native components. Sends initial
 * support status and valid attributes to the renderer.
 *
 * @param {object} bridge - The communication bridge for sending and receiving events.
 * @param {object} store - The store containing application/component state.
 * @param {function} refreshStyles - Function to refresh or re-measure styles for a component.
 * @param {object} validAttributes - An object describing valid style attributes for the editor.
 * @returns {void}
 */
function initializeNativeStyleEditorListeners(bridge, store, refreshStyles, validAttributes) {
  // Listen for measurement requests from the Native Style Editor
  bridge.addListener("NativeStyleEditor_measure", function (payload) {
    const {
      id: instanceId,
      rendererID: rendererId
    } = payload;
    // Refresh or measure styles for the given instance
    refreshStyles(store, bridge, refreshStyles, instanceId, rendererId);
  });

  // Listen for attribute renaming events from the Native Style Editor
  bridge.addListener("NativeStyleEditor_renameAttribute", function (payload) {
    const {
      id: instanceId,
      rendererID: rendererId,
      oldName: oldAttributeName,
      newName: newAttributeName,
      value: newValue
    } = payload;
    // Update the style property name for the given instance
    updateInstanceStyleProperty(store, instanceId, rendererId, oldAttributeName, newAttributeName, newValue);
    // After renaming, refresh the styles asynchronously
    setTimeout(function () {
      return refreshStyles(store, bridge, refreshStyles, instanceId, rendererId);
    });
  });

  // Listen for style value setting events from the Native Style Editor
  bridge.addListener("NativeStyleEditor_setValue", function (payload) {
    const {
      id: instanceId,
      rendererID: rendererId,
      name: attributeName,
      value: newValue
    } = payload;
    // Update the style value for the given attribute
    setInstanceStyleValue(store, instanceId, rendererId, attributeName, newValue);
    // After setting the value, refresh the styles asynchronously
    setTimeout(function () {
      return refreshStyles(store, bridge, refreshStyles, instanceId, rendererId);
    });
  });

  // Notify the renderer that the Native Style Editor is supported and provide valid attributes
  bridge.send("isNativeStyleEditorSupported", {
    isSupported: true,
    validAttributes: validAttributes
  });
}

module.exports = initializeNativeStyleEditorListeners;