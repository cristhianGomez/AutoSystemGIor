<template>
  <v-card >
    <v-card-title>
       Identificate
      <v-spacer> </v-spacer>
     </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          color="base"
          v-model="userInfo.email"
          :rules="emailRules"
          label="E-mail"
          outlined
          required
        ></v-text-field>

        <v-text-field
          color="base"
          v-model="userInfo.password"
          label="Contraseña"
          outlined
          type="password"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-btn
          color="base"
          dark
        block
          class="mr-4"
          @click="validate"
        >
          INGRESAR
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AuthForm",
  data: () => ({
    valid: true,
    userInfo: {
      email: "cristhian@company.com",
      password: "cristhian_admin"
    },
    emailRules: [],
    passwordRules: []
  }),
  methods: {
    validate() {
      this.emailRules = [
        v => !!v || "El email es requerido.",
        v => /.+@.+\..+/.test(v) || "No es un email válido."
      ];
      this.$refs.form.validate() && this.$emit("validData", this.userInfo);
    }
  }
};
</script>
