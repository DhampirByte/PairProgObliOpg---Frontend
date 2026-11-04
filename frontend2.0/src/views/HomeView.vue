<template>
  <div>
    <h1>DR Musik Samling</h1>
    <RouterLink to="/add" class="btn btn-primary mb-3">Go to Add</RouterLink>

    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Duration</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="musicRecord in musicRecords" :key="musicRecord.id">
          <td>{{ musicRecord.title }}</td>
          <td>{{ musicRecord.artist }}</td>
          <td>{{ musicRecord.duration }}</td>
          <td>{{ musicRecord.year }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

const baseUrl = 'http://localhost:5167/api/musicrecord';

export default {
  data() {
    return {
      musicRecords: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(baseUrl);
      this.musicRecords = response.data;
    } catch (error) {
      alert(error.message);
    }
  },
};
</script>
