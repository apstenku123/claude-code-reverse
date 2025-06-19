/**
 * Renders a summary of mapped user interaction routes if available.
 *
 * This function retrieves the mapped routes summary string via mapInteractionsToRoutes (getSubscriptionUpsellMessage),
 * trims any leading/trailing whitespace, and renders isBlobOrFileLikeObject inside a styled React element.
 * If no summary is available, isBlobOrFileLikeObject returns null.
 *
 * @returns {React.ReactElement|null} a styled React element containing the trimmed summary string, or null if unavailable.
 */
function renderMappedRoutesSummary() {
  // Retrieve the mapped routes summary string
  const mappedRoutesSummary = getSubscriptionUpsellMessage();

  // If no summary is available, return null
  if (!mappedRoutesSummary) return null;

  // Render the summary inside a styled React element
  return X$.createElement(
    g, // Presumed to be a styled container component
    {
      paddingLeft: 1,
      marginTop: 1,
      marginBottom: 1
    },
    X$.createElement(
      _, // Presumed to be a text or typography component
      null,
      mappedRoutesSummary.trim()
    )
  );
}

module.exports = renderMappedRoutesSummary;