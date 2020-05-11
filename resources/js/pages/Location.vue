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
                 <v-col cols="12" md="4" lg="6">
                    <v-text-field v-model="searchValue" label="Ingrese nombre de la localidad." outlined clearable></v-text-field>
                </v-col>
               <v-col cols="12" md="8" lg="6">
                   <v-radio-group v-model="searchType" :column="false">
                    <v-radio
                        label="Nombre de Localidad"
                        value="name"
                    ></v-radio>
                   </v-radio-group>
                </v-col>
               </v-row>
          </v-form>
    </v-expansion-panel-content>
      </v-expansion-panel>
       <v-expansion-panel>
        <v-expansion-panel-header class="pb-0"><strong>Listado de Localidades:</strong>
        <v-col style="flex:content">
          
          <v-btn  v-if="!createHeader" elevation="5" class="mr-2" color="base" @click="createHeader=true; panel.push(1);" dark>
          Crear localidad
        </v-btn> 
        </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-data-table  calculate-widths :headers="headers" :items.sync="locationsStore" :items-per-page="10"
            :search="searchValue" class="elevation-1" sort-by="id" sort-desc>
             <template  v-slot:top>
                     	<transition
				name="main-anim"
				enter-active-class="animated fadeInDown"
				leave-active-class="fateOut"
        mode="out-in"
			>

               <v-row v-if="createHeader" no-gutters class="align-center pt-2 pb-0">
            <v-col cols="12" md="6" lg="5">
                    <v-text-field v-model="newLocation" label="nombre de localidad nueva" outlined clearable></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="5" class="pb-7 pl-2">
                <v-btn  elevation="5" class="mr-2" @click="createLocation" color="base" dark>
                Crear 
              </v-btn>
                <v-btn  elevation="5" class="mr-2" @click="createHeader=false" color="primary" dark>
                Cancelar 
              </v-btn>
            </v-col>
          </v-row>
                     	</transition>
             </template>
   <template v-slot:item.actions="{ item }">
            <v-btn elevation="5" color="orange darken-3" @click="dialog=true; editItem={...item}" small dark>
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
     <v-row justify="center">
    <custom-dialog :dialog="dialog">
      <template slot="header"  >
          <span class="headline">Editar Localidad</span>
      </template>
      <template slot="body"  >
           <v-text-field v-model="editItem.name" label="Nuevo nombre de la localidad." outlined clearable></v-text-field>
      </template>
      <template slot="actions"  >
          <v-btn color="primary" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="base" text @click="confirmDialog= true">Editar</v-btn>
      </template>
    </custom-dialog>      
    <custom-dialog :dialog="confirmDialog">
      <template slot="header"  >
          <span class="headline">Esta a punto de editar la localidad</span>
      </template>
      <template slot="actions"  >
          <v-btn color="primary" text @click="confirmDialog= false">Cancelar</v-btn>
          <v-btn color="base" text @click="editLocation">Aceptar</v-btn>
      </template>
    </custom-dialog>
    <custom-dialog :dialog="deleteDialog">
      <template slot="header"  >
          <span class="headline">¿Esta seguro de eliminar la localidad?</span>
      </template>
      <template slot="body"  >
        Solo se podrá eliminar si esta no cuenta con clientes.
      </template>
      <template slot="actions"  >
          <v-btn color="primary" text @click="deleteDialog= false">Cancelar</v-btn>
          <v-btn color="base" text @click="deleteLocation(deleteItem)">Aceptar</v-btn>
      </template>
    </custom-dialog>            
     </v-row>
  </v-container>
</template>
<script>
import CustomDialog from "../components/CustomDialog";
export default {
  name: "Location",
  components: {
    CustomDialog
  },
  mounted() {
    this.$store.dispatch("locations/getLocations");
  },
  data: () => ({
    panel: [0, 1],
    dialog: false,
    confirmDialog: false,
    deleteDialog: false,
    createHeader: false,
    editItem: {},
    deleteItem: {},
    searchType: "name",
    searchValue: "",
    newLocation: "",
    headers: [
      { text: "Nombre", align: "start", value: "name", width: "70%" },
      {
        text: "Acciones",
        align: "start",
        value: "actions",
        sortable: false,
        width: "30%"
      }
    ]
  }),
  computed: {
    locationsStore() {
      return this.$store.state.locations.locations || [];
    }
  },
  methods: {
    async deleteLocation(id) {
      await this.$store.dispatch("locations/removeLocation", id);
      this.deleteDialog = false;
    },
    async createLocation() {
      this.panel.push(1);
      try {
        this.$store.dispatch("locations/createLocation", {
          name: this.newLocation
        });
        this.createHeader = false;
      } catch (error) {
        this.createHeader = false;
      }
    },
    async editLocation() {
      try {
        await this.$store.dispatch("locations/updateLocation", this.editItem);
        this.editItem = {};
        this.confirmDialog = false;
        this.dialog = false;
      } catch (error) {
        this.confirmDialog = false;
      }
    }
  }
};
</script>

<style>
</style>