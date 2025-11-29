# Push & PR Instructions

## Current Status

✅ Branch: `cursor/phase1/finish-site`  
✅ All changes committed  
✅ GitHub CLI authenticated (account: Jeeva-countai)  
❌ Git remote 'origin' not configured

## Required Actions

### Step 1: Add Git Remote

You need to add the remote repository URL. Replace `<owner>` and `<repo>` with your actual GitHub repository:

```bash
cd /home/jeeva/Music/portfolio/jeeva-portfolio
git remote add origin git@github.com:<owner>/<repo>.git
# OR if using HTTPS:
# git remote add origin https://github.com/<owner>/<repo>.git
```

### Step 2: Push Branch

```bash
git push -u origin cursor/phase1/finish-site
```

### Step 3: Create PR

Once pushed, create the PR using GitHub CLI:

```bash
gh pr create \
  --base ag/phase1/layout-fix \
  --head cursor/phase1/finish-site \
  --title "Phase1: Finish site — content, visuals, PDFs, CI" \
  --body-file PR_DESCRIPTION.md
```

Or create it manually via GitHub web interface.

## Alternative: Create PR Without Push

If you want to create the PR first (GitHub will create the branch), you can use:

```bash
gh pr create \
  --base ag/phase1/layout-fix \
  --head cursor/phase1/finish-site \
  --title "Phase1: Finish site — content, visuals, PDFs, CI" \
  --body-file PR_DESCRIPTION.md \
  --repo <owner>/<repo>
```

This will push the branch automatically if you have write access.

## After PR Creation

1. CI will automatically run on push
2. Check GitHub Actions for:
   - Build job completion
   - PDF generation artifacts
   - Preview deployment (if `VC_TOKEN_PREVIEW` secret is set)
3. Add PR comment with artifact links once CI completes

