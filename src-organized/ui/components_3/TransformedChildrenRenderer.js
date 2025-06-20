/**
 * Renders children elements with a transformation applied to their data source.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to render.
 * @param {string} props.url - The URL used in the transformation function.
 * @param {boolean} [props.fallback=true] - Whether to use a fallback if the transformation fails.
 * @returns {React.ReactElement} The rendered React element with transformation applied.
 */
const React = require('react');
const TransformedText = require('ui/components/renderInkText'); // renderInkText: The component that applies the transform
const renderSecondaryText = require('ui/components/renderSecondaryText'); // renderSecondaryText: Function to render secondary text
const ChildrenWrapper = require('./_'); // _: Wrapper component for children

function TransformedChildrenRenderer({
  children,
  url,
  fallback = true
}) {
  return (
    React.createElement(
      TransformedText,
      {
        // Pass a transform function that uses the renderSecondaryText utility
        transform: (input) => renderSecondaryText(input, url, { fallback })
      },
      React.createElement(ChildrenWrapper, null, children)
    )
  );
}

module.exports = TransformedChildrenRenderer;
