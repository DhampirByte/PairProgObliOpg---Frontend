const baseUrl ="http://localhost:5167/api/musicrecord";

const app = Vue.createApp({
    data(){
        return {
            musicRecords: [],
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
    },
        async created(){
        console.log("Getting data");
        await this.GetAllAsync();
        }
}).mount('#app')
