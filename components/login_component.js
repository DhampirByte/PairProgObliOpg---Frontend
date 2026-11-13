import { authUrl, tokenName, getErrorMessage } from "../frontend/app-config.js";

export default {
    template: ` 
    <div id = "login_form">
        <form class="login-form" @submit.prevent="login">
          <div class="field-group">
            <label for="username">Username</label>
            <input id="username" v-model="auth.username" autocomplete="username"
                    placeholder="Your username" type="text" required>
          </div>
          <div class="field-group">
            <label for="password">Password</label>
            <input id="password" v-model="auth.password" autocomplete="current-password"
                    placeholder="Your password" type="password" required>
          </div>
          <button class="button-primary login-submit" type="submit" :disabled="isLoggingIn">
                {{ isLoggingIn ? "Signing in..." : "Sign in" }}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>
        <p v-if="authMessage" class="status-message is-error" role="alert">{{ authMessage }}</p>
      </div>
      `,
    data() {
        return {
            auth: { username: "", password: "" },
            authMessage: null,
            isLoggingIn: false
        }
    },
    methods:{
        async login() {
            this.isLoggingIn = true;
            this.authMessage = null;

            try {
                const response = await axios.post(authUrl, this.auth);
                console.log(response.data);
                const userInfo = {
                    username: this.auth.username,
                    role: response.data.role,
                    token: response.data.token
                };
                localStorage.setItem(tokenName, JSON.stringify(userInfo));
                await this.$router.replace({ name: "musicrecords" });
            } catch (ex) {
                this.authMessage = "Authentication failed: " + getErrorMessage(ex);
                this.isLoggingIn = false;
            }
        }
    },
}