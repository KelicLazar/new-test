import type { PostsResponse } from "./../../shared/types/posts";

export const usePostsStore = defineStore("usePostsStore", () => {
  const currentPage = ref(1);
  const postsPerPage = ref(10);
  const search = ref("");
  const skip = computed(() => {
    return currentPage.value * postsPerPage.value - postsPerPage.value;
  });
  const requestUrl = computed(() => {
    return `https://dummyjson.com/posts/search?limit=${postsPerPage.value}&skip=${skip.value}&q=${search.value}`;
  });
  const { data } = useFetch<PostsResponse>(requestUrl);
  const totalPosts = computed(() => {
    return data.value?.total;
  });

  return {
    data,
    totalPosts,
    search,
    currentPage,
    postsPerPage,
  };
});
