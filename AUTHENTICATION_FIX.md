# Authentication Fix Required

## Problem

The authenticated GitHub account (`Jeeva-countai`) does not have write access to `JeevaAnanthV/portfolio1`.

## Solutions

### Option 1: Switch GitHub CLI Account (Recommended)

If you have access to the `JeevaAnanthV` account:

```bash
gh auth logout
gh auth login
# Follow prompts to authenticate with JeevaAnanthV account
```

Then retry:
```bash
git push -u origin cursor/phase1/finish-site
```

### Option 2: Use Personal Access Token

1. Create a Personal Access Token (PAT) with `repo` scope:
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic) with `repo` scope
   - Copy the token

2. Use token for authentication:
```bash
git remote set-url origin https://<TOKEN>@github.com/JeevaAnanthV/portfolio1.git
git push -u origin cursor/phase1/finish-site
```

Or use git credential helper:
```bash
git push -u origin cursor/phase1/finish-site
# When prompted for username: JeevaAnanthV
# When prompted for password: <paste your PAT>
```

### Option 3: Grant Access to Jeeva-countai

If `Jeeva-countai` should have access:
1. Go to repository settings: https://github.com/JeevaAnanthV/portfolio1/settings/access
2. Add `Jeeva-countai` as a collaborator with write access

## After Successful Push

Once the branch is pushed, create the PR:

```bash
gh pr create \
  --base ag/phase1/layout-fix \
  --head cursor/phase1/finish-site \
  --title "Phase1: Finish site — content, visuals, PDFs, CI" \
  --body-file PR_BODY_WITH_CHECKLIST.md
```

## Current Status

- ✅ Remote configured: `https://github.com/JeevaAnanthV/portfolio1.git`
- ✅ Branch ready: `cursor/phase1/finish-site`
- ✅ All changes committed
- ❌ Push blocked: Authentication/permission issue

