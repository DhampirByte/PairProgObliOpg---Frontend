<template>
  <div>
    <h1>Add Music Record</h1>
    <RouterLink to="/" class="btn btn-secondary mb-3">Back to List</RouterLink>
    <Add @add-music-record="saveRecord" />
  </div>
</template>

<script>
import axios from 'axios';
import Add from '../components/Add.vue';

const baseUrl = 'http://localhost:5167/api/musicrecord';

export default {
  components: {
    Add,
  },
  methods: {
    async saveRecord(record) {
      try {
        await axios.post(baseUrl, record);
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
