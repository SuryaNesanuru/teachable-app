# 🚀 Teachable - Online Course & Software Marketplace

A modern, scalable SaaS platform for selling online courses and digital products, built with Next.js 15, TypeScript, and TailwindCSS.

## ✨ Features

### 🎓 Core Functionality
- **Course Management**: Create, publish, and manage courses with modules and lessons
- **User Authentication**: NextAuth.js with credentials, Google, and GitHub OAuth
- **Role-Based Access**: Students, Instructors, and Admin roles with RBAC
- **Payment Processing**: Stripe integration with PayPal/Razorpay placeholders
- **Content Security**: DRM-ready PDF handling with dynamic watermarks
- **Progress Tracking**: Student progress monitoring and completion tracking

### 🎨 Premium UI/UX
- **Modern Design**: Clean, elegant interface with TailwindCSS and shadcn/ui
- **Dark Mode**: Full dark/light theme support
- **Responsive**: Mobile-first design with Framer Motion animations
- **Dashboard**: Student and instructor dashboards with analytics
- **Admin Panel**: User management and platform administration

### 🔒 Security & Performance
- **Type Safety**: Full TypeScript implementation
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: S3-compatible storage with presigned URLs
- **Middleware**: Route protection and authentication guards
- **Testing**: Jest and Playwright setup

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Framer Motion, Lucide Icons
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v4
- **Payments**: Stripe, PayPal, Razorpay
- **Storage**: AWS S3 / Compatible
- **Charts**: Recharts
- **Testing**: Jest, Playwright

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- S3-compatible storage (optional)

### 1. Clone & Install
```bash
git clone <repository-url>
cd teachable-app
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Fill in your values:
DATABASE_URL="postgresql://user:password@localhost:5432/teachable"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# S3 Storage (optional)
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_REGION="us-east-1"
S3_BUCKET=""
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

## 📚 Usage

### Default Accounts
After seeding, you can sign in with:

- **Student**: `student@example.com` / `password123`
- **Instructor**: `instructor@example.com` / `password123`
- **Admin**: `admin@example.com` / `password123`

### Key Routes

#### Public
- `/` - Landing page with hero, search, featured courses
- `/courses` - Course catalog with filters
- `/courses/[slug]` - Course detail with preview gating

#### Authenticated
- `/dashboard` - Student dashboard with progress tracking
- `/instructor` - Instructor overview with analytics
- `/instructor/courses/new` - Course creation interface
- `/cart` - Shopping cart and checkout
- `/admin` - Admin panel for user management

#### API Endpoints
- `/api/auth/[...nextauth]` - Authentication
- `/api/cart/add` - Add to cart
- `/api/cart/remove` - Remove from cart
- `/api/checkout/stripe` - Stripe checkout
- `/api/webhooks/stripe` - Payment webhooks
- `/api/lessons/[id]/pdf` - Secured PDF delivery
- `/api/instructor/presign` - S3 upload presigning

## 🎯 Course Structure

```
Course
├── Modules
│   ├── Lessons (Video/PDF/Article)
│   │   ├── Assets (Code, Resources)
│   │   └── Progress Tracking
│   └── Order & Organization
├── Pricing (One-time/Subscription)
├── Free Preview (15-20% content)
└── Instructor Management
```

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run Jest tests
npm run e2e          # Run Playwright tests
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

### Testing
```bash
# Unit tests
npm test

# E2E tests (requires dev server running)
npm run e2e
```

### Database
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection
- Authentication secrets
- Payment provider keys
- Storage credentials

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard layout group
│   ├── admin/             # Admin routes
│   ├── api/               # API endpoints
│   ├── courses/           # Course pages
│   ├── instructor/        # Instructor routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── catalog/          # Course catalog components
│   ├── landing/          # Landing page components
│   ├── checkout/         # Payment components
│   └── admin/            # Admin components
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── generated/            # Generated Prisma client
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with details

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS
