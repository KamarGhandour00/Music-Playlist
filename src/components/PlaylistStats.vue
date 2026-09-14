<script setup>
defineProps({
  total: {
    type: Number,
    required: true
  },
  favorites: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <section class="stats">
    <div>
      <span>{{ total }}</span>
      <small>Total Songs</small>
    </div>

    <div>
      <span>{{ favorites }}</span>
      <small>Favorites</small>
    </div>

    <div>
      <span>{{ percentage }}%</span>
      <small>Favorite Rate</small>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px 0;
}

.stats div {
  padding: 18px;
  border-radius: 16px;
  background: #18181f;
  border: 1px solid #292934;
  text-align: center;
}

.stats span {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.stats small {
  color: #888894;
}

@media (max-width: 600px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>