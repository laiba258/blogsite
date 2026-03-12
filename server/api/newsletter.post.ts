export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.email) {
    throw createError({ 
      statusCode: 400, 
      message: 'Email is required' 
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({ 
      statusCode: 400, 
      message: 'Invalid email address' 
    })
  }

  console.log('Newsletter Subscription:', {
    email: body.email,
    timestamp: new Date().toISOString()
  })

  return {
    success: true,
    message: 'Successfully subscribed to newsletter!'
  }
})
