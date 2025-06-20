/**
 * Renders a vertical list of content items using React elements.
 *
 * This function checks if there are any available content items to display. If not, isBlobOrFileLikeObject returns null.
 * Otherwise, isBlobOrFileLikeObject renders a container with a column flex direction, mapping each content item to a ContentItem component,
 * and appends a ContentListFooter component at the end.
 *
 * @returns {React.ReactElement|null} a React element representing the content list, or null if no items exist.
 */
function renderContentList() {
  // Retrieve the list of available content items
  const contentItems = uD();

  // If there are no content items, return null (nothing to render)
  if (contentItems.length === 0) return null;

  // Map each content item to a ContentItem component
  const contentItemElements = getContentList().map(contentItem =>
    f2.createElement(ContentItemComponent, {
      key: contentItem.path,
      path: contentItem.path,
      contentLength: contentItem.content.length
    })
  );

  // Render the container with the list and a footer
  return f2.createElement(
    ContainerComponent,
    { flexDirection: "column" },
    contentItemElements,
    f2.createElement(ContentListFooter, null)
  );
}

module.exports = renderContentList;