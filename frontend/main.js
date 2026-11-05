const baseUrl ="https://localhost:7186/api/musicrecord";

const app = Vue.createApp({
    data(){
        return {
            musicRecords: [],
            addData: {
                title: '',
                artist: '',
                duration: '',
                year: ''
            },
        }
    },
    methods: {
        async GetAllAsync(){
            try {
                    const response = await axios.get(baseUrl)
                    this.musicRecords = await response.data;
                    console.log(response.data);
                } catch (ex) {
                    alert(ex.message);
                }
        },
        async AddAsync(){
            try {
                const response = await axios.post(baseUrl, this.addData);
                this.musicRecords.push(response.data);
                console.log(response.data);
            } catch (ex) {
                alert(ex.message);
            }
        },
        async DeleteAsync(id){
            try {
                const response = await axios.delete(`${baseUrl}/${id}`);
                await this.GetAllAsync();
                console.log(response.data);
            } catch (ex) {
                alert(ex.message);
            }
        }
    },
/*    mounted() {
        console.log("Mounted method called");
        this.GetAllAsync();
    },*/
    async created(){
        console.log("Getting data");
        await this.GetAllAsync();
        this.tempPlayers = this.players;
        console.log(this.tempPlayers);
    }
})
app.mount('#app')
