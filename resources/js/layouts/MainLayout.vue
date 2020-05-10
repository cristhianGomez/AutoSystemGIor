<template>
   <v-app>
    <the-app-bar></the-app-bar>
    <the-side-bar></the-side-bar>
    <v-content class="custom-bg-color">
      	<transition
				name="main-anim"
				enter-active-class="animated fadeInDown"
				leave-active-class="fateOutDown"
			>
      <router-view></router-view>
			</transition>
    </v-content>
  </v-app>
</template>

<script>
import TheAppBar from "../components/TheAppBar.vue";
import TheSideBar from "../components/TheSideBar.vue";
export default {
  name: "MainLayout",
  components: {
    TheAppBar,
    TheSideBar
  }
};
</script>
<style scoped>
.page {
  position: fixed;
  width: inherit;
}
</style>