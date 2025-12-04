<script setup lang="ts">
const postsStore = usePostsStore();
const selectedPost = ref<PostItem | null>(null);
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
        @click="selectedPost = post"
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
.posts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.post-card {
  display: flex;
  flex-direction: column;
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
