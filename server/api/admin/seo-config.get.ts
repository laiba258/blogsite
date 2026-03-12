export default defineEventHandler(async (event) => {
  // Admin authentication check
  const session = await getUserSession(event)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((session.user as any)?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Unauthorized' })
  }

  return {
    siteName: 'VANTAGE',
    siteTagline: 'MODERN NARRATIVES',
    description: 'A premium space for modern stories and tech insights.',
    keywords: 'blog, nuxt, tech, design, stories',
    ogImage: '',
    twitterHandle: '@vantage'
  }
})
