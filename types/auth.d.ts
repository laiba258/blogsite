// Extend the User type from nuxt-auth-utils
declare module 'nuxt-auth-utils' {
  interface User {
    id?: string
    email?: string
    name?: string
    role?: string
  }

  interface UserSession {
    user?: User
  }
}

export {}
