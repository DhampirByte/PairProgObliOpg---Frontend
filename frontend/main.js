import { createApp } from 'vue';
import axios from 'axios';
import Add from './src/components/Add.vue';

const baseUrl = 'http://localhost:5167/api/musicrecord';

const app = createApp({
  components: {
    Add,
  },
  data() {
    return {
      musicRecords: [],
    };
  },
  methods: {
    async getAllAsync() {
      try {
        const response = await axios.get(baseUrl);
        this.musicRecords = response.data;
      } catch (error) {
        alert(error.message);
      }
    },
    async addMusicRecord(record) {
      try {
        await axios.post(baseUrl, record);
        await this.getAllAsync();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    this.getAllAsync();
  },
  template: `
    <div>
      <h1>DR Musik Samling</h1>
      <Add @add-music-record="addMusicRecord" />
      <table id="music_record_table" class="table">
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
  `,
});

app.mount('#app');
