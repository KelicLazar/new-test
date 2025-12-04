function toTrimAndLowerCase(value: string) {
  return value.trim().toLowerCase();
}

export const useAuthStore = defineStore("useAuthStore", () => {
  const user = ref<string | null>(null);
  const isLoggedIn = ref(false);

  function login(userData: { name: string; password: string }) {
    console.log(userData);
    if (toTrimAndLowerCase(userData.name) === "test" && toTrimAndLowerCase(userData.password) === "test123") {
      user.value = userData.name;
      isLoggedIn.value = true;
      navigateTo("/");
    }
  }
  function logout() {
    user.value = null;
    isLoggedIn.value = false;
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
});
