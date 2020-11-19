<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'index' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'personas' }" active>Personas</b-nav-item>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <b-container>
      <b-form action="javascript:void(0)" @submit="crear_persona()">
        <b-form-group label="Tipo de Documento">
          <b-form-select
            v-model="persona.tipo_documento"
            :options="lista_tipos_documentos"
          ></b-form-select>
        </b-form-group>

        <b-form-group @submit.stop.prevent label="Documento" label-for="id">
          <b-form-input
            class="form-control"
            v-model="persona.documento"
            type="number"
            placeholder="Ingrese su identificación"
            id="id"
          />

          <b-form-invalid-feedback :state="validar_id"
            >Campo obligatorio</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input
            class="form-control"
            v-model="persona.nombre"
            placeholder="Ingrese su nombre"
            id="nombre"
          />
          <b-form-invalid-feedback :state="validar_nombre"
            >Campo obligatorio</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          @submit.stop.prevent
          label="Apellido"
          label-for="apellido"
        >
          <b-form-input
            class="form-control"
            v-model="persona.apellidos"
            placeholder="Ingrese su apellido"
            id="apellido"
          />
          <b-form-invalid-feedback :state="validar_apellido"
            >Campo obligatorio</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Teléfono" label-for="telefono">
          <b-form-input
            class="form-control"
            v-model="persona.telefono"
            placeholder="Ingrese su teléfono"
            id="telefono"
          />
        </b-form-group>

        <b-form-group label="Celular" label-for="celular">
          <b-form-input
            class="form-control"
            v-model="persona.celular"
            placeholder="Ingrese su teléfono"
            id="celular"
          />
        </b-form-group>

        <b-form-group label="Direccón" label-for="direccion">
          <b-form-input
            class="form-control"
            v-model="persona.direccion"
            placeholder="Ingrese su dirección"
            id="direccion"
          />
        </b-form-group>

        <b-form-textarea
          id="textarea"
          v-model="persona.notas"
          placeholder="Notas..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <br />
        <b-button type="submit" block variant="danger" v-if="!inEdition"
          >Crear persona</b-button
        >
        <b-button @click="actualizar_persona()" block variant="danger" v-else
          >Actualizar persona</b-button
        >
      </b-form>
      <br />

      <b-table striped hover :items="lista_personas">
        <template v-slot:cell(acciones)="row">
          <b-button
            size="sm"
            @click="cargar_persona(row)"
            class="mr-2"
            variant="danger"
            >Modificar</b-button
          >
          <b-button size="sm" @click="eliminar_persona(row)" class="mr-2"
            >Eliminar</b-button
          >
        </template>
      </b-table>

      <br />
    </b-container>
  </div>
</template>
<script src="../assets/personas.js" />
