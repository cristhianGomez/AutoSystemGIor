<template>
  <v-container fill-height fluid >
    <v-row style="height:100%" justify="center">
    <v-col cols="12">
    <v-expansion-panels
     multiple v-model="panel"
    >
      <v-expansion-panel>
        <v-expansion-panel-header><strong>Buscador:</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
              <v-form>
               <v-row>
                <v-col cols="12" md="6" lg="6" >
                       <v-select :items="locations" color="base" v-model="currentLocation" @change="setCLients" label="Seleccione localidad" outlined></v-select>
                </v-col> 
                 <v-col cols="12" md="6" lg="6">
                    <v-text-field v-model="searchValue" label="Busque por nombre de cliente." outlined clearable></v-text-field>
                </v-col>
               </v-row>
          </v-form>
    </v-expansion-panel-content>
      </v-expansion-panel>
       <v-expansion-panel>
        <v-expansion-panel-header><strong>Listado de Clientes:</strong>
        <v-col style="flex:content">
          <v-btn  elevation="5" class="mr-2" to="/clients/create"  color="base" dark>
          Crear cliente
        </v-btn> 
        </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-data-table
    :headers="headers"
    :items="clients"
    sortBy="id"
    sort-desc
    :items-per-page="8"
    :search="searchValue"
    class="elevation-1"
  >
   <template v-slot:item.actions="{ item }">
      <v-btn elevation="5" color="orange darken-3" @click="editClient(item.id)" small dark>
        Editar
      </v-btn>
      <v-btn elevation="5" color="primary" @click="deleteItem=item.id; deleteDialog=true" small dark>
        Eliminar
      </v-btn>
    </template>
  </v-data-table>
    </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    </v-row>
    <v-row>
      <custom-dialog :dialog="deleteDialog">
      <template slot="header"  >
          <span class="headline">¿Esta seguro de eliminar el cliente?</span>
      </template>
      <template slot="actions"  >
          <v-btn color="primary" text @click="deleteDialog= false">Cancelar</v-btn>
          <v-btn color="base" text @click="deleteClient(deleteItem)">Aceptar</v-btn>
      </template>
    </custom-dialog> 
    </v-row>       
      
  </v-container>
</template>

<script>
import CustomDialog from "../../components/CustomDialog";
import { mapGetters } from "vuex";

export default {
  name: "Client",
  components: {
    CustomDialog
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("clients/getClients", this.currentLocation),
      this.$store.dispatch("locations/getLocations")
    ]);
  },
  data: () => ({
    panel: [0, 1],
    items: ["asda", "asas"],
    searchType: "location",
    searchValue: "",
    currentLocation: 1,
    deleteDialog: false,
    deleteItem: {},
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Apellido", value: "lastname", sortable: false },
      { text: "Localidad", value: "location", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Telefono", value: "phone", sortable: false },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    clients: []
  }),
  computed: {
    clientsStore() {
      return this.$store.state.clients.clients;
    },
    ...mapGetters({
      locations: "locations/options"
    })
  },
  watch: {
    clientsStore() {
      this.clients = this.clientsStore;
    }
  },
  methods: {
    async setCLients() {
      await this.$store.dispatch("clients/getClients", this.currentLocation);
    },
    async deleteClient(id) {
      try {
        await this.$store.dispatch("clients/removeClient", id);
        this.deleteDialog = false;
      } catch (error) {
        this.deleteDialog = false;
      }
    },
    editClient(id) {
      this.$router.push(`/clients/edit/${id}`);
    }
  }
};
</script>

<style>
</style>