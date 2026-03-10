<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 font-sans">
    <!-- Header: Navigation Bar -->
   <AppHeader />

    <!-- Page Content -->
    <main class="container mx-auto px-4 py-10">
      <slot />
    </main>
    <Footer />
</div>
</template>