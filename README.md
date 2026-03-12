# Vantage - Modern Blog Platform

A professional, production-ready blog platform built with Nuxt 3, featuring a complete CMS, admin dashboard, and modern UI/UX design.

## ✨ Features

### Content Management
- **Full-Featured CMS** - Create, edit, and delete blog posts
- **Rich Text Editor** - Easy-to-use content creation
- **Image Upload** - Built-in image management
- **Category System** - Organize posts by categories
- **SEO Optimization** - Meta tags, descriptions, and keywords
- **Static Pages Editor** - Manage About, Terms, Privacy, Contact pages

### Admin Dashboard
- **Analytics Overview** - Track posts and users
- **User Management** - Manage accounts and roles
- **Role-Based Access** - Admin and user permissions
- **SEO Tools** - Global SEO configuration
- **Responsive Design** - Works on all devices

### User Experience
- **Dark Mode** - Automatic theme switching
- **Mobile Responsive** - Perfect on all screen sizes
- **Fast Performance** - Optimized for speed
- **Reading Progress** - Visual progress indicator
- **Newsletter Subscription** - Built-in email collection
- **Contact Form** - Direct communication channel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Turso account (for database)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd blogsite
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
DATABASE_URL=your_turso_database_url
DATABASE_AUTH_TOKEN=your_turso_auth_token
NUXT_SESSION_PASSWORD=your_32_character_secret_key
```

4. **Setup database**
```bash
# Create tables
node create-tables.mjs

# Seed sample data
npm run seed

# Setup static pages
node scripts/setup-static-pages.mjs
```

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📦 Database Schema

### Tables
- **posts** - Blog posts with SEO fields
- **users** - User accounts with roles
- **static_pages** - Editable static content

## 🎨 Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Nuxt UI (Tailwind CSS)
- **Database**: Turso (LibSQL)
- **ORM**: Drizzle ORM
- **Authentication**: nuxt-auth-utils
- **Deployment**: Vercel

## 📝 Usage

### Creating Your First Post

1. Register at `/register`
2. Login at `/login`
3. Navigate to `/admin/dashboard`
4. Click "Create Post"
5. Fill in the details and publish

### Managing Static Pages

1. Go to `/admin/pages`
2. Select the page to edit
3. Update content in simple form fields
4. Save changes

## 🚢 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Framework will be auto-detected

3. **Add Environment Variables**
In Vercel dashboard, add:
- `DATABASE_URL`
- `DATABASE_AUTH_TOKEN`
- `NUXT_SESSION_PASSWORD`

4. **Deploy**
Click "Deploy" and wait for build to complete

## 📚 Documentation

For detailed setup and deployment instructions, see [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)

## 🔒 Security

- Passwords are hashed with bcrypt
- Session-based authentication
- Admin-only protected routes
- Input validation on all forms
- SQL injection protection via ORM

## 🎯 Project Structure

```
blogsite/
├── app/
│   ├── components/     # Reusable Vue components
│   ├── layouts/        # Layout templates
│   ├── pages/          # Route pages
│   └── public/         # Static assets
├── server/
│   ├── api/            # API endpoints
│   ├── database/       # Database schema
│   └── utils/          # Server utilities
├── scripts/            # Setup scripts
└── types/              # TypeScript definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com/)
- UI components from [Nuxt UI](https://ui.nuxt.com/)
- Database powered by [Turso](https://turso.tech/)
- Icons from [Heroicons](https://heroicons.com/)

## 📧 Support

For support, email hello@vantage.studio or open an issue on GitHub.

---

**Made with ❤️ using Nuxt 3**
