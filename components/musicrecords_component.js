import {musicRecordsUrl, getStoredUserInfo, tokenName, getErrorMessage} from "../frontend/app-config.js";

export default {
    template: `
    <header class="topbar">
        <a class="wordmark" href="#/" aria-label="DR Musik Samling">
            <span>CATALOG</span>
        </a>
        <div class="account-actions">
            <span class="account-label">{{ userInfo.username }}</span>
            <span class="account-role">{{ userInfo.role }}</span>
            <button class="button-quiet" type="button" @click="logout">Sign out</button>
        </div>
    </header>

      <h1>DR Musik Samling</h1>
      <section class="music-records-section">
        <table id="music_record_table" v-if="musicRecords.length >= 0" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Year</th>
              <th v-if="userInfo.role === 'Admin'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="musicRecord in musicRecords">
              <td>{{ musicRecord.id }}</td>
              <td>{{ musicRecord.title }}</td>
              <td>{{ musicRecord.artist }}</td>
              <td>{{ musicRecord.duration }}</td>
              <td>{{ musicRecord.year }}</td>
              <td v-if="userInfo.role === 'Admin'">
                <button @click="DeleteAsync(musicRecord.id)" :id="'delete_record_button_' + musicRecord.id" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No music records found.</p>
        </div>
      </section>


      <section v-if="userInfo.role === 'Admin'" class="add-record-section">
        <h2>Add New Music Record</h2>
        <form @submit.prevent="AddAsync" id="add_record_form">
          <div class="mb-3">
            <label for="add_record_title" class="form-label">Title</label>
            <input type="text" id="add_record_title" v-model="addData.title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="add_record_artist" class="form-label">Artist</label>
            <input type="text" id="add_record_artist" v-model="addData.artist" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="add_record_duration" class="form-label">Duration</label>
            <input type="text" id="add_record_duration" v-model="addData.duration" class="form-control">
          </div>
          <div class="mb-3">
            <label for="add_record_year" class="form-label">Year</label>
            <input type="number" id="add_record_year" v-model.number="addData.year" class="form-control">
          </div>
          <button id="add_record_button" type="submit" class="btn btn-primary">Add Record</button>
        </form>
      </section>


      <section v-if="userInfo.role == 'Admin'" class="update-record-section">
      </h2>Update Music Record</h2>
      <form @submit.prevent="UpdateAsync" id="update_record_form">
        <div class="mb-3">
          <label for="update_record_id" class="form-label">Record ID</label>
          <input type="number" id="update_record_id" v-model.number="updateData.id" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="update_record_title" class="form-label">Title</label>
          <input type="text" id="update_record_title" v-model="updateData.title" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="update_record_artist" class="form-label">Artist</label>
          <input type="text" id="update_record_artist" v-model="updateData.artist" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="update_record_duration" class="form-label">Duration</label>
          <input type="text" id="update_record_duration" v-model="updateData.duration" class="form-control">
        </div>
        <div class="mb-3">
          <label for="update_record_year" class="form-label">Year</label>
          <input type="number" id="update_record_year" v-model.number="updateData.year" class="form-control">
        </div>
        <button id="update_record_button" type="submit" class="btn btn-primary">Update Record</button>
      </form>
      </section>
`,
  data(){
    return {
      userInfo: getStoredUserInfo(),
      musicRecords: [],
      addData: {
        title: '',
        artist: '',
        duration: '',
        year: '',
      },
      updateData: {
        id: null,
        title: '',
        artist: '',
        duration: '',
        year: null,
      }
    }
  },
  methods: {
      logout() {
          localStorage.removeItem(tokenName);
          this.$router.replace({ name: "login" });
      },
      async GetAllAsync(){
          try {
                  const response = await axios.get(musicRecordsUrl);
                  this.musicRecords = await response.data;
                  console.log(response.data);
              } catch (ex) {
                  alert(ex.message);
              }
      },
      async AddAsync(){
          try {
              const response = await axios.post(musicRecordsUrl, this.addData);
              this.musicRecords.push(response.data);
              console.log(response.data);
          } catch (ex) {
              alert(ex.message);
          }
      },
      async DeleteAsync(id){
          try {
              const response = await axios.delete(`${musicRecordsUrl}/${id}`);
              await this.GetAllAsync();
              console.log(response.data);
          } catch (ex) {
              alert(ex.message);
          }
      },
      async UpdateAsync(){
          try {
              const response = await axios.put(`${musicRecordsUrl}/${this.updateData.id}`, this.updateData);
              await this.GetAllAsync();
              console.log(response.data);
          } catch (ex) {
              alert(ex.message);
          }
        }
    },
  created(){
      console.log("Getting data");
      this.GetAllAsync();
  } 
}