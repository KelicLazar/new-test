<script setup lang="ts">
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
function handleLogin(e: Event) {
  e.preventDefault();

  authStore.login({ name: username.value, password: password.value });
}
</script>

<template>
  <div>
    <form @submit="handleLogin">
      <input
        id="name"
        v-model="username"
        type="text"
      >
      <input
        id="password"
        v-model="password"
        type="password"
      >
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>
