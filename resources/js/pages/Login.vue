<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center" class="mb-12 pb-10">
      <auth-form :is-login="true" @validData="loginUser" />
    </v-row>
  </v-container>
</template>
<script>
import AuthForm from "../components/AuthForm.vue";
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
        // console.log(response);
      } catch (error) {
        if ((error.response.status = 422)) {
          console.log("Credenciales Inválidas");
        } else {
          console.log("Hubo un error al intentar ingresar");
        }
      }
    }
  }
};
</script>
<style></style>
