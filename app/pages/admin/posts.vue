<script setup>
definePageMeta({ layout: 'admin' })

const { data: allPosts, refresh } = await useFetch('/api/posts')
const isSaving = ref(false)
const editorRef = ref(null)

const defaultPost = { 
  id: null, title: '', category: 'Tech', description: '', 
  content: '', image: '', readTime: '5 min',
  metaTitle: '', metaDescription: '', keywords: ''
}
const isUploading = ref(false)
const fileInput = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  isUploading.value = true
  try {
    const response = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    editingPost.value.image = response.url
  } catch {
    alert('Upload failed!')
  } finally {
    isUploading.value = false
  }
}

const editingPost = ref({ ...defaultPost })
const showEditor = ref(false)

const categoryOptions = ['Tech', 'Design', 'Tutorial', 'Opinion', 'Lifestyle']

const tabs = [
  { label: '1. Narrative Content', icon: 'i-heroicons-pencil-square', slot: 'content' },
  { label: '2. Search Engine (SEO)', icon: 'i-heroicons-magnifying-glass', slot: 'seo' }
]

const scrollToEditor = () => {
  showEditor.value = true
  setTimeout(() => {
    editorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const openEditor = (post = null) => {
  if (post) {
    editingPost.value = JSON.parse(JSON.stringify(post)) 
  } else {
    editingPost.value = { ...defaultPost }
  }
  scrollToEditor()
}

const savePost = async () => {
  if (!editingPost.value.title || !editingPost.value.content) {
    alert('Headline aur Content likhna zaroori hai!')
    return
  }
  isSaving.value = true
  try {
    await $fetch('/api/admin/posts', { method: 'POST', body: editingPost.value })
    showEditor.value = false
    editingPost.value = { ...defaultPost }
    refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    alert('Error saving post!')
  } finally {
    isSaving.value = false
  }
}

const deletePost = async (id) => {
  if (confirm('Delete this story permanently?')) {
    await $fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>

<template>
  <div class="space-y-12 pb-24 px-4 sm:px-0">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-zinc-800 pb-8 gap-4">
      <div>
        <h2 class="text-5xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
          Manage <span class="text-primary-500">Stories</span>
        </h2>
        <p class="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Editorial Control Center</p>
      </div>
      <UButton 
        icon="i-heroicons-plus-circle" 
        color="primary" 
        size="xl" 
        class="font-black uppercase italic tracking-widest px-8 shadow-lg shadow-primary-500/20"
        @click="openEditor()">
        Create New Story
      </UButton>
    </header>

    <!-- Table Section -->
    <div class="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[640px]">
          <thead class="bg-gray-50 dark:bg-zinc-900/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 dark:border-zinc-800">
            <tr>
              <th class="p-6">Article Information</th>
              <th class="p-6">Taxonomy</th>
              <th class="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-zinc-900">
            <tr v-for="post in allPosts" :key="post.id" class="group transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-900/50">
              <td class="p-6 font-bold text-sm uppercase tracking-tight text-zinc-800 dark:text-zinc-200">{{ post.title }}</td>
              <td class="p-6">
                <UBadge variant="subtle" color="primary" class="font-black uppercase text-[9px] tracking-widest">{{ post.category }}</UBadge>
              </td>
              <td class="p-6 text-right flex justify-end gap-2">
                <UButton icon="i-heroicons-pencil-square" variant="ghost" color="gray" @click="openEditor(post)" />
                <UButton icon="i-heroicons-trash" variant="ghost" color="red" @click="deletePost(post.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- IN-PAGE EDITOR CARD -->
    <div v-if="showEditor" ref="editorRef" class="pt-8 animate-in transition-all duration-500">
      <div class="bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-500/10">
        
        <div class="p-8 border-b border-gray-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black shadow-2xl">
              <UIcon :name="editingPost.id ? 'i-heroicons-pencil-square' : 'i-heroicons-plus-circle'" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="text-2xl font-black uppercase italic tracking-tighter">{{ editingPost.id ? 'Modify Article' : 'Draft New Narrative' }}</h3>
              <p class="text-[9px] font-bold text-primary-500 uppercase tracking-[0.2em]">Live Database Connection Active</p>
            </div>
          </div>
          <UButton color="gray" variant="soft" icon="i-heroicons-x-mark" class="rounded-full h-10 w-10" @click="showEditor = false" />
        </div>

        <div class="p-8">
          <UTabs :items="tabs" class="w-full" :ui="{ list: { background: 'bg-zinc-100 dark:bg-zinc-900', marker: { background: 'bg-white dark:bg-zinc-800 shadow-lg' }, tab: { font: 'font-black uppercase tracking-widest text-[11px]' } } }">
            
            <template #content>
              <div class="space-y-8 pt-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">01. Article Main Headline: </label>
                  <UInput v-model="editingPost.title" placeholder="ENTER TITLE..." size="xl" class="font-bold uppercase italic" />
                </div>

                <!-- Fixed Grid for Dropdown Visibility -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="space-y-2 w-full">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">02. Taxonomy (Category): </label>
                    <USelect v-model="editingPost.category" :options="categoryOptions" size="lg" icon="i-heroicons-tag" class="w-full" />
                  </div>
                  <div class="space-y-2 w-full">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">03. Read Duration: </label>
                    <UInput v-model="editingPost.readTime" placeholder="e.g. 5 MIN" size="lg" icon="i-heroicons-clock" class="w-full" />
                  </div>
                  <div class="space-y-2 w-full">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">04. Cover Image: </label>
                    <div class="flex gap-2">
                      <UInput v-model="editingPost.image" placeholder="HTTPS://..." size="lg" icon="i-heroicons-photo" class="flex-1" />
                      <UButton icon="i-heroicons-cloud-arrow-up" color="primary" @click="fileInput.click()" />
                      <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileUpload" >
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div class="md:col-span-8 space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">05. Teaser Narrative (Summary): </label>
                    <UTextarea v-model="editingPost.description" :rows="3" placeholder="SHORT HOOK..." />
                  </div>
                  <div class="md:col-span-4">
                    <div v-if="editingPost.image" class="rounded-2xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-lg aspect-video bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                      <img :src="editingPost.image" class="w-full h-full object-cover" >
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">06. Main Article Body (Markdown): </label>
                  <UTextarea v-model="editingPost.content" :rows="12" placeholder="START TYPING..." class="font-mono" />
                </div>
              </div>
            </template>

            <template #seo>
              <div class="pt-8 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div class="md:col-span-7 space-y-8">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Google Search Title: </label>
                    <UInput v-model="editingPost.metaTitle" placeholder="MAX 60 CHARS..." size="lg" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Meta Search Description: </label>
                    <UTextarea v-model="editingPost.metaDescription" :rows="4" placeholder="BRIEF SNIPPET..." />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Index Keywords: </label>
                    <UInput v-model="editingPost.keywords" placeholder="KEYWORD1, KEYWORD2..." size="lg" />
                  </div>
                </div>

                <div class="md:col-span-5 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-4xl border border-zinc-100 dark:border-zinc-800 h-fit sticky top-4">
                  <div class="flex items-center gap-3 mb-6 font-black uppercase text-[10px] tracking-widest text-zinc-500">
                    <UIcon name="i-heroicons-globe-alt" class="text-primary-500 w-4 h-4" />
                    SERP Preview (Google)
                  </div>
                  <div class="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-2">
                    <div class="text-[#1a0dab] dark:text-blue-400 text-xl font-medium truncate">{{ editingPost.metaTitle || editingPost.title || 'Page Title' }}</div>
                    <div class="text-[#006621] dark:text-emerald-500 text-sm">vantage.com/stories/{{ editingPost.id || 'new' }}</div>
                    <div class="text-zinc-500 text-xs line-clamp-2">{{ editingPost.metaDescription || 'Add a meta description...' }}</div>
                  </div>
                </div>
              </div>
            </template>
          </UTabs>

          <div class="mt-12 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <UButton variant="ghost" color="gray" class="font-black uppercase tracking-widest text-[10px]" @click="showEditor = false">Discard changes</UButton>
            <UButton color="primary" size="xl" class="px-12 font-black uppercase italic tracking-widest shadow-2xl shadow-primary-500/40" :loading="isSaving" @click="savePost">
              {{ editingPost.id ? 'Commit Update' : 'Publish Article' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>