# Production Server Deployment Setup

This guide explains how to set up automatic deployment to your production server using GitHub Actions.

## Overview

The `extensive-production-deploy.yml` workflow automatically:
1. **Builds** your MkDocs site using `mkdocs build`
2. **Copies files** to your production server using `scp`
3. **Verifies** the deployment was successful
4. **Optionally** restarts your web server

## Prerequisites

### Server Requirements
- **SSH access** enabled
- **SSH key authentication** configured
- **Target directory** with appropriate permissions
- **Web server** (nginx, Apache, etc.) configured to serve static files

### Local Requirements
- SSH key pair generated
- Access to your production server

## Setup Instructions

### 1. Generate SSH Key Pair (if needed)

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Test connection
ssh user@your-server.com
```

### 2. Configure GitHub Repository Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these **required** secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_PRIVATE_KEY` | Private SSH key content | `-----BEGIN RSA PRIVATE KEY-----\n...` |
| `SERVER_USER` | SSH username | `deploy` |
| `SERVER_HOST` | Server hostname or IP | `your-server.com` or `192.168.1.100` |
| `SERVER_DIR` | Target directory on server | `/var/www/html/docs` |

Add these **optional** secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_KNOWN_HOSTS` | Server host keys (recommended) | `your-server.com ssh-rsa AAAAB3...` |
| `CREATE_BACKUP` | Create backup before deploy | `true` |
| `FILE_PERMISSIONS` | Set file permissions after deploy | `755` |
| `RESTART_COMMAND` | Command to restart web server | `sudo systemctl reload nginx` |
| `SITE_URL` | URL to test after deployment | `https://your-site.com` |

### 3. Get SSH Known Hosts (Recommended)

```bash
# Get server host key
ssh-keyscan -H your-server.com

# Example output:
# your-server.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB...
```

Copy this output to the `SSH_KNOWN_HOSTS` secret.

### 4. Server Directory Setup

```bash
# Connect to your server
ssh user@your-server.com

# Create target directory
sudo mkdir -p /var/www/html/docs

# Set ownership (adjust user as needed)
sudo chown user:www-data /var/www/html/docs

# Set permissions
sudo chmod 755 /var/www/html/docs
```

### 5. Web Server Configuration

#### Nginx Example
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/html/docs;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Optional: Basic security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
}
```

#### Apache Example
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html/docs
    
    <Directory /var/www/html/docs>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
```

## How It Works

### Workflow Triggers
- **Push to main/master**: Automatic deployment
- **Manual dispatch**: Run from Actions tab with optional force deploy
- **Path filters**: Ignores changes to README.md and documentation files

### Deployment Process

1. **Build Phase**
   - Checkout repository
   - Setup Python environment
   - Install dependencies from `requirements.txt`
   - Run `mkdocs build --verbose --clean --strict`
   - Verify build output

2. **Preparation Phase**
   - Create deployment info JSON file
   - Setup SSH configuration
   - Validate required secrets

3. **Deployment Phase**
   - Optionally create backup of current deployment
   - Create target directory if needed
   - Copy all files using `scp -r site/* user@host:dir/`
   - Verify deployment success

4. **Post-Deployment**
   - Set file permissions (if configured)
   - Restart web server (if configured)
   - Test site availability (if configured)
   - Cleanup sensitive files

## Features

### 🔒 Security
- **SSH key authentication** (no passwords)
- **Known hosts verification** (prevents MITM attacks)
- **Automatic cleanup** of SSH keys after deployment
- **Secret validation** before deployment

### 🛡️ Safety
- **Build verification** before deployment
- **Optional backups** before overwriting
- **Deployment verification** after copying
- **Rollback capability** via backups

### 📊 Monitoring
- **Detailed logging** throughout the process
- **Deployment info** file with metadata
- **HTTP status checking** (optional)
- **Comprehensive error reporting**

### ⚡ Performance
- **Dependency caching** for faster builds
- **Concurrent deployment prevention**
- **Efficient file copying** with SCP

## Deployment Info File

Each deployment creates a `deployment-info.json` file with:

```json
{
  "deployed_at": "2025-08-22T10:30:00Z",
  "commit_sha": "abc123...",
  "commit_message": "Update documentation",
  "workflow_run_id": "123456789",
  "deployed_by": "username",
  "branch": "main"
}
```

## Troubleshooting

### Common Issues

#### SSH Connection Fails
```bash
# Test SSH connection manually
ssh -i ~/.ssh/id_rsa user@server

# Check SSH key format (should be base64, no line breaks in secret)
cat ~/.ssh/id_rsa | base64 -w 0
```

#### Permission Denied
```bash
# Check target directory permissions
ls -la /var/www/html/

# Fix ownership
sudo chown -R user:www-data /var/www/html/docs
```

#### Build Fails
- Check `requirements.txt` has all dependencies
- Verify `mkdocs.yml` configuration
- Test locally with `mkdocs build`

#### Files Not Updating
- Check web server configuration
- Clear browser cache
- Verify file timestamps on server

### Debug Commands

```bash
# Check deployment on server
ssh user@server "ls -la /var/www/html/docs/"

# View deployment info
ssh user@server "cat /var/www/html/docs/deployment-info.json"

# Check web server status
ssh user@server "sudo systemctl status nginx"

# View web server logs
ssh user@server "sudo tail -f /var/log/nginx/error.log"
```

## Security Best Practices

1. **Use dedicated deployment user** with minimal privileges
2. **Restrict SSH key** to specific commands if possible
3. **Use known_hosts** to prevent MITM attacks
4. **Regularly rotate** SSH keys and secrets
5. **Monitor deployment logs** for suspicious activity
6. **Use HTTPS** for your production site

## Advanced Configuration

### Custom Deploy Script
Create a deploy script on your server for complex deployments:

```bash
#!/bin/bash
# /home/user/deploy.sh

TARGET_DIR="/var/www/html/docs"
BACKUP_DIR="/home/user/backups"

# Create backup
cp -r "$TARGET_DIR" "$BACKUP_DIR/backup-$(date +%Y%m%d_%H%M%S)"

# Deploy new files (will be copied by GitHub Actions)
# Custom post-deployment tasks here

# Restart services
sudo systemctl reload nginx

echo "Deployment completed"
```

Then use in secrets:
- `RESTART_COMMAND`: `/home/user/deploy.sh`

### Multiple Environments
Create separate workflows for different environments:
- `production-deploy.yml` - Production server
- `staging-deploy.yml` - Staging server
- Use different secrets for each environment

## Benefits

✅ **Automated deployment** on every push  
✅ **Zero-downtime** deployment process  
✅ **Backup and rollback** capability  
✅ **Security best practices** built-in  
✅ **Comprehensive monitoring** and logging  
✅ **Flexible configuration** for different setups  
✅ **Production-ready** with error handling  
