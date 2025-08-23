# GitLab Pages Deployment Setup

This guide explains how to set up automatic deployment to GitLab Pages from your GitHub repository.

## Overview

The setup uses two GitHub Actions workflows:

1. **`gitlab-pages-build.yml`** - Builds MkDocs site and updates `gl-pages` branch
2. **`gitlab-pages-deploy.yml`** - Triggers GitLab CI/CD to deploy from `gl-pages` branch

## Architecture

```
GitHub Repository (main branch)
       ↓ (on push)
GitHub Actions builds site
       ↓
Updates gl-pages branch
       ↓ (triggers)
GitHub Actions calls GitLab API
       ↓
GitLab CI/CD deploys to GitLab Pages
```

## Setup Instructions

### 1. GitLab Project Setup

1. **Create or access your GitLab project**
2. **Enable GitLab Pages** (usually enabled by default)
3. **Enable CI/CD** in your project settings

### 2. Create GitLab Access Token

1. Go to GitLab → **User Settings** → **Access Tokens**
2. Create a new token with:
   - **Name**: `GitHub Actions MkDocs Deploy`
   - **Scopes**: ✅ `api`
   - **Expiration**: Set appropriate date
3. **Save the token** - you'll need it for GitHub secrets

### 3. Get GitLab Project ID

1. Go to your GitLab project
2. The **Project ID** is shown on the project overview page
3. Or get it from: **Settings** → **General** → **Project ID**

### 4. Configure GitHub Repository Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `GITLAB_TOKEN` | GitLab access token | `glpat-xxxxxxxxxxxxxxxxxxxx` |
| `GITLAB_PROJECT_ID` | GitLab project ID | `12345678` |
| `GITLAB_URL` | GitLab instance URL (optional) | `https://gitlab.com` |

**Note**: `GITLAB_URL` is optional and defaults to `https://gitlab.com`. Only set it if using self-hosted GitLab.

### 5. Repository Configuration

Update your `mkdocs.yml` with the correct GitLab Pages URL:

```yaml
site_url: https://yourusername.gitlab.io/your-project-name/
```

## How It Works

### Workflow 1: Build and Update gl-pages

When you push to `main` or `master`:

1. **Builds MkDocs site** using your `requirements.txt`
2. **Creates GitLab CI config** (`.gitlab-ci.yml`)
3. **Prepares GitLab Pages structure** (files in `public/` directory)
4. **Updates gl-pages branch** with built files

### Workflow 2: Deploy to GitLab Pages

After the build workflow completes:

1. **Triggers GitLab CI pipeline** via API call
2. **GitLab CI deploys** from `public/` directory
3. **Reports deployment status**

## File Structure in gl-pages Branch

```
gl-pages/
├── .gitlab-ci.yml          # GitLab CI configuration
├── README.md               # Auto-generated branch info
└── public/                 # GitLab Pages expects files here
    ├── index.html
    ├── css/
    ├── js/
    └── ... (all MkDocs build output)
```

## GitLab CI Configuration

The workflow automatically creates this `.gitlab-ci.yml`:

```yaml
image: alpine:latest

pages:
  stage: deploy
  script:
    - echo "Deploying to GitLab Pages..."
    - ls -la public/
  artifacts:
    paths:
      - public
  only:
    - gl-pages

before_script:
  - apk add --no-cache git
```

## Monitoring Deployment

### GitHub Actions
- Check the **Actions** tab in your GitHub repository
- Monitor both build and deploy workflows

### GitLab CI/CD
- Go to your GitLab project → **CI/CD** → **Pipelines**
- Check the pipeline triggered on `gl-pages` branch

### GitLab Pages
- Access your site at: `https://yourusername.gitlab.io/your-project-name/`
- Check deployment status: **Deployments** → **Pages**

## Troubleshooting

### Common Issues

#### Build Workflow Fails
- Check Python dependencies in `requirements.txt`
- Verify MkDocs configuration in `mkdocs.yml`
- Review GitHub Actions logs

#### Deploy Workflow Fails
- Verify GitLab secrets are set correctly
- Check GitLab token permissions (needs `api` scope)
- Ensure GitLab project ID is correct

#### GitLab CI Pipeline Fails
- Check `.gitlab-ci.yml` syntax
- Verify `public/` directory contains files
- Check GitLab CI/CD is enabled

#### Pages Not Updating
- Verify GitLab Pages is enabled
- Check GitLab CI pipeline completed successfully
- Clear browser cache
- Verify `site_url` in `mkdocs.yml`

### Debug Steps

1. **Check GitHub Actions logs** for build errors
2. **Verify gl-pages branch** was updated with correct files
3. **Check GitLab CI pipeline** was triggered and completed
4. **Test locally** with `mkdocs build` and `mkdocs serve`

## Security Notes

- **GitLab token** should have minimal required permissions (`api` scope only)
- **Tokens expire** - set calendar reminders to renew
- **Use repository secrets** - never commit tokens to code
- **Monitor token usage** in GitLab access token settings

## Manual Deployment

If needed, you can manually trigger deployment:

```bash
# From your local repository
git checkout gl-pages
# Verify files are present
ls -la public/
# Push to trigger GitLab CI
git push origin gl-pages
```

## Benefits

- ✅ **Automatic deployment** on every push
- ✅ **Cross-platform** (GitHub + GitLab integration)
- ✅ **Separate build and deploy** processes
- ✅ **GitLab Pages features** (custom domains, SSL, etc.)
- ✅ **Version controlled** deployment configuration
- ✅ **Rollback capability** via Git history
