<template>
  <v-navigation-drawer v-model="drawer" clipped app>
      <v-subheader class="subtitle-2 font-weight-bold">GESTIÓN DE CLIENTES</v-subheader>
      <v-list shaped>
         <v-list-item-group v-model="selectedItem" color="primary">
   <v-list-item v-for="item in menuItems" :key="item.name" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.name}}</v-list-item-title>
       </v-list-item>
         </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "TheSideBar",
  data: () => ({
    menuItems: [
      { name: "Clientes", icon: "mdi-account", to: "/clients" },
      { name: "Localidades", icon: "mdi-home", to: "/locations" }
    ],
    drawer: true,
    selectedItem: 0
  }),
  computed: {
    ...mapState({ drawerState: "drawerState" })
  },
  watch: {
    drawerState() {
      this.drawer = this.drawerState;
    }
  }
};
</script>
