<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center" class="mb-12 pb-10">
      <auth-form :is-login="true" @validData="loginUser" />
    </v-row>
  </v-container>
</template>
<script>
import AuthForm from "../components/AuthForm.vue";
import { message } from "../middleware/helpers";
export default {
  name: "Login",
  components: {
    AuthForm
  },
  data: () => ({
    model: true
  }),
  methods: {
    async loginUser(userInfo) {
      try {
        const resp = await this.$store.dispatch("loginUser", userInfo);
        this.$router.push("/clients");
        message("Bienvenido!!", "success");
        // console.log(response);
      } catch (error) {
        if ((error.response.status = 422)) {
          message("Credenciales Inválidas", "error");
        } else {
          message("Hubo un error al intentar ingresar", "error");
        }
      }
    }
  }
};
</script>
<style></style>
