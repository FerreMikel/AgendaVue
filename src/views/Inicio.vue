<template>
  <section id="contactos">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2>Contactos</h2>
          <hr class="star-primary" />
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col-xs-4">
            <h4>Nombre</h4>
          </div>
          <div class="col-xs-4">
            <h4>Email</h4>
          </div>
          <div class="col-xs-3">
            <h4>Teléfono</h4>
          </div>
        </div>
        <div class="d-flex justify-content-center row">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div
          v-for="contact in contacts"
          v-bind:key="contact"
          class="row"
          vocab="http://xmlns.com/foaf/0.1/"
          typeof="Person"
        >
          <div class="col-xs-4">
            <p property="name">{{ contact.data().name }}</p>
          </div>
          <div class="col-xs-4">
            <p property="mbox">{{ contact.data().email }}</p>
          </div>
          <div class="col-xs-3">
            <p property="phone">{{ contact.data().tel }}</p>
          </div>
          <div class="col-xs-1">
            <button
              class="btn btn-danger btn-sm"
              v-on:click="eliminarContacto(contact.id)"
            >
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="row no-contacts" v-if="contacts.length == 0">
        <p class="text-center">No se ha encontrado ningún contacto.</p>
        <button
          class="btn btn-success"
          v-on:click="this.$router.push('nuevo-contacto')"
        >
          Añadir contacto
        </button>
      </div>
      <div class="row cerrar-sesion">
        <button class="btn btn-danger" v-on:click="cerrarSesion">
          Cerrar sesión
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { firestore, auth } from "../firebase";
import { getDocs, query, collection, doc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      loading: true,
      contacts: [],
    };
  },
  methods: {
    async loadData() {
      const q = query(
        collection(firestore, `users/${auth.currentUser.uid}/contacts`)
      );
      const contacts = await getDocs(q);
      this.contacts = contacts.docs;
    },
    async eliminarContacto(id) {
      await deleteDoc(
        doc(firestore, `users/${auth.currentUser.uid}/contacts`, id)
      );
      this.loadData();
    },
    cerrarSesion() {
      signOut(auth);
      this.$router.replace("/login");
    },
  },
  async created() {
    await this.loadData();
    this.loading = false;
  },
};
</script>
