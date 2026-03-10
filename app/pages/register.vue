<script setup>
const form = reactive({ name: '', email: '', password: '' })
const loading = ref(false)

async function handleRegister() {
  loading.value = true
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: form })
    useRouter().push('/login')
  } catch (e) {
    alert(e.data?.message || 'Error occurred')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="py-20 max-w-sm">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-black uppercase italic italic tracking-tighter">Join <span class="text-primary-500">Vantage</span></h1>
      <p class="text-gray-500 text-sm italic">Create your account to start reading.</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <UInput v-model="form.name" placeholder="Full Name" size="xl" color="gray" variant="outline" />
      <UInput v-model="form.email" type="email" placeholder="Email Address" size="xl" color="gray" variant="outline" />
      <UInput v-model="form.password" type="password" placeholder="Password" size="xl" color="gray" variant="outline" />
      
      <UButton type="submit" block size="xl" color="black" :loading="loading" class="uppercase font-black tracking-widest italic">
        Create Account
      </UButton>
    </form>
    
    <p class="mt-6 text-center text-xs text-gray-500 uppercase font-bold tracking-widest">
      Already have an account? <NuxtLink to="/login" class="text-primary-500">Login</NuxtLink>
    </p>
  </UContainer>
</template>