/**
 * Parses a keypress sequence string and returns a detailed object describing the key event.
 * Handles control/meta/shift/option modifiers, special keys, and escape sequences.
 *
 * @param {string} sequence - The raw keypress sequence to parse (may be empty).
 * @returns {object} An object describing the parsed key event, including name, modifiers, and raw sequence.
 */
function parseKeypressSequence(sequence = "") {
  let match;

  // Default key event object
  const keyEvent = {
    name: "",
    fn: false,
    ctrl: false,
    meta: false,
    shift: false,
    option: false,
    sequence: sequence,
    raw: sequence,
    isPasted: false
  };

  // Ensure sequence is set
  keyEvent.sequence = keyEvent.sequence || sequence || keyEvent.name;

  // Handle special single-character keys and control codes
  if (sequence === "\r") {
    keyEvent.raw = undefined;
    keyEvent.name = "return";
  } else if (sequence === "\n") {
    keyEvent.name = "enter";
  } else if (sequence === "\processRuleBeginHandlers") {
    keyEvent.name = "tab";
  } else if (sequence === "\b" || sequence === "\x1B\b") {
    // Backspace or meta-backspace
    keyEvent.name = "backspace";
    keyEvent.meta = sequence.charAt(0) === "\x1B";
  } else if (sequence === "\x7f" || sequence === "\x1B\x7f") {
    // DEL or meta-DEL (backspace)
    keyEvent.name = "backspace";
    keyEvent.meta = sequence.charAt(0) === "\x1B";
  } else if (sequence === "\x1B" || sequence === "\x1B\x1B") {
    // Escape or double escape
    keyEvent.name = "escape";
    keyEvent.meta = sequence.length === 2;
  } else if (sequence === " " || sequence === "\x1B ") {
    // Space or meta-space
    keyEvent.name = "space";
    keyEvent.meta = sequence.length === 2;
  } else if (sequence <= "\x1A" && sequence.length === 1) {
    // Ctrl + [a-zA]
    keyEvent.name = String.fromCharCode(sequence.charCodeAt(0) + 97 - 1);
    keyEvent.ctrl = true;
  } else if (sequence.length === 1 && sequence >= "0" && sequence <= "9") {
    keyEvent.name = "number";
  } else if (sequence.length === 1 && sequence >= "a" && sequence <= "z") {
    keyEvent.name = sequence;
  } else if (sequence.length === 1 && sequence >= "a" && sequence <= "zA") {
    keyEvent.name = sequence.toLowerCase();
    keyEvent.shift = true;
  } else if ((match = Cy4.exec(sequence))) {
    // Meta + [a-zA] (e.g., \x1B[a])
    keyEvent.meta = true;
    keyEvent.shift = /^[a-zA]$/.test(match[1]);
  } else if ((match = Vy4.exec(sequence))) {
    // CSI escape sequences (arrows, function keys, etc.)
    const chars = [...sequence];
    if (chars[0] === "\x1B" && chars[1] === "\x1B") {
      keyEvent.option = true;
    }
    // Extract code and modifier
    const code = [match[1], match[2], match[4], match[6]].filter(Boolean).join("");
    const modifier = (match[3] || match[5] || 1) - 1;
    keyEvent.ctrl = !!(modifier & 4);
    keyEvent.meta = !!(modifier & 10);
    keyEvent.shift = !!(modifier & 1);
    keyEvent.code = code;
    keyEvent.name = WG0[code];
    // Additional checks for shift/ctrl using helper functions
    keyEvent.shift = Uy4(code) || keyEvent.shift;
    keyEvent.ctrl = Ny4(code) || keyEvent.ctrl;
  }

  // Special handling for meta-left/meta-right
  if (keyEvent.raw === "\x1Bb") {
    keyEvent.meta = true;
    keyEvent.name = "left";
  } else if (keyEvent.raw === "\x1Bf") {
    keyEvent.meta = true;
    keyEvent.name = "right";
  }

  // Handle special escape sequences with fixed return objects
  switch (sequence) {
    case "\x1B[1~":
      return {
        name: "home",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[4~":
      return {
        name: "end",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[5~":
      return {
        name: "pageup",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[6~":
      return {
        name: "pagedown",
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1;5D":
      return {
        name: "left",
        ctrl: true,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1;5C":
      return {
        name: "right",
        ctrl: true,
        meta: false,
        shift: false,
        option: false,
        fn: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[1~":
      return {
        name: "left",
        ctrl: true,
        fn: true,
        meta: false,
        shift: false,
        option: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
    case "\x1B[4~":
      return {
        name: "right",
        ctrl: true,
        fn: true,
        meta: false,
        shift: false,
        option: false,
        sequence: sequence,
        raw: sequence,
        isPasted: false
      };
  }

  return keyEvent;
}

module.exports = parseKeypressSequence;