export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.firstName || !body.email || !body.message) {
    throw createError({ 
      statusCode: 400, 
      message: 'First name, email, and message are required' 
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({ 
      statusCode: 400, 
      message: 'Invalid email address' 
    })
  }

  console.log('Contact Form Submission:', {
    name: `${body.firstName} ${body.lastName}`,
    email: body.email,
    subject: body.subject,
    message: body.message,
    timestamp: new Date().toISOString()
  })

  return {
    success: true,
    message: 'Thank you for reaching out! We will get back to you soon.'
  }
})
