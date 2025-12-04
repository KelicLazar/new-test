<script setup>
const authStore = useAuthStore();
</script>

<template>
  <main>
    <div class="navigation">
      <span>User: {{ authStore.user }} is logged in: {{ authStore.isLoggedIn }}</span>
      <nuxt-link to="login">
        Login
      </nuxt-link>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </div>
    <slot />
  </main>
</template>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
main {
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* align-items: center; */
  justify-content: center;
}
</style>
