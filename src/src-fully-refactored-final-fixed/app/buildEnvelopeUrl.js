/**
 * Constructs an envelope URL string based on the provided project object.
 *
 * @param {Object} projectObject - The project object containing projectId and other metadata.
 * @returns {string} The constructed envelope URL for the given project.
 */
function buildEnvelopeUrl(projectObject) {
  // buildApiBaseUrl is assumed to be an external function that processes the project object
  // and returns a string prefix for the URL.
  const urlPrefix = buildApiBaseUrl(projectObject);
  const projectId = projectObject.projectId;

  // Construct and return the full envelope URL
  return `${urlPrefix}${projectId}/envelope/`;
}

module.exports = buildEnvelopeUrl;