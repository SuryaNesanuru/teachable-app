# 🚀 Deployment Checklist - Teachable App

## 📋 **Pre-Deployment Checklist**

### ✅ **Environment Configuration**
- [ ] Copy `env.example` to `.env`
- [ ] Set `DATABASE_URL` to production PostgreSQL
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Configure Stripe production keys
- [ ] Set up S3 storage credentials (if using)
- [ ] Configure OAuth providers (Google, GitHub)

### ✅ **Database Setup**
- [ ] Run `npm run prisma:generate`
- [ ] Execute `npm run prisma:migrate -- --name init`
- [ ] Seed production database with `npm run db:seed`
- [ ] Verify database connections
- [ ] Test database performance

### ✅ **Security Configuration**
- [ ] Enable HTTPS in production
- [ ] Set secure cookie settings
- [ ] Configure CORS policies
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Test authentication flows

### ✅ **Payment Processing**
- [ ] Switch to Stripe production keys
- [ ] Configure webhook endpoints
- [ ] Test payment flows
- [ ] Set up refund policies
- [ ] Configure tax calculations
- [ ] Test webhook security

### ✅ **File Storage**
- [ ] Configure S3 bucket permissions
- [ ] Set up CDN (CloudFront, etc.)
- [ ] Test file upload/download
- [ ] Configure backup strategies
- [ ] Set up monitoring

### ✅ **Performance Optimization**
- [ ] Enable Next.js production mode
- [ ] Configure image optimization
- [ ] Set up caching strategies
- [ ] Enable compression
- [ ] Test Core Web Vitals

## 🌐 **Deployment Options**

### **Vercel (Recommended)**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Set environment variables in Vercel dashboard
# 4. Configure custom domain
```

### **Netlify**
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
# 3. Set environment variables
# 4. Configure redirects for Next.js
```

### **Self-Hosted**
```bash
# 1. Build the project
npm run build

# 2. Start production server
npm run start

# 3. Use PM2 or similar for process management
pm2 start npm --name "teachable" -- start
```

## 🔧 **Production Configuration**

### **Next.js Configuration**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For containerized deployment
  images: {
    domains: ['your-s3-bucket.s3.amazonaws.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig
```

### **Environment Variables**
```bash
# Production .env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@prod-db:5432/teachable"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### **Database Configuration**
```bash
# Production database considerations
- Connection pooling
- Read replicas for scaling
- Automated backups
- Monitoring and alerting
- Performance tuning
```

## 📊 **Monitoring & Analytics**

### **Application Monitoring**
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Set up alerting

### **Business Metrics**
- [ ] Track user registrations
- [ ] Monitor course sales
- [ ] Track user engagement
- [ ] Monitor payment success rates
- [ ] Set up conversion funnels

## 🧪 **Testing Checklist**

### **Functionality Testing**
- [ ] User registration and login
- [ ] Course browsing and search
- [ ] Shopping cart functionality
- [ ] Payment processing
- [ ] Content delivery
- [ ] Admin functions

### **Performance Testing**
- [ ] Load testing with tools like Artillery
- [ ] Database query optimization
- [ ] Image and asset optimization
- [ ] CDN performance
- [ ] Mobile performance

### **Security Testing**
- [ ] Authentication bypass attempts
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting effectiveness

## 🔄 **Post-Deployment**

### **Immediate Actions**
- [ ] Verify all functionality works
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Test payment flows
- [ ] Verify email delivery

### **Ongoing Maintenance**
- [ ] Regular security updates
- [ ] Database maintenance
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Feature updates

## 🚨 **Emergency Procedures**

### **Rollback Plan**
```bash
# If deployment fails
git checkout previous-commit
npm run build
npm run start
```

### **Database Recovery**
```bash
# Restore from backup
pg_restore -d teachable backup.dump

# Or use Prisma
npx prisma db push --force-reset
npm run db:seed
```

### **Contact Information**
- **Developer**: [Your Contact Info]
- **Hosting Provider**: [Provider Support]
- **Database Provider**: [DB Support]
- **Payment Provider**: [Stripe Support]

## 📚 **Useful Commands**

### **Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
```

### **Database**
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run db:seed          # Seed database
npx prisma studio        # Open database GUI
```

### **Deployment**
```bash
npm run build           # Build project
npm run start           # Start production
vercel --prod           # Deploy to Vercel
```

---

**Remember**: Always test in staging environment before deploying to production! 🚀
