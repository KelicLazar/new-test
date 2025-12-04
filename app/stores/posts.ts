import type { PostsResponse } from "./../../shared/types/posts";

export const usePostsStore = defineStore("usePostsStore", () => {
  const currentPage = ref(1);
  const postsPerPage = ref(10);
  const search = ref("");
  const selectedTag = ref<string>("");
  const skip = computed(() => {
    return currentPage.value * postsPerPage.value - postsPerPage.value;
  });
  const requestUrl = computed(() => {
    return `https://dummyjson.com/posts/search?limit=${postsPerPage.value}&skip=${skip.value}&q=${search.value}`;
  });
  const { data, status, error } = useFetch<PostsResponse>(requestUrl);
  const totalPosts = computed(() => {
    return data.value?.total;
  });

  watch(
    () => search.value,
    (newSearch, oldSearch) => {
      if (newSearch !== oldSearch) {
        currentPage.value = 1;
      }
    },
  );

  return {
    data,
    totalPosts,
    selectedTag,
    search,
    currentPage,
    postsPerPage,
    status,
    error,
  };
});
