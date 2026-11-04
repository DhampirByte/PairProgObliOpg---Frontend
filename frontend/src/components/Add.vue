
<template>
  <form @submit.prevent="addMusicRecord">
    <input type="text" placeholder="Title" v-model="title">
    <input type="text" placeholder="Artist" v-model="artist">
    <input type="text" placeholder="Duration" v-model="duration">
    <input type="number" placeholder="Year" v-model="year">

    <button class="btn" type="submit">
      Add Music Record
    </button>
  </form>
</template>

<script>
export default {
  emits: ['add-music-record'],
  data() {
    return {
      title: '',
      artist: '',
      duration: '',
      year: null,
    };
  },
  methods: {
    addMusicRecord() {
      this.$emit('add-music-record', {
        title: this.title,
        artist: this.artist,
        duration: this.duration,
        year: this.year,
      });

      this.title = '';
      this.artist = '';
      this.duration = '';
      this.year = null;
    },
  },
};
</script>