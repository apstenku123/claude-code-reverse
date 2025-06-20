/**
 * Renders an input component with advanced paste handling, placeholder logic, and argument hints.
 * Handles terminal focus, theme styling, and manages input/paste events, including image pastes and paste state.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.inputState - State and handlers for the input (onInput, renderedValue, etc).
 * @param {React.ReactNode} props.children - Child elements to render inside the input.
 * @param {boolean} props.terminalFocus - Whether the terminal is focused.
 * @param {...Object} props.restProps - Additional props for input configuration and event handling.
 * @returns {React.ReactElement} The rendered input component.
 */
function InputWithPasteAndPlaceholder({
  inputState,
  children,
  terminalFocus,
  ...restProps
}) {
  // Destructure input state
  const {
    onInput: handleInput,
    renderedValue
  } = inputState;

  // Get theme styles for coloring argument hints
  const themeStyles = getThemeStylesheet();

  // Setup paste and input event handling
  const {
    wrappedOnInput,
    isPasting
  } = createPasteInputHandler({
    onPaste: restProps.onPaste,
    onInput: (inputValue, event) => {
      // If currently pasting and the event signals to return, do nothing
      if (isPasting && event.return) return;
      // Otherwise, call the original input handler
      handleInput(inputValue, event);
    },
    onImagePaste: restProps.onImagePaste
  });

  // Notify parent when paste state changes
  const { onIsPastingChange } = restProps;
  React.useEffect(() => {
    if (onIsPastingChange) onIsPastingChange(isPasting);
  }, [isPasting, onIsPastingChange]);

  // Determine placeholder visibility and value
  const {
    showPlaceholder,
    renderedPlaceholder
  } = renderPlaceholderWithCursor({
    placeholder: restProps.placeholder,
    value: restProps.value,
    showCursor: restProps.showCursor,
    focus: restProps.focus,
    terminalFocus
  });

  // Register the input handler for focus state
  D0(wrappedOnInput, {
    isActive: restProps.focus
  });

  // Determine if argument hint should be shown
  // Show if value is a single word or ends with a space
  const isSingleWordOrEndsWithSpace = (
    (restProps.value && restProps.value.trim().indexOf(' ') === -1) ||
    (restProps.value && restProps.value.endsWith(' '))
  );
  // Show argument hint if input starts with '/' and above condition is true
  const shouldShowArgumentHint = Boolean(
    restProps.argumentHint &&
    restProps.value &&
    isSingleWordOrEndsWithSpace &&
    restProps.value.startsWith('/')
  );

  // Render the input with placeholder, value, and argument hint
  return React.createElement(
    g,
    null,
    React.createElement(
      _,
      { wrap: 'truncate-end' },
      showPlaceholder ? renderedPlaceholder : renderedValue,
      shouldShowArgumentHint && React.createElement(
        _,
        { color: themeStyles.secondaryText },
        restProps.value?.endsWith(' ') ? '' : ' ',
        restProps.argumentHint
      ),
      children
    )
  );
}

module.exports = InputWithPasteAndPlaceholder;