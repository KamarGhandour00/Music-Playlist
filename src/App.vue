```vue
<script setup>
import { computed, onMounted, ref } from "vue";
import SongCard from "./components/SongCard.vue";
import SongForm from "./components/SongForm.vue";
import PlaylistStats from "./components/PlaylistStats.vue";
import { useSongs } from "./composables/useSongs";

const {
  songs,
  loading,
  error,
  searchSongs
} = useSongs();

const searchTerm = ref("Arabic music");

const favoriteSongs = computed(() => {
  return songs.value.filter((song) => song.favorite);
});

const favoritePercentage = computed(() => {
  if (songs.value.length === 0) {
    return 0;
  }

  return Math.round(
    (favoriteSongs.value.length / songs.value.length) * 100
  );
});

function removeSong(id) {
  songs.value = songs.value.filter(
    (song) => song.id !== id
  );
}

function toggleFavorite(id) {
  const song = songs.value.find(
    (song) => song.id === id
  );

  if (song) {
    song.favorite = !song.favorite;
  }
}

function addSong(songData) {
  songs.value.unshift({
    id: Date.now(),
    title: songData.title,
    artist: songData.artist,
    album: "My Playlist",
    image:
      "https://via.placeholder.com/300x300?text=Music",
    preview: "",
    favorite: false
  });
}

function handleSearch() {
  if (searchTerm.value.trim() === "") {
    return;
  }

  searchSongs(searchTerm.value);
}

onMounted(() => {
  searchSongs(searchTerm.value);
});
</script>

<template>
  <div class="app">

    <!-- HERO -->
    <header class="hero">
      <div>
        <p class="eyebrow">YOUR MUSIC SPACE</p>

        <h1>My Playlist</h1>

        <p class="subtitle">
          Discover songs, save favorites, and build your own collection.
        </p>
      </div>

      <div class="music-icon">
        ♪
      </div>
    </header>


    <main>

      <!-- SEARCH -->
      <section class="search-section">

        <form @submit.prevent="handleSearch">
          <input
            v-model="searchTerm"
            type="search"
            placeholder="Search songs, artists..."
          />

          <button type="submit">
            Search
          </button>
        </form>

        <div class="quick-searches">

          <button
            @click="
              searchTerm = 'Arabic music';
              handleSearch();
            "
          >
            Arabic
          </button>

          <button
            @click="
              searchTerm = 'rap';
              handleSearch();
            "
          >
            Rap
          </button>

          <button
            @click="
              searchTerm = 'pop';
              handleSearch();
            "
          >
            Pop
          </button>

          <button
            @click="
              searchTerm = 'English hits';
              handleSearch();
            "
          >
            English
          </button>

        </div>

      </section>


      <!-- STATS -->
      <PlaylistStats
        :total="songs.length"
        :favorites="favoriteSongs.length"
        :percentage="favoritePercentage"
      />


      <!-- ADD SONG -->
      <SongForm @add="addSong" />


      <!-- EXPLORE SONGS -->
      <section class="playlist-section">

        <div class="section-heading">
          <div>
            <h2>Explore Songs</h2>

            <p>
              Discover something new for your playlist.
            </p>
          </div>

          <span v-if="!loading">
            {{ songs.length }} songs
          </span>
        </div>


        <!-- LOADING -->
        <div
          v-if="loading"
          class="state"
        >
          <div class="loader"></div>

          <p>
            Finding songs...
          </p>
        </div>


        <!-- ERROR -->
        <div
          v-else-if="error"
          class="state error-state"
        >
          <p>
            {{ error }}
          </p>

          <button @click="handleSearch">
            Try Again
          </button>
        </div>


        <!-- EMPTY -->
        <div
          v-else-if="songs.length === 0"
          class="state"
        >
          <p>
            No songs found.
          </p>
        </div>


        <!-- SONGS -->
        <div
          v-else
          class="song-list"
        >

          <SongCard
            v-for="song in songs"
            :key="song.id"
            :song="song"
            @remove="removeSong"
            @favorite="toggleFavorite"
          >

            <template #extra>
              <span class="genre-tag">
                Music
              </span>
            </template>

          </SongCard>

        </div>

      </section>


      <!-- FAVORITES -->
      <section class="playlist-section favorites-section">

        <div class="section-heading">
          <div>
            <h2>♥ Favorites</h2>

            <p>
              The songs you've saved.
            </p>
          </div>

          <span>
            {{ favoriteSongs.length }} favorites
          </span>
        </div>


        <!-- NO FAVORITES -->
        <div
          v-if="favoriteSongs.length === 0"
          class="state"
        >
          <p>
            You haven't favorited any songs yet.
          </p>

          <small>
            Click the ♡ button on a song to save it here.
          </small>
        </div>


        <!-- FAVORITE SONGS -->
        <div
          v-else
          class="song-list"
        >

          <SongCard
            v-for="song in favoriteSongs"
            :key="song.id"
            :song="song"
            @remove="removeSong"
            @favorite="toggleFavorite"
          >

            <template #extra>
              <span class="genre-tag favorite-tag">
                Favorite
              </span>
            </template>

          </SongCard>

        </div>

      </section>

    </main>


    <!-- FOOTER -->
    <footer>
      <p>
        Built with Vue 3 💜
      </p>
    </footer>

  </div>
</template>


<style scoped>

.app {
  min-height: 100vh;
}


/* HERO */

.hero {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  padding: 70px 24px 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 30px;
}

.eyebrow {
  margin: 0 0 10px;

  color: #9278ff;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 2px;
}

.hero h1 {
  margin: 0;

  font-size: clamp(40px, 7vw, 70px);

  letter-spacing: -3px;
}

.subtitle {
  max-width: 520px;

  margin-top: 14px;

  color: #9696a4;

  font-size: 16px;
}

.music-icon {
  width: 100px;
  height: 100px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 28px;

  background: #7c5cff;

  color: white;

  font-size: 48px;

  transform: rotate(8deg);
}


/* MAIN */

main {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  padding: 0 24px 60px;
}


/* SEARCH */

.search-section {
  padding: 20px;

  border-radius: 22px;

  background: #13131a;

  border: 1px solid #292934;
}

.search-section form {
  display: flex;

  gap: 10px;
}

.search-section input {
  flex: 1;

  min-width: 0;

  padding: 15px 17px;

  border: 1px solid #30303b;

  border-radius: 13px;

  background: #1b1b23;

  color: white;

  font-size: 15px;

  outline: none;
}

.search-section input:focus {
  border-color: #7c5cff;
}

.search-section form button {
  border: none;

  border-radius: 13px;

  padding: 0 22px;

  background: #7c5cff;

  color: white;

  font-weight: 700;

  cursor: pointer;
}

.quick-searches {
  display: flex;

  gap: 8px;

  margin-top: 12px;

  flex-wrap: wrap;
}

.quick-searches button {
  border: 1px solid #30303b;

  border-radius: 20px;

  padding: 7px 13px;

  background: transparent;

  color: #bdbdc8;

  cursor: pointer;
}

.quick-searches button:hover {
  background: #24242e;

  color: white;
}


/* SECTIONS */

.playlist-section {
  margin-top: 35px;
}

.favorites-section {
  margin-top: 50px;
}

.section-heading {
  display: flex;

  justify-content: space-between;
  align-items: end;

  gap: 20px;

  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0;

  font-size: 25px;
}

.section-heading p {
  margin: 5px 0 0;

  color: #858592;
}

.section-heading > span {
  color: #858592;

  font-size: 14px;

  white-space: nowrap;
}

.song-list {
  display: grid;

  gap: 12px;
}


/* TAGS */

.genre-tag {
  display: inline-block;

  margin-bottom: 10px;

  padding: 4px 9px;

  border-radius: 20px;

  background: #292342;

  color: #a992ff;

  font-size: 11px;
}

.favorite-tag {
  background: #38212c;

  color: #ff7fa5;
}


/* STATES */

.state {
  padding: 60px 20px;

  text-align: center;

  color: #888894;
}

.state small {
  display: block;

  margin-top: 8px;

  color: #62626e;
}

.state button {
  border: none;

  border-radius: 10px;

  padding: 10px 16px;

  background: #7c5cff;

  color: white;

  cursor: pointer;
}

.error-state {
  color: #ff8ca8;
}


/* LOADER */

.loader {
  width: 30px;
  height: 30px;

  margin: 0 auto 15px;

  border: 3px solid #292934;

  border-top-color: #7c5cff;

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}


/* FOOTER */

footer {
  padding: 30px;

  text-align: center;

  color: #656571;

  border-top: 1px solid #20202a;
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* MOBILE */

@media (max-width: 700px) {

  .hero {
    padding-top: 45px;
  }

  .music-icon {
    width: 65px;
    height: 65px;

    font-size: 32px;
  }

  .search-section form {
    flex-direction: column;
  }

  .search-section form button {
    padding: 13px;
  }

  .section-heading {
    align-items: flex-start;

    flex-direction: column;
  }

}
</style>
```
