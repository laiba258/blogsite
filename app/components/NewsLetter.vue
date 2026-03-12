<script setup>
/**
 * Newsletter Component
 * Refined minimalist design with balanced typography and subtle interactions.
 */
const email = ref('')
const isVisible = ref(false)
const newsletterRef = ref(null)
const isSubmitting = ref(false)
const toast = useToast()

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
    }
  }, { threshold: 0.1 })

  if (newsletterRef.value) observer.observe(newsletterRef.value)
})

const handleSubscribe = async () => {
  if (!email.value) return
  
  isSubmitting.value = true
  try {
    await $fetch('/api/newsletter', { 
      method: 'POST', 
      body: { email: email.value } 
    })
    
    toast.add({ 
      title: 'Subscribed!', 
      description: 'Welcome to the Vantage community.',
      icon: 'i-heroicons-check-circle',
      color: 'primary' 
    })
    
    email.value = ''
  } catch (error) {
    toast.add({ 
      title: 'Error', 
      description: 'Failed to subscribe. Please try again.',
      icon: 'i-heroicons-x-circle',
      color: 'red' 
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section 
    ref="newsletterRef"
    class="py-24 border-t border-zinc-100 dark:border-zinc-800/50 mt-16 dark:bg-zinc-900 opacity-0 bg-zinc-100 transition-colors duration-700"
    :class="{ 'animate-vantage-fade': isVisible }">
    <div class="max-w-3xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        
        <!-- Left Side: Refined Typography -->
        <div class="max-w-sm space-y-4">
          <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">
            Journal Subscription
          </span>
          <h2 class="text-3xl font-black uppercase italic tracking-tighter leading-tight text-zinc-900 dark:text-zinc-100">
            Insights delivered <br >
            <span class="text-zinc-400 dark:text-zinc-600">to your inbox.</span>
          </h2>
          <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-relaxed">
            Weekly curation of design, <br > technology and culture.
          </p>
        </div>

        <!-- Right Side: Minimalist Form -->
        <div class="w-full md:w-80">
          <form class="relative group" @submit.prevent="handleSubscribe">
            <UInput
              v-model="email"
              type="email"
              placeholder="EMAIL ADDRESS"
              size="md"
              variant="none"
              :ui="{
                base: 'w-full bg-transparent border-b border-zinc-200 dark:border-zinc-400 py-4 px-0 text-sm font-bold tracking-widest text-zinc-900 dark:text-zinc-100 focus:border-primary-500 transition-all duration-300 rounded-none',
                placeholder: 'placeholder-zinc-300 dark:placeholder-zinc-700'
              }"
              required>
              <template #trailing>
                <UButton
                  type="submit"
                  variant="ghost"
                  color="gray"
                  icon="i-heroicons-arrow-right-20-solid"
                  :loading="isSubmitting"
                  class="hover:text-primary-500 p-0 transition-colors duration-300"
                  :ui="{ rounded: 'rounded-none' }" />
              </template>
            </UInput>
            
            <p class="mt-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest opacity-60">
              Zero noise. Unsubscribe anytime.
            </p>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-vantage-fade {
  animation: elegantReveal 1s ease-out forwards;
}

@keyframes elegantReveal {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Remove default focus shadows for a flat look */
:deep(input:focus) {
  box-shadow: none !important;
  outline: none !important;
}
</style>