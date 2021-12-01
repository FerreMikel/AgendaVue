<template>
  <div class="login-box">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2>Iniciar sesión</h2>
          <hr class="star-primary" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <form @submit.prevent="login" novalidate>
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
                <p class="help-block text-danger"></p>
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
                <p class="help-block text-danger"></p>
              </div>
            </div>
            <br />
            <div id="success"></div>
            <div class="row">
              <div class="form-group col-xs-12">
                <button type="submit" class="btn btn-success btn-lg">
                  Iniciar sesión
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
  </div>
</template>

<script>
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

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
    login() {
      if (this.form.email.length == 0 || this.form.password.length == 0) {
        this.error = "Rellena todos los campos";
        return;
      }
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "inicio" });
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              this.error = "Correo electrónico no válido";
              break;
            case "auth/user-disabled":
              this.error = "Tu cuenta ha sido deshabilitada";
              break;
            case "auth/user-not-found":
              this.error =
                "No existe ninguna cuenta con ese correo electrónico";
              break;
            case "auth/wrong-password":
              this.error = "Contraseña incorrecta";
              break;

            default:
              this.error = "Ocurrió un al iniciar sesión";
              console.log(err);
              break;
          }
        });
    },
  },
};
</script>