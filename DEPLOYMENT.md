# SmartTools Hub - Netlify Deployment Guide

## Deployment Configuration

This project is configured for deployment on Netlify with the following setup:

### Configuration Files

- **netlify.toml** - Main Netlify configuration file
- **public/_redirects** - Client-side routing redirects for SPA
- **package.json** - Build scripts and dependencies

### Build Settings

- **Base Directory**: `frontend/`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/`
- **Node Version**: 18

### Deployment Methods

#### 1. Continuous Deployment (Recommended)

1. Connect your GitHub repository to Netlify
2. Set the following build settings in Netlify dashboard:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automatically on every push to main branch

#### 2. Manual Deployment via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize the site (run from project root)
netlify init

# Build and deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### 3. Drag & Drop Deployment

1. Run `npm run build` in the frontend directory
2. Drag the generated `dist` folder to Netlify's deployment area

### Environment Variables

If your application uses environment variables, add them in:
- Netlify Dashboard → Site Settings → Environment Variables

Common variables:
```
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
```

### Custom Domain

To use a custom domain:
1. Go to Netlify Dashboard → Domain Settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

### Performance Optimizations

The configuration includes:
- Static asset caching (1 year)
- Gzip compression
- Security headers
- Lighthouse performance monitoring

### Troubleshooting

**Build Fails**:
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

**404 on Direct URLs**:
- Ensure `_redirects` file is in `public/` directory
- Check SPA redirect rule in `netlify.toml`

**Performance Issues**:
- Enable Netlify's asset optimization
- Use Netlify's CDN
- Optimize images and assets

### Monitoring

- **Analytics**: Enable Netlify Analytics in dashboard
- **Performance**: Lighthouse plugin runs on each deploy
- **Uptime**: Use Netlify's built-in monitoring

### Support

For deployment issues:
- Check Netlify documentation
- Review build logs in Netlify dashboard
- Contact Netlify support for platform-specific issues