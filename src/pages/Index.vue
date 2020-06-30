<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar tarea',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
    <q-card class="row" flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section :class="item.state ? 'tachar' : ''" class="col" v-html="item.text" />
      <q-btn class="q-mr-sm" color="green" @click="item.state = !item.state">Acción</q-btn>
      <q-btn color="red" @click="deleteItem(index)">Eliminar</q-btn>
    </q-card>
    <div class="flex flex-center text-blue-grey-13" v-if="tasks.length == 0 ">
      <h4>Sin notas</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: "",
      tasks: [
       /*  {
          text: "Tarea #1",
          state: false
        },
        {
          text: "Tarea #2",
          state: true
        },
        {
          text: "Tarea #3",
          state: false
        } */
      ]
    };
  },
  methods: {
    saveWork() {
      this.tasks.push({
        text: this.editor,
        state: false
      });
      this.$q.notify({
        message: "Tarea guardada",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
    },
    deleteItem(index) {
      this.$q
        .dialog({
          dark: true,
          title: "Cuidado!!!",
          message: "Desea eliminar el item seleccionado?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.tasks.splice(index, 1);
        });
    }
  }
};
</script>

<style scoped>
.tachar {
  text-decoration: line-through;
}
</style>
