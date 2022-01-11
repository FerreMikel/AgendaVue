<template>
  <div class="login-box">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2>Regístrate</h2>
          <hr class="star-primary" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <form @submit.prevent="signUp" novalidate>
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
                <label>Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                  v-model="form.password"
                />
              </div>
            </div>
            <br />
            <div id="success"></div>
            <div class="row">
              <div class="form-group col-xs-12">
                <button type="submit" class="btn btn-success btn-lg">
                  Registrarse
                </button>
              </div>
            </div>
            <div v-if="error != ''" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </form>
          <div class="login-signup-card">
            <p>¿Ya tienes una cuenta?</p>
            <a v-on:click="this.$router.push('/login')">Iniciar sesión</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    signUp() {
      if (this.form.email.length == 0 || this.form.password.length == 0) {
        this.error = "Rellena todos los campos";
        return;
      }
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "inicio" });
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              this.error = "Correo electrónico no válido";
              break;
            case "auth/email-already-in-use":
              this.error = "Ya existe una cuenta con ese correo electrónico";
              break;
            case "auth/weak-password":
              this.error = "La contraseña introducida es demasiado débil";
              break;
            case "auth/operation-not-allowed":
              this.error = "La creación de cuentas está suspendida";
              break;

            default:
              this.error = "Ocurrió un problema en el registro";
              console.log(err);
              break;
          }
        });
    },
  },
};
</script>