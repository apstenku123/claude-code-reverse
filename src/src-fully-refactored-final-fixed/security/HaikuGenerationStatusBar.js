/**
 * Renders a status bar for haiku generation, displaying elapsed time, token count, connection status, and a spinner.
 *
 * @param {Object} props - The component props.
 * @param {string} props.mode - The current mode of the haiku generator (e.g., 'compose', 'edit').
 * @param {string[]} props.haikuWords - The array of words currently in the haiku.
 * @param {number} props.currentResponseLength - The current length (in tokens) of the generated response.
 * @param {string} [props.overrideMessage] - Optional override message to display instead of the generated haiku.
 * @returns {React.ReactElement} The rendered status bar component.
 */
function HaikuGenerationStatusBar({
  mode,
  haikuWords,
  currentResponseLength,
  overrideMessage
}) {
  // Spinner frame index
  const [spinnerIndex, setSpinnerIndex] = AJ.useState(0);
  // Elapsed time in seconds
  const [elapsedSeconds, setElapsedSeconds] = AJ.useState(0);
  // Token count (animated)
  const [animatedTokenCount, setAnimatedTokenCount] = AJ.useState(0);

  // Get connection status
  const { isConnected } = useConnectionStatus();

  // Generate haiku preview message (debounced)
  const haikuPreview = useDebouncedObservableValue(
    () => iT(haikuWords.length > 0 ? haikuWords : SH5),
    [haikuWords.length],
    1000
  );

  // The message to display (override or generated)
  const displayMessage = overrideMessage || haikuPreview;

  // Store the time the component was mounted
  const mountTimeRef = AJ.useRef(Date.now());
  // Store the latest response length for animation
  const latestResponseLengthRef = AJ.useRef(currentResponseLength);

  // Keep latest response length up to date
  AJ.useEffect(() => {
    latestResponseLengthRef.current = currentResponseLength;
  }, [currentResponseLength]);

  // Animate spinner index every 120ms
  YC(() => {
    if (!isConnected) {
      setSpinnerIndex(4); // Show 'offline' spinner frame
      return;
    }
    setSpinnerIndex(prev => prev + 1);
  }, 120);

  // Animate token count towards the latest response length
  YC(() => {
    setAnimatedTokenCount(prevTokenCount => {
      const remaining = latestResponseLengthRef.current - prevTokenCount;
      if (remaining <= 0) return prevTokenCount;
      let increment;
      if (remaining < 70) {
        increment = 1;
      } else if (remaining < 200) {
        increment = Math.max(2, Math.ceil(remaining * 0.08));
      } else {
        increment = 18;
      }
      return Math.min(prevTokenCount + increment, latestResponseLengthRef.current);
    });
  }, 10);

  // Update elapsed seconds since mount
  YC(() => {
    setElapsedSeconds(Math.floor((Date.now() - mountTimeRef.current) / 1000));
  }, 10);

  // Build status bar elements
  const statusElements = [
    // Elapsed time
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText,
      key: 'elapsedTime'
    }, elapsedSeconds, 'createInteractionAccessor'),
    // Token count
    J9.createElement(g, {
      flexDirection: 'row',
      key: 'tokens'
    },
      J9.createElement(renderInteractionModeIcon, {
        mode: mode,
        key: 'spinnerMode'
      }),
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, formatNumberCompact(Math.round(animatedTokenCount / 4)), ' tokens')
    ),
    // Escape instruction
    J9.createElement(g, {
      key: 'esc'
    },
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText,
        bold: true
      }, 'esc', ' '),
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, 'to interrupt')
    )
  ];

  // If offline, add offline indicator
  if (isConnected === false) {
    statusElements.push(
      J9.createElement(g, {
        key: 'offline'
      },
        J9.createElement(_, {
          color: getThemeStylesheet().error,
          bold: true
        }, 'offline')
      )
    );
  }

  // Choose spinner/message color based on connection
  const spinnerColor = isConnected === false ? getThemeStylesheet().secondaryText : getThemeStylesheet().claude;

  return J9.createElement(g, {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 1,
    width: '100%'
  },
    // Spinner
    J9.createElement(g, {
      flexWrap: 'wrap',
      height: 1,
      width: 2,
      key: 'spinner'
    },
      J9.createElement(_, {
        color: spinnerColor
      }, Jz1[spinnerIndex % Jz1.length])
    ),
    // Main message
    J9.createElement(_, {
      color: spinnerColor,
      key: 'message'
    }, displayMessage, '…', ' '),
    // Status bar (elapsed, tokens, esc, offline)
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, '('),
    FW(statusElements, (element, idx) =>
      J9.createElement(_, {
        color: getThemeStylesheet().secondaryText,
        key: `separator-${idx}`
      }, ' ', '·', ' ')
    ),
    J9.createElement(_, {
      color: getThemeStylesheet().secondaryText
    }, ')')
  );
}

module.exports = HaikuGenerationStatusBar;