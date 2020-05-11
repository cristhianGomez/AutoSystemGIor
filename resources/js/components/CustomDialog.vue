<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="subtile-2">
          <slot name="header"></slot>
        </v-card-title>
        <v-card-text>
          <slot name="body"></slot>
        </v-card-text>
        <v-card-actions>
                <v-spacer></v-spacer>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
</template>

<script>
export default {
  name: "CustomDIalog",
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
</style>