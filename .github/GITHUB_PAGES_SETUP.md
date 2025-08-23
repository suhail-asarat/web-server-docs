# GitHub Pages Deployment Workflows

This directory contains GitHub Actions workflows for automatically deploying your MkDocs documentation to GitHub Pages.

## Available GitHub Pages Workflows

### 1. `github-pages-deploy.yml` - Official GitHub Pages Deployment
This is the **recommended** approach that uses GitHub's official Pages deployment action.

**Features:**
- ✅ Uses official GitHub Pages deployment
- ✅ Build and deploy separation
- ✅ Artifact caching for faster builds
- ✅ Supports both `main` and `master` branches
- ✅ Manual workflow dispatch
- ✅ Proper permissions and concurrency control

**Setup required:**
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main/master branch to trigger deployment

### 2. `github-pages-build.yml` - MkDocs gh-deploy Method
This is a simpler approach using `mkdocs gh-deploy` command directly.

**Features:**
- ✅ Simple single-job workflow
- ✅ Uses `mkdocs gh-deploy` command
- ✅ Automatically creates/updates `gh-pages` branch
- ✅ Build caching for performance
- ✅ Manual workflow dispatch

**Setup required:**
1. Go to your repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch and `/ (root)` folder
4. Push to main/master branch to trigger deployment

## Other Deployment Options

- **Production Server**: See `simple-production-deploy.yml` and `PRODUCTION_DEPLOY_SETUP.md`
- **GitLab Pages**: See `gitlab-pages-*.yml` and `GITLAB_PAGES_SETUP.md`

## Which GitHub Pages Method to Use?

### Use `github-pages-deploy.yml` (Recommended) if:
- You want the most modern GitHub Pages deployment method
- You prefer official GitHub Actions
- You want build/deploy separation
- You're starting fresh

### Use `deploy-simple.yml` if:
- You prefer the traditional `mkdocs gh-deploy` approach
- You want a simpler workflow
- You're migrating from manual `mkdocs gh-deploy` usage
- You want more control over the deployment process

## GitHub Pages Setup Requirements
Make sure your repository has:
- **Actions enabled**: Settings → Actions → General → Allow all actions
- **Pages enabled**: Settings → Pages → Configure source appropriately
- **Workflow permissions**: Settings → Actions → General → Workflow permissions set to "Read and write permissions"

### Branch Protection
If you have branch protection rules, make sure the workflow has permission to push to the target branch.

### Custom Domain
If you're using a custom domain, add a `CNAME` file to your `docs/` directory with your domain name.

### Site URL Configuration
Update your `mkdocs.yml` with the correct site URL:
```yaml
site_url: https://yourusername.github.io/your-repository-name/
```

## Workflow Triggers

Both workflows trigger on:
- **Push to main/master**: Automatic deployment
- **Manual dispatch**: Run from Actions tab
- **Pull requests**: Build-only (no deployment) for testing

## Troubleshooting

### Common Issues:
1. **Permission denied**: Check workflow permissions in repository settings
2. **Build fails**: Check Python version and dependencies in `requirements.txt`
3. **Pages not updating**: Verify Pages source configuration
4. **404 errors**: Check `site_url` in `mkdocs.yml`

### Debug Steps:
1. Check the Actions tab for workflow run details
2. Look at the workflow logs for specific errors
3. Test locally with `mkdocs build` and `mkdocs serve`
4. Verify all files are committed and pushed

## Security

Both workflows use:
- **Minimal permissions**: Only what's needed for deployment
- **Official actions**: From verified publishers
- **Secrets protection**: GITHUB_TOKEN is automatically provided
- **Dependency caching**: For faster, more reliable builds
