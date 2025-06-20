/**
 * Renders children inside a transformation wrapper component, applying a transformation function
 * that uses a provided URL and an optional fallback flag. This is typically used to wrap text or content
 * with secondary styling and handle fallback logic.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to render inside the wrapper
 * @param {string} props.url - The URL to be used by the transformation function
 * @param {boolean} [props.fallback=true] - Whether to enable fallback behavior in the transformation
 * @returns {React.ReactElement} The rendered React element with transformation applied
 */
const TransformedChildrenWithFallback = ({
  children,
  url,
  fallback = true
}) => {
  // Render the transformation wrapper, passing a transform function that uses the url and fallback flag
  return zp1.default.createElement(
    renderInkText,
    {
      transform: (input) => renderSecondaryText(input, url, { fallback })
    },
    zp1.default.createElement(_, null, children)
  );
};

module.exports = TransformedChildrenWithFallback;
