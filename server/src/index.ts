import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { requireAuth } from './middleware/auth.js'
import 'dotenv/config'
import { db } from './db/index.js'
import { users } from './db/schema.js'


const app = new Hono()

app.use('/*', cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'resumeSpace API running' })
})

app.get('/me', requireAuth, (c) => {
  const userId = c.get('userId')
  return c.json({ clerkId: userId })
})

app.get('/ping-db', async (c) => {
  try {
    const result = await db.select().from(users).limit(1)
    return c.json({ db: 'connected', rows: result.length })
  } catch (e) {
    return c.json({ db: 'failed', error: String(e) }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`resumeSpace server running on http://localhost:${info.port}`)
})


