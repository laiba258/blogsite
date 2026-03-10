import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const file = files[0] 
  const filename = `${Date.now()}-${file.filename}`
  const path = join(process.cwd(), 'public/uploads', filename)

  await mkdir(join(process.cwd(), 'public/uploads'), { recursive: true })
  
  await writeFile(path, file.data)

  return {
    url: `/uploads/${filename}`
  }
})