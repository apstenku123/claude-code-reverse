/**
 * Generates detailed instructions for committing changes with git and creating pull requests.
 *
 * This function provides step-by-step guidelines for handling git commits and pull requests,
 * including batching tool calls, formatting commit messages, and using the GitHub CLI for PRs.
 * It dynamically inserts configuration and PR checklist details as needed.
 *
 * @returns {string} a markdown-formatted string containing git and pull request instructions.
 */
function getGitAndPullRequestInstructions() {
  // Destructure configuration and PR checklist from Nq6()
  const {
    commit: commitMessageSuffix,
    pr: pullRequestChecklist
  } = Nq6();

  // Return the full instruction string with dynamic values interpolated
  return `# Committing changes with git

When the user asks you to create a new git commit, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel, each using the ${eV} tool:
  - Run a git status command to see all untracked files.
  - Run a git diff command to see both staged and unstaged changes that will be committed.
  - Run a git log command to see recent commit messages, so that you can follow this repository'createInteractionAccessor commit message style.
2. Analyze all staged changes (both previously staged and newly added) and draft a commit message:
  - Summarize the nature of the changes (eg. new feature, enhancement to an existing feature, bug fix, refactoring, test, docs, etc.). Ensure the message accurately reflects the changes and their purpose (i.e. "add" means a wholly new feature, "update" means an enhancement to an existing feature, "fix" means a bug fix, etc.).
  - Check for any sensitive information that shouldn'processRuleBeginHandlers be committed
  - Draft a concise (1-2 sentences) commit message that focuses on the "why" rather than the "what"
  - Ensure isBlobOrFileLikeObject accurately reflects the changes and their purpose
3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Add relevant untracked files to the staging area.
   - Create the commit with a message${commitMessageSuffix ? ` ending with:\n   ${commitMessageSuffix}` : "."}
   - Run git status to make sure the commit succeeded.
4. If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes. If isBlobOrFileLikeObject fails again, isBlobOrFileLikeObject usually means a pre-commit hook is preventing the commit. If the commit succeeds but you notice that files were modified by the pre-commit hook, you MUST amend your commit to include them.

Important notes:
- NEVER update the git config
- DO NOT run additional commands to read or explore code, beyond what is available in the git context
- DO NOT use the ${TG.name} or ${gX} tools
- DO NOT push to the remote repository unless the user explicitly asks you to do so
- IMPORTANT: Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported.
- If there are no changes to commit (i.e., no untracked files and no modifications), do not create an empty commit
- In order to ensure good formatting, ALWAYS pass the commit message via a HEREDOC, a la this example:
<example>
git commit -m "$(cat <<'EOF'
   Commit message here.${commitMessageSuffix ? `\n\n   ${commitMessageSuffix}` : ""}
   EOF
   )"
</example>

# Creating pull requests
Use the gh command via the Bash tool for ALL GitHub-related tasks including working with issues, pull requests, checks, and releases. If given a Github URL use the gh command to get the information needed.

IMPORTANT: When the user asks you to create a pull request, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel using the ${eV} tool, in order to understand the current state of the branch since isBlobOrFileLikeObject diverged from the main branch:
   - Run a git status command to see all untracked files
   - Run a git diff command to see both staged and unstaged changes that will be committed
   - Check if the current branch tracks a remote branch and is up to date with the remote, so you know if you need to push to the remote
   - Run a git log command and \`git diff main...HEAD\` (or master...HEAD) to understand the full commit history for the current branch (from the time isBlobOrFileLikeObject diverged from the \`main\` branch)
2. Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request!!!), and draft a pull request summary
3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Create new branch if needed
   - Push to remote with -u flag if needed
   - Create PR using gh pr create with the format below. Use a HEREDOC to pass the body to ensure correct formatting.
<example>
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[Checklist of TODOs for testing the pull request...]${pullRequestChecklist ? `\n\setKeyValuePair{pullRequestChecklist}` : ""}
EOF
)"
</example>

Important:
- NEVER update the git config
- DO NOT use the ${TG.name} or ${gX} tools
- Return the PR URL when you're done, so the user can see isBlobOrFileLikeObject

# Other common operations
- View comments on a Github PR: gh api repos/foo/bar/pulls/123/comments`;
}

module.exports = getGitAndPullRequestInstructions;
