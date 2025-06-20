/**
 * ToolPermissionRulesManager
 *
 * Manages the UI and logic for adding, removing, and toggling tool permission rules (allow/deny) in a security context.
 * Handles rule selection, creation, deletion, and context updates, providing a user interface for managing these rules.
 *
 * @param {Object} props - The component props
 * @param {function} props.onExit - Callback invoked when the user exits, with a summary of actions
 * @param {function} props.getToolPermissionContext - Function to get the current tool permission context
 * @param {function} props.setToolPermissionContext - Function to update the tool permission context
 * @returns {React.ReactElement} The rendered permission rules manager UI
 */
function ToolPermissionRulesManager({
  onExit,
  getToolPermissionContext,
  setToolPermissionContext
}) {
  // State for action log messages
  const [actionLogs, setActionLogs] = gI.useState([]);
  // State for the current tool permission context
  const [permissionContext, setPermissionContext] = gI.useState(getToolPermissionContext());
  // Updates both local and external permission context
  const handleContextUpdate = gI.useCallback(
    updatedContext => {
      setPermissionContext(updatedContext);
      setToolPermissionContext(updatedContext);
    },
    [setToolPermissionContext, setPermissionContext]
  );
  // State for the current rule behavior mode ("allow" or "deny")
  const [ruleBehaviorMode, setRuleBehaviorMode] = gI.useState("allow");
  // State for the currently selected rule (for deletion)
  const [selectedRule, setSelectedRule] = gI.useState();
  // State for whether the add-new-rule dialog is open
  const [isAddingNewRule, setIsAddingNewRule] = gI.useState(false);
  // State for the rule being added (if any)
  const [pendingRuleToAdd, setPendingRuleToAdd] = gI.useState(null);
  // Theme styles
  const theme = getThemeStylesheet();

  // Memoized map of allowed rules
  const allowedRulesMap = gI.useMemo(() => {
    const map = new Map();
    l51(permissionContext).forEach(rule => {
      map.set(JSON.stringify(rule), rule);
    });
    return map;
  }, [permissionContext]);

  // Memoized map of denied rules
  const deniedRulesMap = gI.useMemo(() => {
    const map = new Map();
    Zv(permissionContext).forEach(rule => {
      map.set(JSON.stringify(rule), rule);
    });
    return map;
  }, [permissionContext]);

  // Select the current rules map based on the behavior mode
  const currentRulesMap = (() => {
    switch (ruleBehaviorMode) {
      case "allow":
        return allowedRulesMap;
      case "deny":
        return deniedRulesMap;
      default:
        return allowedRulesMap;
    }
  })();

  // Memoized list of rule options for the select component
  const ruleOptions = gI.useMemo(() => {
    // Always include the 'add new rule' option at the top
    const options = [{
      label: `Add a new rule${y0.ellipsis}`,
      value: "add-new-rule"
    }];
    // Sort rule keys alphabetically by rule value
    const sortedRuleKeys = Array.from(currentRulesMap.keys()).sort((keyA, keyB) => {
      const ruleA = currentRulesMap.get(keyA);
      const ruleB = currentRulesMap.get(keyB);
      if (ruleA && ruleB) {
        const valueA = formatToolNameWithRule(ruleA.ruleValue).toLowerCase();
        const valueB = formatToolNameWithRule(ruleB.ruleValue).toLowerCase();
        return valueA.localeCompare(valueB);
      }
      return 0;
    });
    // Add each rule as an option
    for (const ruleKey of sortedRuleKeys) {
      const rule = currentRulesMap.get(ruleKey);
      if (rule) {
        options.push({
          label: formatToolNameWithRule(rule.ruleValue),
          value: ruleKey
        });
      }
    }
    return options;
  }, [currentRulesMap]);

  // Keyboard shortcut state (for exit hint)
  const exitShortcut = useCtrlKeyActionHandler();

  // Keyboard event handler: toggles allow/deny on tab/arrow keys
  D0((_, event) => {
    if (selectedRule || isAddingNewRule || pendingRuleToAdd) return;
    if (event.tab || event.leftArrow || event.rightArrow) {
      setRuleBehaviorMode(currentMode => {
        switch (currentMode) {
          case "allow":
            return "deny";
          case "deny":
            return "allow";
          default:
            return "allow";
        }
      });
    }
  });

  // Handler for rule selection from the dropdown
  const handleRuleSelect = gI.useCallback(
    selectedValue => {
      if (selectedValue === "add-new-rule") {
        setIsAddingNewRule(true);
        return;
      } else {
        setSelectedRule(currentRulesMap.get(selectedValue));
        return;
      }
    },
    [setSelectedRule, currentRulesMap]
  );

  // Handler to cancel adding a new rule
  const handleAddRuleCancel = gI.useCallback(() => {
    setIsAddingNewRule(false);
  }, []);

  // Handler to submit a new rule
  const handleAddRuleSubmit = gI.useCallback((ruleValue, ruleBehavior) => {
    setPendingRuleToAdd({ ruleValue, ruleBehavior });
    setIsAddingNewRule(false);
  }, []);

  // Handler for adding rules (after confirmation)
  const handleConfirmAddRules = gI.useCallback(newRules => {
    setPendingRuleToAdd(null);
    for (const rule of newRules) {
      setActionLogs(logs => [
        ...logs,
        `Added ${rule.ruleBehavior} rule ${FA.bold(formatToolNameWithRule(rule.ruleValue))}`
      ]);
    }
  }, []);

  // Handler to cancel adding rules
  const handleCancelAddRules = gI.useCallback(() => {
    setPendingRuleToAdd(null);
  }, []);

  // Handler for deleting a rule
  const handleDeleteRule = () => {
    if (!selectedRule) return;
    removePermissionRuleFromContext({
      rule: selectedRule,
      initialContext: permissionContext,
      setToolPermissionContext: handleContextUpdate
    });
    setActionLogs(logs => [
      ...logs,
      `Deleted ${selectedRule.ruleBehavior} rule ${FA.bold(formatToolNameWithRule(selectedRule.ruleValue))}`
    ]);
    setSelectedRule(undefined);
  };

  // If a rule is selected for deletion, show the delete confirmation dialog
  if (selectedRule) {
    return R2.createElement(RuleDeleteConfirmationDialog, {
      rule: selectedRule,
      onDelete: handleDeleteRule,
      onCancel: () => setSelectedRule(undefined)
    });
  }

  // If adding a new rule, show the add rule dialog
  if (isAddingNewRule) {
    return R2.createElement(PermissionRuleInput, {
      onCancel: handleAddRuleCancel,
      onSubmit: handleAddRuleSubmit,
      ruleBehavior: ruleBehaviorMode
    });
  }

  // If confirming addition of a rule, show the confirmation dialog
  if (pendingRuleToAdd) {
    return R2.createElement(PermissionRuleDialog, {
      onAddRules: handleConfirmAddRules,
      onCancel: handleCancelAddRules,
      ruleValues: [pendingRuleToAdd.ruleValue],
      ruleBehavior: pendingRuleToAdd.ruleBehavior,
      initialContext: permissionContext,
      setToolPermissionContext: handleContextUpdate
    });
  }

  // Helper: Get display label for rule behavior
  function getRuleBehaviorLabel(behavior) {
    switch (behavior) {
      case "allow":
        return "Allow";
      case "deny":
        return "Deny";
      default:
        return behavior;
    }
  }

  // Helper: Get description for current rule behavior mode
  function getBehaviorDescription() {
    switch (ruleBehaviorMode) {
      case "allow":
        return `${m0} won'processRuleBeginHandlers ask before using allowed tools.`;
      case "deny":
        return `${m0} will always reject requests to use denied tools.`;
      default:
        return "";
    }
  }

  // Main UI rendering
  return R2.createElement(
    R2.Fragment,
    null,
    R2.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: theme.permission
      },
      R2.createElement(
        g,
        {
          flexDirection: "row",
          gap: 1,
          marginBottom: 1
        },
        R2.createElement(
          _,
          {
            bold: true,
            color: theme.permission
          },
          "Permission rules:"
        ),
        ez5.map(behavior =>
          R2.createElement(
            _,
            {
              key: behavior,
              backgroundColor: ruleBehaviorMode === behavior ? theme.permission : undefined,
              color: ruleBehaviorMode === behavior ? "black" : undefined,
              bold: ruleBehaviorMode === behavior
            },
            ` ${getRuleBehaviorLabel(behavior)} `
          )
        )
      ),
      R2.createElement(_, null, getBehaviorDescription()),
      R2.createElement(
        g,
        { marginY: 1 },
        R2.createElement(SelectableOptionsList, {
          options: ruleOptions,
          onChange: handleRuleSelect,
          onCancel: () => {
            if (actionLogs.length > 0) {
              onExit(actionLogs.join("\n"));
            } else {
              onExit();
            }
          },
          visibleOptionCount: Math.min(10, ruleOptions.length)
        })
      ),
      R2.createElement(
        g,
        { marginLeft: 3 },
        exitShortcut.pending
          ? R2.createElement(_, { dimColor: true }, "Press ", exitShortcut.keyName, " again to exit")
          : R2.createElement(_, { dimColor: true }, "Tab to select behavior · Enter to confirm · Esc to cancel")
      )
    )
  );
}

module.exports = ToolPermissionRulesManager;