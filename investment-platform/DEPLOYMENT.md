# ArthCalc — Deployment Guide

## Quick Start (Local)

```bash
cd investment-platform
npm install
cp .env.example .env.local   # fill in values
npm run dev                   # http://localhost:3000
```

## Environment Variables (.env.local)

```env
# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics 4

# Auth (NextAuth)
NEXTAUTH_SECRET=your-random-secret-32chars
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-secret

# Database (optional for saved calcs)
DATABASE_URL=postgresql://user:pass@host:5432/arthcalc

# Redis (optional for caching)
REDIS_URL=redis://localhost:6379

# AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## Deploy on Vercel (Recommended — Free Tier Works)

1. Push code to GitHub
2. Go to vercel.com → Import Project → Select repo
3. Add environment variables in Vercel dashboard
4. Click Deploy — live in ~90 seconds
5. Add custom domain in Vercel → Domains

### Post-Deploy
```bash
npm run postbuild   # generates sitemap.xml
```
(Or add `"postbuild": "next-sitemap"` to package.json scripts)

## Deploy on AWS (Advanced)

### Option A: EC2 + PM2
```bash
# On EC2 (Ubuntu 22.04)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
npm install -g pm2
cd /var/www/arthcalc && npm install && npm run build
pm2 start npm --name "arthcalc" -- start
pm2 startup && pm2 save
```

### Option B: Docker
```bash
docker build -t arthcalc .
docker run -p 3000:3000 --env-file .env.local arthcalc
```

### Nginx Config
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SEO Checklist
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Add domain to Bing Webmaster Tools
- [ ] Set up Google Analytics 4
- [ ] Configure Google AdSense (after 3–6 months of traffic)
- [ ] Add canonical URLs (already in metadata)
- [ ] Verify robots.txt at `https://yourdomain.com/robots.txt`

## Revenue Setup

### Google AdSense
1. Apply at adsense.google.com after your site has content
2. Add `NEXT_PUBLIC_ADSENSE_ID` to env — ads auto-display
3. Place ad components in calculator result sections

### Affiliate (future)
- Zerodha partner program: partners.zerodha.com
- Groww affiliate: groww.in/affiliate
- AngelOne affiliate: angelone.in/angel-bee-partner

## Performance Tips
- Images: Use Next.js `<Image>` component (already done)
- Fonts: Inter loaded via next/font (already done)
- Static pages: All calculator/compare/encyclopedia pages are statically generated
- ISR: Add `revalidate = 86400` to rates pages for daily refresh
