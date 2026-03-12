
<script setup>
const formData = ref({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' })
const isSubmitting = ref(false)
const toast = useToast()

const submitForm = async () => {
  isSubmitting.value = true
  try {
    await $fetch('/api/contact', { 
      method: 'POST', 
      body: formData.value 
    })
    
    toast.add({ 
      title: 'Message Sent!', 
      description: 'We will get back to you soon.',
      icon: 'i-heroicons-check-circle',
      color: 'primary' 
    })
    
    // Reset form
    formData.value = { firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' }
  } catch (error) {
    toast.add({ 
      title: 'Error', 
      description: 'Failed to send message. Please try again.',
      icon: 'i-heroicons-x-circle',
      color: 'red' 
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <UContainer class="py-24 max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
      
      <!-- Left Side: Professional Info -->
      <div class="md:col-span-5 space-y-8 animate-vantage">
        <div>
          <!-- Heading made Bold & Black -->
          <h1 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase italic">
            Let's build the <span class="text-primary-500">future</span> together.
          </h1>
          <p class="text-gray-500 leading-relaxed text-lg font-medium">
            We value your inquiries and feedback. Reach out to us through the form below or via our direct contact channels.
          </p>
        </div>

        <div class="space-y-4 pt-8 border-t border-gray-100 dark:border-zinc-800">
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Us</span>
            <a href="mailto:hello@vantage.studio" class="text-lg font-bold hover:text-primary-500 transition-colors">hello@vantage.studio</a>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Office</span>
            <p class="text-lg font-bold">Vantage Studio, PK.</p>
          </div>
        </div>
      </div>

      <!-- Right Side: Professional Form -->
      <div class="md:col-span-7 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-10 rounded-3xl shadow-sm animate-vantage delay-1">
        <form class="grid grid-cols-1 sm:grid-cols-2 gap-6" @submit.prevent="submitForm">
          <UFormGroup label="First Name" class="sm:col-span-1">
            <UInput v-model="formData.firstName" placeholder="Laiba" size="lg" />
          </UFormGroup>

          <UFormGroup label="Last Name" class="sm:col-span-1">
            <UInput v-model="formData.lastName" placeholder="Naseer" size="lg" />
          </UFormGroup>

          <UFormGroup label="Email Address" class="sm:col-span-2">
            <UInput v-model="formData.email" type="email" placeholder="laiba@vantage.studio" size="lg" />
          </UFormGroup>

          <UFormGroup label="Subject" class="sm:col-span-2">
            <USelect v-model="formData.subject" :options="['General Inquiry', 'Project Collaboration', 'Feedback']" size="lg" />
          </UFormGroup>

          <UFormGroup label="Message" class="sm:col-span-2">
            <UTextarea v-model="formData.message" placeholder="Write your message here..." :rows="5" />
          </UFormGroup>

          <div class="sm:col-span-2 pt-4">
            <UButton 
              type="submit" 
              label="Send Message" 
              size="xl" 
              block 
              :loading="isSubmitting"
              class="rounded-xl font-black uppercase tracking-widest shadow-md transition-transform hover:scale-[1.01]" />
          </div>
        </form>
      </div>

    </div>
  </UContainer>
</template>

