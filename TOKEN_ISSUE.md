# Token Authentication Issue

## Problem

The provided GitHub Personal Access Token is returning "Bad credentials" when tested against the GitHub API.

## Possible Causes

1. **Token expired or revoked** - The token may have been deleted or expired
2. **Incorrect token format** - The token may have been copied incorrectly
3. **Insufficient permissions** - The token may not have `repo` scope
4. **Token belongs to different account** - The token may be for a different GitHub account

## Solutions

### Option 1: Verify Token is Valid

Test the token:
```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
```

If it returns user info, the token is valid. If it returns "Bad credentials", the token is invalid.

### Option 2: Create New Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Push Token"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (if you need to trigger workflows)
5. Generate and copy the token immediately

### Option 3: Use GitHub CLI with Correct Account

If you have access to the `JeevaAnanthV` account:

```bash
gh auth logout
gh auth login
# Select: GitHub.com
# Select: Login with a web browser
# Authenticate with JeevaAnanthV account
```

Then push normally:
```bash
git push -u origin cursor/phase1/finish-site
```

## Current Status

- ✅ Remote configured: `https://github.com/JeevaAnanthV/portfolio1.git`
- ✅ Branch ready: `cursor/phase1/finish-site`
- ✅ All changes committed
- ❌ Token authentication failing: "Bad credentials"

## Next Steps

1. Verify or create a new valid token with `repo` scope
2. Use the token to push:
   ```bash
   git remote set-url origin https://<NEW_TOKEN>@github.com/JeevaAnanthV/portfolio1.git
   git push -u origin cursor/phase1/finish-site
   ```
3. Create PR after successful push

