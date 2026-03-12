
<script setup>
const { clear } = useUserSession()
const logout = async () => {
  await clear()
  useRouter().push('/login')
}
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-gray-200 dark:border-zinc-800 p-6 hidden md:block">
      <div class="mb-10 text-2xl font-black uppercase italic tracking-tighter">
        Vantage <span class="text-primary-500">Admin</span>
      </div>
      
      <nav class="space-y-2">
        <UButton
          to="/admin/dashboard"
          variant="ghost"
          color="gray"
          block
          class="justify-start uppercase font-bold text-[11px] tracking-widest"
          icon="i-heroicons-squares-2x2">
          Overview
        </UButton>
        <UButton
          to="/admin/posts"
          variant="ghost"
          color="gray"
          block
          class="justify-start uppercase font-bold text-[11px] tracking-widest"
          icon="i-heroicons-document-text">
          Manage Posts
        </UButton>
        <UButton
          to="/admin/users"
          variant="ghost"
          color="gray"
          block
          class="justify-start uppercase font-bold text-[11px] tracking-widest"
          icon="i-heroicons-users">
          Users
        </UButton>
        <UButton
          to="/admin/pages"
          variant="ghost"
          color="gray"
          block
          class="justify-start uppercase font-bold text-[11px] tracking-widest"
          icon="i-heroicons-document-duplicate">
          Static Pages
        </UButton>
        <UButton
          to="/admin/seo"
          variant="ghost"
          color="gray"
          block
          class="justify-start uppercase font-bold text-[11px] tracking-widest"
          icon="i-heroicons-magnifying-glass">
          SEO Tools
        </UButton>
      </nav>

      <div class="mt-20">
        <UButton color="red" variant="soft" block icon="i-heroicons-arrow-left-on-rectangle" @click="logout">Logout</UButton>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
