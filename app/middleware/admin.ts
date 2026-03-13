export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()

  // Check if user is logged in
  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  // Check if user is admin
  if (user.value?.role !== 'admin') {
    return navigateTo('/')
  }
})
