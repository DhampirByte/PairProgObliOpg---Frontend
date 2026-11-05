const baseUrl ="http://localhost:5167/api/musicrecord";

const app = Vue.createApp({
    data(){
        return {
            musicRecords: [],
            addData: {
                title: '',
                artist: '',
                duration: '',
                year: ''
            }
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
        async created(){
        console.log("Getting data");
        await this.GetAllAsync();
        }
    }
}).mount('#app')
