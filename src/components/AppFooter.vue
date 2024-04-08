<template>
  <footer class="footer">
    <div class="container">
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="author" class="author-info">
        <img
          v-if="author?.avatarUrl"
          :src="author.avatarUrl"
          alt="Author Avatar"
          class="avatar"
        />
        <div class="info">
          <p v-if="author?.name">
            <strong>Author:</strong>
            <a :href="author.profileUrl">{{ author.name }}</a>
          </p>
          <p>
            <strong>GitHub:</strong>
            <a :href="author.profileUrl">{{ author.profileUrl }}</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Author {
  name: string;
  profileUrl: string;
  avatarUrl: string;
}

const username = 'DIvakh';

export default defineComponent({
  data() {
    return {
      author: null as Author | null,
      isLoading: false,
      error: null as string | null
    };
  },
  mounted() {
    this.fetchAuthorInfo();
  },
  methods: {
    async fetchAuthorInfo() {
      this.isLoading = true;
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        this.author = {
          name: userData.name || username,
          profileUrl: userData.html_url,
          avatarUrl: userData.avatar_url
        };
      } catch (error) {
        this.error = (error as Error).message || 'Failed to fetch user data';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
</script>
