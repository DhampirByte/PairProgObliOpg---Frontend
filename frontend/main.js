import LoginComponent from "./components/login_component.js";
import MusicRecordComponent from "./components/musicrecords_component.js";
import { getStoredUserInfo } from "./app-config.js";

axios.interceptors.request.use(config => {
    
        const token = getStoredUserInfo()?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        
    }

    return config;
});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: "/", redirect: () => getStoredUserInfo() ? "/musicrecords" : "/login" },
        { path: "/login", name: "login", component: LoginComponent },
        { path: "/musicrecords", name: "musicrecords", component: MusicRecordComponent, meta: { requiresAuth: true } }
    ]
});

router.beforeEach(to => {
    const isAuthenticated = Boolean(getStoredUserInfo());

    if (to.meta.requiresAuth && !isAuthenticated) {
        return { name: "login" };
    }
    if (to.name === "login" && isAuthenticated) {
        return { name: "musicrecords" };
    }
});

Vue.createApp({}).use(router).mount('#app')
