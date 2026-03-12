<script setup>
const route = useRoute()
const router = useRouter()

const token = ref(String(route.query.token || ''))
const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const toast = useToast()

if (!token.value) {
  router.push('/login')
}

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    toast.add({ 
      title: 'Error', 
      description: 'Passwords do not match',
      color: 'red' 
    })
    return
  }

  if (password.value.length < 6) {
    toast.add({ 
      title: 'Error', 
      description: 'Password must be at least 6 characters',
      color: 'red' 
    })
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { 
        token: token.value,
        password: password.value 
      }
    })

    toast.add({ 
      title: 'Success!', 
      description: 'Password reset successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green' 
    })

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    toast.add({ 
      title: 'Error', 
      description: error.data?.message || 'Failed to reset password',
      color: 'red' 
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UContainer class="py-24 max-w-md">
    <div class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-10 shadow-sm">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white mb-2">
          Reset Password
        </h1>
        <p class="text-gray-500 text-sm">
          Enter your new password below
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <UFormGroup label="New Password">
          <UInput 
            v-model="password" 
            type="password" 
            placeholder="Enter new password" 
            size="lg"
            icon="i-heroicons-lock-closed"
            required />
        </UFormGroup>

        <UFormGroup label="Confirm Password">
          <UInput 
            v-model="confirmPassword" 
            type="password" 
            placeholder="Confirm new password" 
            size="lg"
            icon="i-heroicons-lock-closed"
            required />
        </UFormGroup>

        <UButton 
          type="submit" 
          label="Reset Password" 
          size="xl" 
          block 
          :loading="isSubmitting"
          class="rounded-xl font-black uppercase tracking-widest" />

        <div class="text-center pt-4">
          <NuxtLink 
            to="/login" 
            class="text-sm text-gray-500 hover:text-primary-500 transition-colors">
            Back to Login
          </NuxtLink>
        </div>
      </form>

    </div>
  </UContainer>
</template>
