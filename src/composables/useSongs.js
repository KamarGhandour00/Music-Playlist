import { ref } from "vue";

export function useSongs() {
  const songs = ref([]);
  const loading = ref(false);
  const error = ref("");

  async function searchSongs(term) {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=20`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }

      const data = await response.json();

      songs.value = data.results.map((song) => ({
        id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        image: song.artworkUrl100?.replace("100x100", "300x300"),
        preview: song.previewUrl || "",
        favorite: false
      }));
    } catch (err) {
      error.value = "Could not load songs. Please try again.";
      songs.value = [];
    } finally {
      loading.value = false;
    }
  }

  return {
    songs,
    loading,
    error,
    searchSongs
  };
}