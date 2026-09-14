<script setup>
import { reactive } from "vue";

const emit = defineEmits(["add"]);

const songForm = reactive({
  title: "",
  artist: ""
});

function submitForm() {
  if (
    songForm.title.trim() === "" ||
    songForm.artist.trim() === ""
  ) {
    return;
  }

  emit("add", {
    title: songForm.title.trim(),
    artist: songForm.artist.trim()
  });

  songForm.title = "";
  songForm.artist = "";
}
</script>

<template>
  <form class="song-form" @submit.prevent="submitForm">
    <input
      v-model="songForm.title"
      type="text"
      placeholder="Song title"
    />

    <input
      v-model="songForm.artist"
      type="text"
      placeholder="Artist"
    />

    <button type="submit">
      + Add Song
    </button>
  </form>
</template>

<style scoped>
.song-form {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 10px;
}

.song-form input {
  padding: 13px 15px;
  border: 1px solid #30303b;
  border-radius: 12px;
  background: #18181f;
  color: white;
  outline: none;
}

.song-form input:focus {
  border-color: #7c5cff;
}

.song-form button {
  border: none;
  border-radius: 12px;
  padding: 0 18px;
  background: #7c5cff;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.song-form button:hover {
  background: #6948ed;
}

@media (max-width: 700px) {
  .song-form {
    grid-template-columns: 1fr;
  }

  .song-form button {
    padding: 13px;
  }
}
</style>