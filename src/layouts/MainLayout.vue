<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Todo Windows</q-toolbar-title>

        <div>OSO 🐻</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Menu de Navegación</q-item-label>
      <q-item clickable to="/">
        <q-item-section avatar>
          <q-icon name="school"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Todo</q-item-label>
        </q-item-section>
      </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "MainLayout",

  components: {
      
      },

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
