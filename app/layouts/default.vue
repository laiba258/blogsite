<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 font-sans">
    <!-- Header: Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-black tracking-tighter uppercase italic">
          Vantage.
        </NuxtLink>

        <!-- Navigation Links (Simple Buttons) -->
        <div class="hidden md:flex items-center gap-6">
          <UButton to="/" variant="ghost" color="gray" label="Home" />
          <UButton to="/categories" variant="ghost" color="gray" label="Trends" />
          <UButton to="/about" variant="ghost" color="gray" label="About" />
          <UButton to="/contact" variant="ghost" color="gray" label="Contact" />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <UColorModeButton />
          <UButton to="/login" label="Login" color="black" variant="solid" class="rounded-full px-6" />
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="container mx-auto px-4 py-10">
      <slot />
    </main>

    <!-- Simple Stylish Footer -->
    <footer class="border-t border-gray-100 py-10 mt-20 text-center">
      <p class="text-sm text-gray-400 italic">© 2026 Vantage Blog. Designed with Love by Laiba.</p>
    </footer>
  </div>
</template>