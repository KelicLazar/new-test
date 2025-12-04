<script setup lang="ts">
const tags = ["history", "american", "crime", "magical", "french"];

const postsStore = usePostsStore();
const route = useRoute();
const router = useRouter();

if (route.query.page) {
  postsStore.currentPage = Number(route.query.page);
}
if (route.query.search) {
  postsStore.search = String(route.query.search);
}

watch([() => postsStore.currentPage, () => postsStore.search], ([page, search]) => {
  router.replace({
    query: { ...route.query, page: page.toString(), search },
  });
});
const selectedPost = ref<PostItem | null>(null);
</script>

<template>
  <div>
    <h1>
      Homepage
    </h1>

    <div class="form-control">
      <label for="search">Search</label>
      <input
        v-model="postsStore.search"
        type="text"
        placeholder="Search posts"
      >
    </div>

    <u-select
      v-model="postsStore.selectedTag"
      placeholder="Select tag"
      class="min-w-40"
      :items="tags"
    />
    <div v-if="postsStore.status === 'pending'">
      Loading...
    </div>
    <div v-if="postsStore.error">
      {{ postsStore.error }}
    </div>
    <div v-if="!postsStore.error && postsStore.status === 'success' && postsStore.data?.posts" class="posts-container">
      <div
        v-for="post in postsStore.data?.posts"
        :key="post.id"
        class="post-card"
        :class="{ 'bg-red-200': post.tags.includes(postsStore.selectedTag) }"
        @click="selectedPost = post"
      >
        <span>{{ post.id }}</span>
        <span>{{ post.title }}</span>
        <span>{{ post.body }}</span>
        <span>{{ post.tags }}</span>
        <span>{{ post.reactions.likes }}</span>
        <span>{{ post.reactions.dislikes }}</span>
        <span>{{ post.views }}</span>
      </div>
    </div>

    <div class="pagination">
      <button @click="postsStore.currentPage--">
        {{ '<' }} Previous Page
      </button>
      <span>{{ postsStore.currentPage }}</span>
      <button @click="postsStore.currentPage++">
        Next Page >
      </button>
    </div>

    <div
      v-if="selectedPost"
      class="modal-overlay"
      @click="selectedPost = null"
    >
      <div class="modal" @click.stop>
        <p><strong>Title:</strong> {{ selectedPost.title }}</p>
        <p><strong>Body:</strong> {{ selectedPost.body }}</p>
        <p><strong>Tags:</strong> {{ selectedPost.tags.join(', ') }}</p>
        <p><strong>Likes:</strong> {{ selectedPost.reactions.likes }}</p>
        <p><strong>Dislikes:</strong> {{ selectedPost.reactions.dislikes }}</p>
        <p><strong>Views:</strong> {{ selectedPost.views }}</p>
        <button @click="selectedPost = null">
          close
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body:has(.modal) {
  overflow: hidden;
}
.posts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.post-card {
  display: flex;
  flex-direction: column;
}
input {
  border: 1px solid black;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 5, 5, 0.158);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background-color: white;
  max-width: 400px;
  padding: 20px;
}
</style>
