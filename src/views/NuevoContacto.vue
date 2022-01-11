<template>
  <section id="nuevo-contacto">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2>Nuevo contacto</h2>
          <hr class="star-primary" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <form @submit.prevent="anadirContacto" novalidate>
            <div class="row control-group">
              <div
                class="form-group col-xs-12 floating-label-form-group controls"
              >
                <label>Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  required
                  v-model="form.name"
                />
              </div>
            </div>
            <div class="row control-group">
              <div
                class="form-group col-xs-12 floating-label-form-group controls"
              >
                <label>Correo electrónico</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Correo electrónico"
                  required
                  autofocus
                  v-model="form.email"
                />
              </div>
            </div>
            <div class="row control-group">
              <div
                class="form-group col-xs-12 floating-label-form-group controls"
              >
                <label>Telefono</label>
                <input
                  type="tel"
                  class="form-control"
                  placeholder="Teléfono"
                  required
                  v-model="form.tel"
                />
              </div>
            </div>
            <br />
            <div id="success"></div>
            <div class="row">
              <div class="form-group col-xs-12">
                <button type="submit" class="btn btn-success btn-lg">
                  Guardar
                </button>
              </div>
            </div>
            <div v-if="error != ''" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { firestore, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import useVuelidate from "@vuelidate/core";
import { required, email, integer } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        tel: null,
      },
      error: "",
    };
  },
  validations() {
    return {
      form: {
        name: { required },
        email: { required, email },
        tel: { required, integer },
      },
    };
  },
  methods: {
    async anadirContacto() {
      if (
        this.form.name.length == 0 ||
        this.form.email.length == 0 ||
        this.form.tel.length == 0
      ) {
        this.error = "Rellena todos los campos";
        return;
      }
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.error =
          "Formato incorrecto. Revisa el correo electrónico y el teléfono";
        return;
      }
      await addDoc(
        collection(firestore, `users/${auth.currentUser.uid}/contacts`),
        this.form
      );
      this.$router.push("/");
    },
  },
};
</script>
