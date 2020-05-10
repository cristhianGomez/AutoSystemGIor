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
                      <v-text-field color="base" outlined v-model="data.name" label="Nombres" counter="100"
                        clearable :rules="validateRules.max100Rule"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="data.lastname" label="Apellidos" counter="100"
                        clearable :rules="validateRules.max100Rule"></v-text-field>
                  </v-col> 
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="data.email" label="Localidad" 
                        clearable :rules="validateRules.requiredRule"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="data.phone" label="Celular" counter="30" 
                        clearable :rules="validateRules.max30Rule"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                      <v-text-field color="base" outlined v-model="data.email" label="Email" 
                        clearable :rules="validateRules.requiredRule"></v-text-field>
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
                    <v-text-field color="base" outlined v-model="data.dni" label="D.N.I." 
                       clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="12">
                    <v-text-field color="base" outlined v-model="data.address" label="Dirección" 
                       clearable></v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="12">
                    <v-text-field color="base" outlined v-model="data.sex" label="Sexo" 
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
export default {
  name: "ViewClient",
  data: () => ({
    lazy: true,
    data: {},
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
      ]
    }
  }),
  methods: {
    btnClicked() {}
  }
};
</script>

<style>
</style>