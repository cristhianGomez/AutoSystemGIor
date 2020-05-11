<template>
  <v-container fill-height fluid >
    <v-row style="height:100%" justify="center">
    <v-col cols="12">
    <v-expansion-panels
     multiple v-model="panel"
    >
    <v-col cols="12" md="6" lg="9">
      <v-expansion-panel>
        <v-expansion-panel-header><strong>Datos Principales:</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form  lazy-validation ref="form_datos_principales">
                    <v-row class="px-5">
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="clientData.name" label="Nombres" counter="100"
                        clearable :rules="validateRules.max100Rule"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="clientData.lastname" label="Apellidos" counter="100"
                        clearable :rules="validateRules.max100Rule"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="12" lg="6">
                       <v-select :items="locations" v-model="clientData.location_id" label="Seleccione localidad" outlined></v-select>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="clientData.phone" label="Celular" counter="30" 
                        clearable :rules="validateRules.max30Rule"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="clientData.email" label="Email" 
                        clearable :rules="validateRules.emailRule"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                    <v-btn color="base" dark small class="mr-5" @click="btnClicked">
                      {{btnAction}}
                    </v-btn>
                    <v-btn color="primary" dark small class="mr-3" to="/clients">
                      CANCELAR
                    </v-btn>
                </v-row>
              </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-expansion-panel>
        <v-expansion-panel-header><strong>Datos Secundatrios (opcionales):</strong>
              
        </v-expansion-panel-header>
        <v-expansion-panel-content>
              <v-row class="px-5">
                <v-col cols="12" md="12" lg="12">
                    <v-text-field color="base" outlined v-model="clientData.dni" label="D.N.I." 
                       clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="12">
                    <v-text-field color="base" outlined v-model="clientData.address" label="Dirección" 
                       clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="12">
                    <v-text-field color="base" outlined v-model="clientData.sex" label="Sexo" 
                       clearable></v-text-field>
                </v-col>
                  </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-col>
    </v-expansion-panels>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewClient",
  async mounted() {
    await this.$store.dispatch("locations/getLocations");
    const client_id = this.$route.params.id;
    if (client_id) {
      try {
        this.clientData = await this.$store.dispatch(
          "clients/getClient",
          client_id
        );
        this.btnAction = "Editar Cliente";
        this.edit = true;
      } catch (error) {
        this.$router.push("/clients");
      }
    }
  },
  data: () => ({
    lazy: true,
    edit: false,
    clientData: {},
    btnAction: "Crear Cliente",
    panel: [0, 1],
    validateRules: {
      requiredRule: [v => !!v || "El campo es requerido"],
      max100Rule: [
        v => !!v || "El campo es requerido",
        v =>
          (v && v.length <= 100) || "El campo solo puede tener 100 caracteres"
      ],
      max30Rule: [
        v => !!v || "El campo es requerido",
        v => (v && v.length <= 30) || "El campo solo puede tener 30 caracteres"
      ],
      emailRule: [
        v => !!v || "El campo es requerido",
        v => /.+@.+\..+/.test(v) || "No es un email válido."
      ]
    }
  }),
  computed: {
    ...mapGetters({
      locations: "locations/options"
    })
  },
  methods: {
    async btnClicked() {
      if (this.$refs.form_datos_principales.validate()) {
        try {
          if (this.edit) {
            const editValues = {
              payload: this.clientData,
              id: this.$route.params.id
            };
            delete editValues.payload.location;
            await this.$store.dispatch("clients/updateClient", editValues);
            this.$router.push("/clients");
          } else {
            const client = this.clientData;
            // delete client.payload.location;
            await this.$store.dispatch("clients/createClient", client);
            this.$router.push("/clients");
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>

<style>
</style>