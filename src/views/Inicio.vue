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
        <div v-for="contact in contacts" v-bind:key="contact" class="row">
          <div class="col-xs-4">
            <p>{{ contact.data().name }}</p>
          </div>
          <div class="col-xs-4">
            <p>{{ contact.data().email }}</p>
          </div>
          <div class="col-xs-3">
            <p>{{ contact.data().tel }}</p>
          </div>
          <div class="col-xs-1">
            <button class="btn btn-danger btn-sm">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="row no-contacts" v-if="contacts.length == 0">
          <p class="text-center">No se ha encontrado ningún contacto.</p>
          <button class="btn btn-success">Añadir contacto</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { firestore, auth } from "../firebase";
import { getDocs, query, collection } from "firebase/firestore";

export default {
  data() {
    return {
      loading: true,
      contacts: [],
    };
  },
  async created() {
    const q = query(
      collection(firestore, `users/${auth.currentUser.uid}/contacts`)
    );
    const contacts = await getDocs(q);
    this.contacts = contacts.docs;
    this.loading = false;
  },
};
</script>
