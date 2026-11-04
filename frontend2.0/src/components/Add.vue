<!-- Add.vue -->
<template>
  <form @submit.prevent="addMusicRecord">
    <input v-model="title" placeholder="Title" />
    <input v-model="artist" placeholder="Artist" />
    <input v-model="duration" placeholder="Duration" />
    <input v-model="year" type="number" placeholder="Year" />

    <button type="submit">Add Music Record</button>
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
      year: null
    }
  },
  methods: {
    addMusicRecord() {
      this.$emit('add-music-record', {
        title: this.title,
        artist: this.artist,
        duration: this.duration,
        year: this.year
      })

      this.title = ''
      this.artist = ''
      this.duration = ''
      this.year = null
    }
  }
}
</script>