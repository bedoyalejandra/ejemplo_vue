import axios from "axios";
import config from "./config/index";

import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    this.cargar_pagina();
  },
  data() {
    return {
      inEdition: false,
      show: false,
      validacion_actualizar: "",
      token: "",
      url: "",
      persona: {
        documento: "",
        tipo_documento: 0,
        nombre: "",
        apellidos: "",
        telefono: "",
        celular: "",
        direccion: "",
        notas: "",
        acciones: true,
      },
      lista_tipos_documentos: [
        {
          value: null,
          text: "Seleccione un tipo de documento",
          disabled: true,
        },
      ],
      lista_personas: [{}],

    };
  },
  created() {
    this.mostrar_personas();
    this.mostrar_tipos_documentos();
  },
  computed: {
    validar_id() {
      if (this.validacion_actualizar) return true;
      return this.persona.documento.length > 0;
    },

    validar_nombre() {
      return this.persona.nombre.length > 0;
    },

    validar_apellido() {
      return this.persona.apellidos.length > 0;
    },

    si_existe() {
      var estado = true;
      if (this.validacion_actualizar) return true;
      for (let i in this.lista_personas) {
        var tem = this.lista_personas[i];
        if (this.persona.documento != "") {
          this.show = true;
          if (tem.documento == this.persona.documento) {
            estado = false;
          }
        }
      }
      return estado;
    },
  },
  methods: {
    cargar_pagina() {
      this.url = config.url_api;
      this.mostrar_personas();
      this.mostrar_tipos_documentos();
    },

    mostrar_tipos_documentos() {
      axios
        .get(this.url + "tipos_documentos", {
          headers: { token: this.token },
        })
        .then((response) => {
          let datos = response.data.info;
          for (let i in datos) {
            let temp = { value: "", text: "" };
            temp.value = datos[i].id;
            temp.text = datos[i].nombre;
            this.lista_tipos_documentos.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_personas() {
      axios
        .get(this.url + "ver-personas", {
          headers: { token: this.token },
        })
        .then((response) => {
          this.lista_personas = response.data.info;
          for (let i in this.lista_personas) {
            this.lista_personas[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_persona() {
      if (
        this.persona.documento.length > 0 &&
        this.persona.nombre.length > 0 &&
        this.persona.apellidos.length > 0
      ) {
        axios
          .post(this.url + "personas", this.persona, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_personas();

            this.persona = {
              documento: "",
              tipo_documento: 0,
              nombre: "",
              apellidos: "",
              telefono: "",
              celular: "",
              direccion: "",
              notas: "",
              acciones: true,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    eliminar_persona({ item }) {
      axios
        .delete(`${this.url}personas/${item.Documento}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response);
          let position = this.lista_personas.findIndex(
            (persona) => persona.documento == item.documento
          );
          this.lista_personas.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_persona({ item }) {
      this.validacion_actualizar = true;
      axios
        .get(`${this.url}personas/${item.Documento}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;

          this.inEdition = true;
          this.persona.tipo_documento = datos[0].tipo_documento;
          this.persona.documento = datos[0].documento;
          this.persona.nombre = datos[0].nombre;
          this.persona.apellidos = datos[0].apellidos;
          this.persona.telefono = datos[0].telefono;
          this.persona.celular = datos[0].celular;
          this.persona.direccion = datos[0].direccion;
          this.persona.notas = datos[0].notas;
          this.persona.acciones = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_persona() {
      if (
        this.persona.documento.length > 0 &&
        this.persona.nombre.length > 0 &&
        this.persona.apellidos.length > 0
      ) {
        axios
          .put(`${this.url}personas/${this.persona.documento}`, this.persona, {
            headers: { token: this.token },
          })
          .then((response) => {
            let position = this.lista_personas.findIndex(
              (persona) => persona.documento == this.persona.documento
            );
            this.lista_personas.splice(position, 1, this.persona);
            this.inEdition = false;
            this.mostrar_personas();
            this.persona = {
              documento: "",
              tipo_documento: 0,
              nombre: "",
              apellidos: "",
              telefono: "",
              celular: "",
              direccion: "",
              notas: "",
              acciones: true,
            };
            this.validacion_actualizar = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
  },
};
