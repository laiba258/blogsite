import { createClient } from '@libsql/client'
import 'dotenv/config'

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
})

async function setupStaticPages() {
  console.log('🚀 Setting up static_pages table...\n')

  try {
    // Create table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS static_pages (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        meta_title TEXT,
        meta_desc TEXT,
        updated_at TEXT NOT NULL
      )
    `)
    console.log('✅ Table created successfully\n')

    // Insert default pages
    const defaultPages = [
      {
        id: 'about',
        title: 'About Us',
        content: `# About Vantage

Vantage is an independent digital publication dedicated to minimalist design, emerging technologies, and the creative minds shaping our future.

## Our Vision
We bridge the gap between complex technology and human-centric aesthetics.

## Our Mission
To inspire creators to build a more beautiful, functional, and minimal web.`,
        metaTitle: 'About Us - Vantage',
        metaDescription: 'Learn more about Vantage and our mission'
      },
      {
        id: 'terms',
        title: 'Terms of Service',
        content: `# Terms of Service

Last updated: March 12, 2026

## 1. Acceptance of Terms
By accessing and using Vantage, you accept and agree to be bound by these Terms of Service.

## 2. Use License
Permission is granted to temporarily access the materials on Vantage for personal, non-commercial use only.

## 3. Disclaimer
The materials on Vantage are provided on an 'as is' basis. Vantage makes no warranties, expressed or implied.`,
        metaTitle: 'Terms of Service - Vantage',
        metaDescription: 'Terms and conditions for using Vantage'
      },
      {
        id: 'privacy',
        title: 'Privacy Policy',
        content: `# Privacy Policy

Last updated: March 12, 2026

## Information We Collect
We collect information you provide directly to us, such as when you create an account or subscribe to our newsletter.

## How We Use Your Information
- To provide and maintain our services
- To notify you about changes to our services
- To provide customer support

## Data Security
We implement appropriate security measures to protect your personal information.`,
        metaTitle: 'Privacy Policy - Vantage',
        metaDescription: 'How we handle and protect your data'
      },
      {
        id: 'contact',
        title: 'Contact Information',
        content: `# Contact Us

## Get in Touch
We'd love to hear from you! Whether you have questions, feedback, or collaboration ideas.

**Email:** hello@vantage.studio
**Location:** Vantage Studio, Pakistan

## Business Inquiries
For partnership and collaboration opportunities, please reach out via email.`,
        metaTitle: 'Contact Us - Vantage',
        metaDescription: 'Get in touch with the Vantage team'
      }
    ]

    for (const page of defaultPages) {
      await db.execute({
        sql: `INSERT OR REPLACE INTO static_pages (id, title, content, meta_title, meta_desc, updated_at) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          page.id,
          page.title,
          page.content,
          page.metaTitle,
          page.metaDescription,
          new Date().toISOString()
        ]
      })
      console.log(`✅ Inserted: ${page.title}`)
    }

    console.log('\n🎉 Static pages setup complete!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

setupStaticPages()
