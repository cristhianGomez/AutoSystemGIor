<template>
  
  <v-container fill-height fluid color="second">
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
                <v-col cols="12" md="4" lg="6" v-if="searchType=='location'">
                       <v-select :items="items" v-model="searchValue" label="Seleccione localidad" outlined></v-select>
                </v-col> 
                 <v-col cols="12" md="4" lg="6" v-else-if="searchType=='name'">
                    <v-text-field v-model="searchValue" label="Ingrese nombre de cliente." outlined clearable></v-text-field>
                </v-col>
       
               <v-col cols="12" md="8" lg="6">
                   <v-radio-group v-model="searchType" @change="selectedChanged" :column="false">
                    <v-radio
                        label="Localidad"
                        value="location"
                    ></v-radio>
                    <v-radio
                        label="Nombre de Cliente"
                        value="name"
                    ></v-radio>
                   </v-radio-group>
                </v-col>
               </v-row>
          </v-form>
    </v-expansion-panel-content>
      </v-expansion-panel>
       <v-expansion-panel>
        <v-expansion-panel-header><strong>Listado de Clientes:</strong>
        <v-col style="flex:content">
          <v-btn  elevation="5" class="mr-2" to="/vehiculos-crear"  color="base" dark>
          Crear cliente
        </v-btn> 
        </v-col>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="8"
    :search="searchValue"
    class="elevation-1"
  >
   <template v-slot:item.actions="{ item }">
      <v-btn elevation="5" color="orange darken-3" @click="editClient(item)" small dark>
        Editar
      </v-btn>
      <v-btn elevation="5" color="primary" @click="deleteClient(item)" small dark>
        Eliminar
      </v-btn>
    </template>
  </v-data-table>
    </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Client",
  data: () => ({
    panel: [0, 1],
    file: {
      sendButtons: false
    },
    items: ["asda", "asas"],
    searchType: "location",
    searchValue: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      }
    ]
  }),
  methods: {
    deleteClient() {},
    editClient() {},
    selectedChanged() {}
  }
};
</script>

<style>
</style>