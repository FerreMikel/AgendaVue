<template>
  <!-- Navigation -->
  <nav
    v-if="$route.name !== 'login'"
    class="navbar navbar-default navbar-fixed-top"
  >
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header page-scroll">
        <button
          type="button"
          class="navbar-toggle"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
        >
          <span class="sr-only">Cambiar navegación</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#page-top">AgendaVue</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li class="hidden">
            <a href="#page-top"></a>
          </li>
          <li class="page-scroll" v-on:click="this.$router.push('/')">
            <a>Contactos</a>
          </li>
          <li
            class="page-scroll"
            v-on:click="this.$router.push('nuevo-contacto')"
          >
            <a>Añadir contacto</a>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
  <router-view />
  <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
  <div
    v-if="$route.name !== 'login'"
    class="scroll-top page-scroll visible-xs visible-sm"
  >
    <a class="btn btn-primary" href="#page-top">
      <i class="fa fa-chevron-up"></i>
    </a>
  </div>
</template>
