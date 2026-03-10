<script setup>
definePageMeta({ layout: 'admin' })

const { data: usersList, refresh } = await useFetch('/api/admin/users')

async function updateRole(userId, currentRole) {
  const newRole = currentRole === 'admin' ? 'user' : 'admin'
  
  if (confirm(`Are you sure to change user to ${newRole}?`)) {
    await $fetch('/api/admin/users/role', {
      method: 'POST',
      body: { userId, newRole }
    })
    refresh() // List update karo
  }
}
</script>

<template>
  <div class="space-y-8">
    <header>
      <h2 class="text-3xl font-black uppercase italic tracking-tighter">
        Community <span class="text-primary-500">Management</span>
      </h2>
      <p class="text-gray-500 italic text-sm">Control who has access to the Vantage cockpit.</p>
    </header>

    <div class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <tr>
            <th class="p-5">Member</th>
            <th class="p-5">Email</th>
            <th class="p-5">Role</th>
            <th class="p-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50 dark:divide-zinc-800">
          <tr v-for="user in usersList" :key="user.id" class="group transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
            <td class="p-5">
              <div class="flex items-center gap-3">
                <UAvatar :alt="user.name" size="sm" class="font-black" />
                <span class="font-bold text-sm uppercase italic tracking-tight">{{ user.name }}</span>
              </div>
            </td>
            <td class="p-5 text-sm text-gray-500 font-medium italic">{{ user.email }}</td>
            <td class="p-5">
              <UBadge 
                :color="user.role === 'admin' ? 'primary' : 'gray'" 
                variant="soft" 
                class="uppercase font-black text-[9px] px-2"
              >
                {{ user.role }}
              </UBadge>
            </td>
            <td class="p-5 text-right">
              <UButton 
                @click="updateRole(user.id, user.role)"
                variant="ghost" 
                color="gray"
                class="text-[10px] font-black uppercase tracking-widest hover:text-primary-500"
              >
                Change Role
              </UButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>