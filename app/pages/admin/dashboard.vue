<script setup>
definePageMeta({ 
  layout: 'admin',
  middleware: 'admin'
})

const { data: stats } = await useFetch('/api/admin/stats')

const quickLinks = [
  { title: 'Create Post', icon: 'i-heroicons-document-plus', to: '/admin/posts', color: 'primary' },
  { title: 'Manage Users', icon: 'i-heroicons-users', to: '/admin/users', color: 'orange' },
  { title: 'Edit Pages', icon: 'i-heroicons-document-duplicate', to: '/admin/pages', color: 'green' },
  { title: 'SEO Settings', icon: 'i-heroicons-magnifying-glass', to: '/admin/seo', color: 'blue' }
]
</script>

<template>
  <div class="space-y-10">
    <!-- Welcome Header -->
    <header>
      <h1 class="text-4xl font-black uppercase italic tracking-tighter">
        Admin <span class="text-primary-500">Overview</span>
      </h1>
      <p class="text-gray-500 italic font-medium">Welcome back, Chief. Here's what's happening with Vantage.</p>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="border-b-4 border-b-primary-500 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-primary-500" />
          </div>
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Stories</p>
            <h3 class="text-3xl font-black italic">{{ stats?.totalPosts || 0 }}</h3>
          </div>
        </div>
      </UCard>

      <UCard class="border-b-4 border-b-orange-500 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <UIcon name="i-heroicons-users" class="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Community Members</p>
            <h3 class="text-3xl font-black italic">{{ stats?.totalUsers || 0 }}</h3>
          </div>
        </div>
      </UCard>

      <UCard class="border-b-4 border-b-blue-500 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <UIcon name="i-heroicons-clock" class="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status</p>
            <h3 class="text-xl font-black italic text-green-500 uppercase">Operational</h3>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <section>
      <h2 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Quick Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton
          v-for="link in quickLinks"
          :key="link.title"
          :to="link.to"
          :icon="link.icon"
          size="xl"
          :color="link.color"
          variant="soft"
          class="flex-col gap-3 py-8 rounded-3xl font-black uppercase italic tracking-tighter">
          {{ link.title }}
        </UButton>
      </div>
    </section>

    <!-- Recent Activity Placeholder -->
    <section class="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">
      <h3 class="font-black uppercase italic mb-4">Latest System Updates</h3>
      <ul class="space-y-4">
        <li class="flex items-center gap-3 text-sm text-gray-500 italic">
          <span class="w-2 h-2 bg-green-500 rounded-full"/>
          Database Migration Successful (SQLite)
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-500 italic">
          <span class="w-2 h-2 bg-blue-500 rounded-full"/>
          Drizzle ORM Connected
        </li>
      </ul>
    </section>
  </div>
</template>