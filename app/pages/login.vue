<script setup>
const form = reactive({ email: '', password: '' })
const loading = ref(false)
const { fetch: refreshSession } = useUserSession()

async function handleLogin() {
  loading.value = true
  try {
    const response = await $fetch('/api/auth/login', { 
      method: 'POST', 
      body: form 
    })
    
    await refreshSession()
    
    if (response.role === 'admin') {
      useRouter().push('/admin/dashboard')
    } else {
      useRouter().push('/')
    }
  } catch (e) {
    alert(e.data?.message || 'Login failed!')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="py-20 max-w-sm">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-black uppercase italic tracking-tighter">Welcome <span class="text-primary-500">Back</span></h1>
      <p class="text-gray-500 text-sm italic">Enter your credentials to access your account.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <UInput
v-model="form.email"
type="email"
placeholder="Email Address"
size="xl"
color="gray"
variant="outline"
icon="i-heroicons-envelope" />
      <UInput
v-model="form.password"
type="password"
placeholder="Password"
size="xl"
color="gray"
variant="outline"
icon="i-heroicons-lock-closed" />
      
      <UButton
type="submit"
block
size="xl"
color="black"
:loading="loading"
class="uppercase font-black tracking-widest italic shadow-xl">
        Sign In
      </UButton>
    </form>
    
    <p class="mt-6 text-center text-xs text-gray-500 uppercase font-bold tracking-widest">
      Don't have an account? <NuxtLink to="/register" class="text-primary-500">Register</NuxtLink>
    </p>
  </UContainer>
</template>