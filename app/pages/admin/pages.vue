<script setup>
definePageMeta({ layout: 'admin' })

const pages = [
  { id: 'about', title: 'About Us', icon: 'i-heroicons-information-circle' },
  { id: 'terms', title: 'Terms of Service', icon: 'i-heroicons-document-text' },
  { id: 'privacy', title: 'Privacy Policy', icon: 'i-heroicons-shield-check' },
  { id: 'contact', title: 'Contact Info', icon: 'i-heroicons-envelope' }
]

const selectedPage = ref(null)
const editingContent = ref({})
const isSaving = ref(false)
const isLoading = ref(false)

const openEditor = async (page) => {
  selectedPage.value = page.id
  isLoading.value = true
  
  try {
    const data = await $fetch(`/api/admin/pages/extract?id=${page.id}`)
    if (data) {
      editingContent.value = data
    }
  } catch (error) {
    console.error('Error loading page:', error)
  } finally {
    isLoading.value = false
  }
}

const savePage = async () => {
  isSaving.value = true
  const toast = useToast()
  
  try {
    await $fetch('/api/admin/pages', { 
      method: 'POST', 
      body: editingContent.value 
    })
    
    toast.add({ 
      title: 'Success!', 
      description: 'Page updated successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green' 
    })
    
    selectedPage.value = null
  } catch (error) {
    toast.add({ 
      title: 'Error', 
      description: 'Failed to save page',
      icon: 'i-heroicons-x-circle',
      color: 'red' 
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-12 pb-24">
    <!-- Header -->
    <header class="border-b border-gray-100 dark:border-zinc-800 pb-8">
      <h2 class="text-5xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
        Edit <span class="text-green-500">Pages</span>
      </h2>
      <p class="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em] mt-2">
        Edit About, Terms, Privacy & Contact Pages 
      </p>
    </header>

    <!-- Pages Grid -->
    <div v-if="!selectedPage" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        v-for="page in pages"
        :key="page.id"
        class="group bg-white dark:bg-zinc-950 border-2 border-gray-200 dark:border-zinc-800 rounded-3xl p-8 hover:border-green-500 transition-all text-left"
        @click="openEditor(page)">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl group-hover:bg-green-500 transition-colors">
            <UIcon :name="page.icon" class="w-8 h-8 text-green-500 group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 class="text-xl font-black uppercase italic tracking-tight">{{ page.title }}</h3>
            <p class="text-xs text-gray-400 uppercase tracking-widest">Click to Edit Content</p>
          </div>
        </div>
        <div class="flex items-center gap-2 text-green-500 text-sm font-bold uppercase tracking-widest">
          <span>Edit Content</span>
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>

    <!-- Editor -->
    <div v-else class="bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div class="p-8 border-b border-gray-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-2xl">
            <UIcon name="i-heroicons-pencil-square" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-2xl font-black uppercase italic tracking-tighter">Edit {{ editingContent.title }}</h3>
            <p class="text-[9px] font-bold text-green-500 uppercase tracking-[0.2em]">Simple Form Editor</p>
          </div>
        </div>
        <UButton 
          color="gray" 
          variant="soft" 
          icon="i-heroicons-x-mark" 
          class="rounded-full h-10 w-10" 
          @click="selectedPage = null" />
      </div>

      <div v-if="isLoading" class="p-20 text-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
        <p class="text-gray-400 text-sm">Loading page content...</p>
      </div>

      <div v-else class="p-8 space-y-8">
        
        <!-- About Page Fields -->
        <div v-if="selectedPage === 'about'" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Main Heading:</label>
            <UInput v-model="editingContent.heading" size="xl" class="font-bold" placeholder="We are the lens..." />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Introduction Text:</label>
            <UTextarea v-model="editingContent.description" :rows="3" placeholder="Vantage is an independent..." />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 1 Title:</label>
                <UInput v-model="editingContent.section1Title" placeholder="The Vision" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 1 Content:</label>
                <UTextarea v-model="editingContent.section1Content" :rows="4" />
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 2 Title:</label>
                <UInput v-model="editingContent.section2Title" placeholder="The Process" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 2 Content:</label>
                <UTextarea v-model="editingContent.section2Content" :rows="4" />
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 3 Title:</label>
                <UInput v-model="editingContent.section3Title" placeholder="The Impact" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 3 Content:</label>
                <UTextarea v-model="editingContent.section3Content" :rows="4" />
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Page Fields -->
        <div v-if="selectedPage === 'contact'" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Main Heading:</label>
            <UInput v-model="editingContent.heading" size="xl" class="font-bold" placeholder="Let's build the future..." />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Description:</label>
            <UTextarea v-model="editingContent.description" :rows="3" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Email Address:</label>
              <UInput v-model="editingContent.email" type="email" icon="i-heroicons-envelope" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Office Location:</label>
              <UInput v-model="editingContent.office" icon="i-heroicons-map-pin" />
            </div>
          </div>
        </div>

        <!-- Terms Page Fields -->
        <div v-if="selectedPage === 'terms'" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Page Heading:</label>
            <UInput v-model="editingContent.heading" size="xl" class="font-bold" />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Last Updated:</label>
            <UInput v-model="editingContent.lastUpdated" placeholder="March 12, 2026" />
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 1 Title:</label>
              <UInput v-model="editingContent.section1Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 1 Content:</label>
              <UTextarea v-model="editingContent.section1Content" :rows="3" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 2 Title:</label>
              <UInput v-model="editingContent.section2Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 2 Content:</label>
              <UTextarea v-model="editingContent.section2Content" :rows="3" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 3 Title:</label>
              <UInput v-model="editingContent.section3Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 3 Content:</label>
              <UTextarea v-model="editingContent.section3Content" :rows="3" />
            </div>
          </div>
        </div>

        <!-- Privacy Page Fields -->
        <div v-if="selectedPage === 'privacy'" class="space-y-8">
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Page Heading:</label>
            <UInput v-model="editingContent.heading" size="xl" class="font-bold" />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Last Updated:</label>
            <UInput v-model="editingContent.lastUpdated" placeholder="March 12, 2026" />
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 1 Title:</label>
              <UInput v-model="editingContent.section1Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 1 Content:</label>
              <UTextarea v-model="editingContent.section1Content" :rows="3" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 2 Title:</label>
              <UInput v-model="editingContent.section2Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 2 Content:</label>
              <UTextarea v-model="editingContent.section2Content" :rows="3" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-1">Section 3 Title:</label>
              <UInput v-model="editingContent.section3Title" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Section 3 Content:</label>
              <UTextarea v-model="editingContent.section3Content" :rows="3" />
            </div>
          </div>
        </div>

        <!-- SEO Section (All Pages) -->
        <div class="border-t border-zinc-100 dark:border-zinc-900 pt-8 mt-8">
          <h4 class="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6">SEO Settings</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">SEO Title:</label>
              <UInput v-model="editingContent.metaTitle" placeholder="Page title for search engines" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">SEO Description:</label>
              <UInput v-model="editingContent.metaDescription" placeholder="Brief description..." />
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-8">
          <UButton 
            variant="ghost" 
            color="gray" 
            class="font-black uppercase tracking-widest text-[10px]" 
            @click="selectedPage = null">
            Cancel
          </UButton>
          <UButton 
            color="green" 
            size="xl" 
            class="px-12 font-black uppercase italic tracking-widest shadow-2xl shadow-green-500/40" 
            :loading="isSaving"
            @click="savePage">
            Save Changes
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
