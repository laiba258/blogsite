<script setup>
const email = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)
const resetLink = ref('')
const toast = useToast()

const handleSubmit = async () => {
  if (!email.value) {
    toast.add({ 
      title: 'Error', 
      description: 'Please enter your email address',
      color: 'red' 
    })
    return
  }

  isSubmitting.value = true
  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })

    submitted.value = true
    
    // Development only - show reset link
    if (response.resetLink) {
      resetLink.value = response.resetLink
    }
  } catch (error) {
    toast.add({ 
      title: 'Error', 
      description: 'Something went wrong. Please try again.',
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
      
      <div v-if="!submitted">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white mb-2">
            Forgot Password?
          </h1>
          <p class="text-gray-500 text-sm">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <UFormGroup label="Email Address">
            <UInput 
              v-model="email" 
              type="email" 
              placeholder="your@email.com" 
              size="lg"
              icon="i-heroicons-envelope"
              required />
          </UFormGroup>

          <UButton 
            type="submit" 
            label="Send Reset Link" 
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

      <div v-else class="text-center space-y-6">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
          <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-500" />
        </div>
        
        <div>
          <h2 class="text-2xl font-black uppercase italic mb-2">Check Your Email</h2>
          <p class="text-gray-500 text-sm">
            If an account exists with {{ email }}, you will receive a password reset link.
          </p>
        </div>

        <!-- Development only - show reset link -->
        <div v-if="resetLink" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p class="text-xs font-bold text-yellow-800 dark:text-yellow-200 mb-2">DEVELOPMENT MODE</p>
          <p class="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
            In production, this link would be sent via email:
          </p>
          <NuxtLink 
            :to="resetLink.replace('http://localhost:3000', '')" 
            class="text-xs text-primary-500 hover:underline break-all">
            {{ resetLink }}
          </NuxtLink>
        </div>

        <UButton 
          to="/login" 
          label="Back to Login" 
          variant="ghost" 
          block />
      </div>

    </div>
  </UContainer>
</template>
