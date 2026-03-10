<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')
const isVisible = ref(false)
const newsletterRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
    }
  }, { threshold: 0.2 }) // Jab 20% section nazar aaye tab trigger ho

  if (newsletterRef.value) {
    observer.observe(newsletterRef.value)
  }
})

const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribed:', email.value)
    email.value = ''
  }
}
</script>

<template>
  <section 
    ref="newsletterRef"
    class="py-24 border-t border-gray-100 dark:border-zinc-800 mt-20 opacity-0"
    :class="{ 'animate-vantage': isVisible }"
  >
    <div class="max-w-4xl mx-auto px-4 text-center">
      
      <!-- Nuxt UI Badge for Label -->
      <UBadge
        label="Newsletter"
        variant="ghost"
        color="primary"
        class="mb-8 uppercase tracking-[0.4em] font-black text-[10px]"
      />

      <!-- Heading -->
      <h2 class="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-10 uppercase italic text-gray-900 dark:text-white">
        Don't miss the <br /> 
        <span class="text-gray-300 dark:text-zinc-700">next big story.</span>
      </h2>

      <!-- Nuxt UI Form Section -->
      <div class="max-w-xl mx-auto mt-16">
        <form @submit.prevent="handleSubscribe">
          <UFormGroup help="Weekly inspiration. No noise. Pure Vantage.">
            <div class="relative group">
              <!-- Nuxt UI Input with Custom UI override -->
              <UInput
                v-model="email"
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                size="xl"
                variant="none"
                :ui="{
                  base: 'w-full bg-transparent border-b-2 border-gray-200 dark:border-zinc-800 py-6 px-0 text-xl font-bold tracking-tighter text-center  focus:border-primary-500 transition-all rounded-none text-gray-900 dark:text-white',
                  placeholder: 'placeholder-gray-300 dark:placeholder-zinc-800'
                }"
                required
              />
              <br>
              <!-- Nuxt UI Button -->
              <UButton
                type="submit"
                label="Join the circle"
                variant="ghost"
                color="gray"
                trailing-icon="i-heroicons-arrow-right-20-solid"
                class="mt-8 font-black tracking-widest uppercase hover:text-primary-500 group"
                :ui="{ rounded: 'rounded-none' }"
              />
            </div>
          </UFormGroup>
        </form>
      </div>

    </div>
  </section>
</template>

<style scoped>
.animate-vantage {
  animation: slideUpFade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.opacity-0 { opacity: 0; }
</style>