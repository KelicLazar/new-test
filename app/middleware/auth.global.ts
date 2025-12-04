import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (authStore.isLoggedIn && to.path === "/login") {
    return navigateTo("/");
  }
});
