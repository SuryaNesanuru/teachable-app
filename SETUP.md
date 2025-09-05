# 🚀 Setup Guide - Teachable App

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env with your values
# At minimum, you need:
DATABASE_URL="postgresql://username:password@localhost:5432/teachable"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate -- --name init

# Seed with sample data
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Default Login Credentials

After seeding the database, you can sign in with:

| Role | Email | Password |
|------|-------|----------|
| **Student** | `student@example.com` | `password123` |
| **Instructor** | `instructor@example.com` | `password123` |
| **Admin** | `admin@example.com` | `password123` |

## 🌟 What You Get

### Landing Page
- Hero section with search
- Featured courses carousel
- Categories grid
- Testimonials

### Course Catalog
- Filterable course listings
- Animated course cards
- Search functionality

### Course Details
- Rich course information
- Curriculum preview
- Instructor details
- Add to cart

### Shopping Experience
- Shopping cart
- Stripe checkout
- Payment processing

### Dashboards
- **Student**: Progress tracking, course management
- **Instructor**: Analytics, course creation
- **Admin**: User management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Charts**: Recharts

## 📱 Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode** - Full theme support
- ✅ **Type Safety** - Complete TypeScript
- ✅ **Authentication** - OAuth + credentials
- ✅ **Role-Based Access** - Student/Instructor/Admin
- ✅ **Payment Processing** - Stripe integration
- ✅ **Content Security** - PDF watermarking
- ✅ **Progress Tracking** - Student analytics
- ✅ **Modern UI** - Clean, elegant design

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
# Windows: Check Services app
# Mac/Linux: brew services list postgresql

# Test connection
npx prisma db pull
```

### Missing Dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🔄 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Database changes**: Edit `prisma/schema.prisma`
3. **Run migrations**: `npm run prisma:migrate`
4. **Update client**: `npm run prisma:generate`
5. **Test changes**: Visit localhost:3000

## 📚 Next Steps

- [ ] Set up Stripe webhooks
- [ ] Configure S3 storage
- [ ] Add email notifications
- [ ] Implement search indexing
- [ ] Add analytics tracking
- [ ] Set up CI/CD pipeline

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review the [Prisma documentation](https://www.prisma.io/docs)
- Check [Next.js docs](https://nextjs.org/docs)
- Open an issue in the repository

---

**Happy coding! 🎉**
