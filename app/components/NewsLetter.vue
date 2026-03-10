<template>
  <section class="my-20 animate-vantage opacity-0" style="animation-delay: 1s;">
    <!-- Dark Minimal Container -->
    <div class="bg-gray-700 dark:bg-slate-200 rounded-4xl p-10 md:p-20 text-center relative overflow-hidden group">
      
      <!-- Content -->
      <div class="relative z-10 max-w-2xl mx-auto">
        <UBadge 
          label="Stay in the loop" 
          variant="outline" 
          color="white" 
          class="rounded-full mb-6 px-4 py-1 text-[10px] tracking-[0.2em] font-bold border-white/20 dark:border-black/20 text-white dark:text-black"
        />
        
        <h2 class="text-4xl md:text-5xl font-black tracking-tighter text-white dark:text-black mb-6 leading-tight uppercase italic">
          Get the latest <span class="text-primary-400">stories</span> delivered.
        </h2>
        
        <p class="text-zinc-400 dark:text-zinc-500 text-lg mb-10 font-medium">
          No spam, just pure design and tech inspiration once a week.
        </p>

        <!-- Minimal Input Field -->
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <UInput
            v-model="email"
            placeholder="yourname@email.com"
            size="xl"
            icon="i-heroicons-envelope"
            class="flex-1"
            :ui="{ 
              rounded: 'rounded-full',
              base: 'bg-zinc-900 dark:bg-zinc-100 border-none text-white dark:text-black focus:ring-2 focus:ring-primary-500',
              padding: { xl: 'px-6 py-4' }
            }"
          />
          <UButton
            type="submit"
            label="Subscribe"
            size="xl"
            color="white"
            variant="solid"
            class="rounded-full px-8 font-bold hover:scale-105 transition-all text-black dark:text-white dark:bg-black"
          />
        </form>
      </div>

      <!-- Background Aesthetic (Glow) -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full group-hover:bg-primary-500/30 transition-all duration-700"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-800 blur-[80px] rounded-full opacity-50"></div>
    </div>
  </section>
</template>

<script setup>
const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    alert(`Thank You! ${email.value} has been added. (Mock)`)
    email.value = ''
  }
}
</script>

<style scoped>
.animate-vantage {
  animation: slideUpFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.opacity-0 { opacity: 0; }
</style>