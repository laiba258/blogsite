// Extract current content from actual Vue pages
export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const pageId = query.id

  // Default content extracted from actual pages
  const pageContent = {
    about: {
      id: 'about',
      title: 'About Us',
      heading: 'We are the lens through which the Modern World is seen.',
      subheading: 'Our Identity',
      description: 'Vantage is an independent digital publication dedicated to minimalist design, emerging technologies, and the creative minds shaping our future.',
      section1Title: 'The Vision',
      section1Content: 'Vantage was born from the idea that digital platforms should be as carefully crafted as a physical gallery. We bridge the gap between complex technology and human-centric aesthetics.',
      section2Title: 'The Process',
      section2Content: 'Our editorial team meticulously selects stories that matter. We focus on the "why" behind the "what," ensuring every piece of content provides a fresh perspective.',
      section3Title: 'The Impact',
      section3Content: 'Beyond aesthetics, we aim to build a community of forward-thinkers. Our goal is to inspire creators to build a more beautiful, functional, and minimal web.',
      metaTitle: 'About Us - Vantage',
      metaDescription: 'Learn more about Vantage and our mission'
    },
    contact: {
      id: 'contact',
      title: 'Contact Us',
      heading: "Let's build the future together.",
      description: 'We value your inquiries and feedback. Reach out to us through the form below or via our direct contact channels.',
      email: 'hello@vantage.studio',
      office: 'Vantage Studio, PK.',
      metaTitle: 'Contact Us - Vantage',
      metaDescription: 'Get in touch with the Vantage team'
    },
    terms: {
      id: 'terms',
      title: 'Terms of Service',
      heading: 'Terms of Service',
      lastUpdated: 'March 12, 2026',
      section1Title: '1. Acceptance of Terms',
      section1Content: 'By accessing and using Vantage, you accept and agree to be bound by these Terms of Service.',
      section2Title: '2. Use License',
      section2Content: 'Permission is granted to temporarily access the materials on Vantage for personal, non-commercial use only.',
      section3Title: '3. Disclaimer',
      section3Content: 'The materials on Vantage are provided on an \'as is\' basis. Vantage makes no warranties, expressed or implied.',
      metaTitle: 'Terms of Service - Vantage',
      metaDescription: 'Terms and conditions for using Vantage'
    },
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      heading: 'Privacy Policy',
      lastUpdated: 'March 12, 2026',
      section1Title: 'Information We Collect',
      section1Content: 'We collect information you provide directly to us, such as when you create an account or subscribe to our newsletter.',
      section2Title: 'How We Use Your Information',
      section2Content: 'To provide and maintain our services, notify you about changes, and provide customer support.',
      section3Title: 'Data Security',
      section3Content: 'We implement appropriate security measures to protect your personal information.',
      metaTitle: 'Privacy Policy - Vantage',
      metaDescription: 'How we handle and protect your data'
    }
  }

  return pageContent[pageId as string] || null
})
