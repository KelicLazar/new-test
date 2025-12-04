<script setup lang="ts">
const postsStore = usePostsStore();
const tags = ["history", "american", "crime", "magical", "french"];
</script>

<template>
  <div>
    <h1>
      Homepage
    </h1>
    <u-select
      v-model="postsStore.selectedTag"
      placeholder="Select tag"
      class="min-w-40"
      :items="tags"
    />
    {{ postsStore.selectedTag }}
    <div class="posts-container">
      <div
        v-for="post in postsStore.data?.posts"
        :key="post.id"
        class="post-card"
        :class="{ 'bg-red-200': post.tags.includes(postsStore.selectedTag) }"
      >
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
        Previous Page
      </button>
      <button @click="postsStore.currentPage++">
        Next Page
      </button>
    </div>
    <h1>{{ postsStore.currentPage }}</h1>
    <h1>{{ postsStore.postsPerPage }}</h1>
    <pre>{{ postsStore.data }}</pre>
  </div>
</template>

<style>
.posts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.post-card {
  display: flex;
  flex-direction: column;
}
</style>
