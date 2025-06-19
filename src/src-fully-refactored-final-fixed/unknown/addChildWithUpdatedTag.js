/**
 * Adds a child node to the source observable, optionally updating its tag name.
 *
 * Calls the updateTag method from options to determine if the tag name should be updated.
 * If updateTag returns false, the child is not added. If isBlobOrFileLikeObject returns a string, the tag name is updated before adding.
 *
 * @param {Object} sourceObservable - The parent or source object to which the child will be added.
 * @param {Object} config - The configuration object for the child, containing at least a 'tagname' property and optional ':@' metadata.
 * @param {any} subscription - Additional data or context passed to updateTag.
 * @returns {void}
 */
function addChildWithUpdatedTag(sourceObservable, config, subscription) {
  // Attempt to update the tag name using the provided options method
  const updatedTagName = this.options.updateTag(config.tagname, subscription, config[":@"]); 

  // If updateTag returns false, do not add the child
  if (updatedTagName === false) {
    return;
  }

  // If updateTag returns a string, update the tag name before adding
  if (typeof updatedTagName === "string") {
    config.tagname = updatedTagName;
  }

  // Add the child node to the source observable
  sourceObservable.addChild(config);
}

module.exports = addChildWithUpdatedTag;