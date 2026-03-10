<script setup>
definePageMeta({ layout: 'admin' })

const { data: allPosts, refresh } = await useFetch('/api/posts')
const isModalOpen = ref(false)

// SEO Fields added to the ref
const editingPost = ref({ 
  title: '', 
  category: 'Tech', 
  description: '', 
  content: '', 
  image: '', 
  readTime: '5 min',
  metaTitle: '',
  metaDescription: '',
  keywords: ''
})

const openEditor = (post = null) => {
  editingPost.value = post || { 
    title: '', category: 'Tech', description: '', content: '', image: '', readTime: '5 min',
    metaTitle: '', metaDescription: '', keywords: '' 
  }
  isModalOpen.value = true
}

const savePost = async () => {
  await $fetch('/api/admin/posts', { method: 'POST', body: editingPost.value })
  isModalOpen.value = false
  refresh()
}

const deletePost = async (id) => {
  if (confirm('Are you sure?')) {
    await $fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>

<template>
  <div class="space-y-8">
    <header class="flex justify-between items-center">
      <h2 class="text-3xl font-black uppercase italic tracking-tighter">Manage <span class="text-primary-500">Stories</span></h2>
      <UButton icon="i-heroicons-plus" color="black" size="lg" @click="openEditor()">New Post</UButton>
    </header>

    <!-- Posts Table -->
    <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <tr>
            <th class="p-4">Title</th>
            <th class="p-4">Category</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-zinc-800">
          <tr v-for="post in allPosts" :key="post.id" class="group hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
            <td class="p-4 font-bold text-sm uppercase italic">{{ post.title }}</td>
            <td class="p-4"><UBadge size="xs" variant="soft">{{ post.category }}</UBadge></td>
            <td class="p-4 space-x-2">
              <UButton icon="i-heroicons-pencil-square" variant="ghost" color="gray" @click="openEditor(post)" />
              <UButton icon="i-heroicons-trash" variant="ghost" color="red" @click="deletePost(post.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Editor Modal -->
    <UModal v-model="isModalOpen" prevent-close>
      <UCard class="p-4 overflow-y-auto max-h-[90vh]">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-black uppercase italic">Edit Story</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
          </div>
        </template>
        
        <div class="space-y-4">
          <UFormGroup label="Title"><UInput v-model="editingPost.title" /></UFormGroup>
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Category">
               <USelect v-model="editingPost.category" :options="['Tech', 'Design', 'Tutorial', 'Opinion']" />
            </UFormGroup>
            <UFormGroup label="Read Time"><UInput v-model="editingPost.readTime" /></UFormGroup>
          </div>
          <UFormGroup label="Image URL"><UInput v-model="editingPost.image" /></UFormGroup>
          <UFormGroup label="Description"><UTextarea v-model="editingPost.description" /></UFormGroup>
          <UFormGroup label="Content (Markdown/Text)"><UTextarea v-model="editingPost.content" :rows="8" /></UFormGroup>

          <!-- SEO SECTION -->
          <div class="mt-8 border-t pt-6 border-gray-100 dark:border-zinc-800">
            <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-4">SEO Engine (Google Preview)</h4>
            <div class="space-y-4 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
              <UFormGroup label="SEO Meta Title"><UInput v-model="editingPost.metaTitle" placeholder="Google search title..." /></UFormGroup>
              <UFormGroup label="SEO Meta Description"><UTextarea v-model="editingPost.metaDescription" placeholder="Search summary..." /></UFormGroup>
              <UFormGroup label="Keywords"><UInput v-model="editingPost.keywords" placeholder="e.g. tech, nuxt, tutorial" /></UFormGroup>
            </div>
          </div>
        </div>

        <template #footer>
          <UButton block color="primary" size="lg" class="font-black uppercase italic" @click="savePost">Save Changes</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>