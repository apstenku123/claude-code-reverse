/**
 * Renders a React element that transforms its input using a provided URL and fallback option.
 * This component wraps its children with a transformation logic and displays them inside a styled container.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the component
 * @param {string} props.url - The URL used for transformation logic
 * @param {boolean} [props.fallback=true] - Whether to use fallback behavior during transformation
 * @returns {React.ReactElement} The rendered React element
 */
const TransformedElementWithFallback = ({
  children,
  url,
  fallback = true
}) => {
  // The 'transform' prop applies the renderSecondaryText (renderSecondaryText) function with the given url and fallback
  return zp1.default.createElement(
    renderInkText,
    {
      transform: (input) => renderSecondaryText(input, url, { fallback })
    },
    // Render the children inside a styled wrapper component (_)
    zp1.default.createElement(_, null, children)
  );
};

module.exports = TransformedElementWithFallback;
