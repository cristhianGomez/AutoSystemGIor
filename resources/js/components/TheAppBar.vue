<template>
  <v-app-bar
    app
    color="black"
    flat
    dark
    hide-on-scroll
    clipped-left
  >
    <v-tooltip v-if="isLoggedIn" bottom>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on" @click="setDrawer"></v-app-bar-nav-icon>
      </template>
      <span>Abrir Menu</span>
    </v-tooltip>
  
    <v-row>
      <v-col cols="2" sm="4" >
      </v-col>
      <v-col class="d-flex justify-space-around align-center">
        <v-toolbar-title>
          <strong>AutoSystem</strong></v-toolbar-title>
      </v-col>

      <v-col cols="3" sm="4" class="d-flex justify-end">
        <!-- Logic for user dropdown use button-->
        <div class="d-flex justify-center text-center">
          <v-menu open-on-hover offset-y :left="true" open-delay close-delay>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <template v-if="isLoggedIn">
                  {{ userName }}
                </template>
                <template v-else>
                  <v-icon>mdi-account </v-icon>
                </template>
              </v-btn>
            </template>

            <v-list>
              <template v-if="!isLoggedIn">
                <v-list-item to="/login">
                  <v-list-item-title>
                    Iniciar Sesión
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item to="/user-profile">
                  <v-list-item-title> Ver Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>Cerrar Sesión </v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
       </v-col>
    </v-row>
    </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheAppBar",
  data: () => ({}),
  computed: {
    ...mapGetters(["isLoggedIn", "userName"])
  },
  methods: {
    setDrawer() {
      this.$store.commit("SET_DRAWER");
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.log("Hubo un error al cerrar la sesión");
      }
    }
  }
};
</script>

<style lang="scss"></style>
