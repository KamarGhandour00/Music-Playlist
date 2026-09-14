<script setup>
defineProps({
  song: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["remove", "favorite"]);
</script>

<template>
  <article class="song-card">
    <img
      class="song-image"
      :src="song.image"
      :alt="`${song.title} cover`"
    />

    <div class="song-info">
      <h3>{{ song.title }}</h3>
      <p class="artist">{{ song.artist }}</p>
      <p class="album">{{ song.album }}</p>

      <slot name="extra"></slot>

      <div class="song-actions">
        <button
          class="favorite-btn"
          :class="{ active: song.favorite }"
          @click="emit('favorite', song.id)"
        >
          {{ song.favorite ? "♥" : "♡" }}
        </button>

        <button
          class="remove-btn"
          @click="emit('remove', song.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.song-card {
  display: flex;
  gap: 18px;
  padding: 16px;
  border-radius: 18px;
  background: #18181f;
  border: 1px solid #292934;
  transition: 0.2s ease;
}

.song-card:hover {
  transform: translateY(-3px);
  border-color: #7c5cff;
}

.song-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 14px;
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-info h3 {
  margin: 0 0 5px;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist {
  margin: 0;
  color: #c9c9d3;
}

.album {
  margin: 5px 0 14px;
  color: #858592;
  font-size: 13px;
}

.song-actions {
  display: flex;
  gap: 8px;
}

.favorite-btn,
.remove-btn {
  border: none;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 12px;
}

.favorite-btn {
  background: #282532;
  color: #aaa;
  font-size: 18px;
}

.favorite-btn.active {
  color: #ff5c8a;
}

.remove-btn {
  background: #292934;
  color: #ddd;
}

.remove-btn:hover {
  background: #3a3a47;
}
</style>