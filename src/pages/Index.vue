<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-if="!editionMode"
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

    <q-editor
      v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Actualizar tarea',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
    <q-card class="row" flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section :class="item.state ? 'tachar' : ''" class="col" v-html="item.text" />
      <!-- <q-btn class="q-mr-sm" color="green" @click="item.state = !item.state">Acción</q-btn> -->
      <q-btn color="yellow-7 q-mr-sm" @click="edit(index, item.id)">Editar</q-btn>
      <q-btn color="red" @click="deleteItem(index, item.id)">Eliminar</q-btn>
    </q-card>
    <div class="flex flex-center text-blue-grey-13" v-if="tasks.length == 0 ">
      <h4>Sin notas</h4>
    </div>
  </div>
</template>

<script>
import { db } from "boot/firebase";
export default {
  data() {
    return {
      editor: "",
      tasks: [],
      index: null,
      editionMode: false,
      id: null
    };
  },
  created() {
    this.listTasks();
  },
  methods: {
    async listTasks() {
      try {
        const resDB = await db.collection("tasks").get();

        resDB.forEach(res => {
          console.log(res.id);
          const task = {
            id: res.id,
            text: res.data().text,
            state: res.data().state
          };
          this.tasks.push(task);
        });
      } catch (error) {
        console.log(error);
      } /* finally {
        this.$q.loading.hide()
      } */
    },
    async saveWork() {
      try {
        const resDB = await db.collection("tasks").add({
          text: this.editor,
          state: false
        });

        this.tasks.push({
          text: this.editor,
          state: false,
          id: resDB.id
        });
        this.editor = "";
        this.$q.notify({
          message: "Tarea guardada",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log(error);
      } /* finally {
        this.$q.loading.hide()
      } */
    },
    deleteItem(index, id) {
      this.$q
        .dialog({
          dark: true,
          title: "Cuidado!!!",
          message: "Desea eliminar el item seleccionado?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            await db
              .collection("tasks")
              .doc(id)
              .delete();
            this.tasks.splice(index, 1);
          } catch (error) {
            console.log(error);
          } /* finally {
            this.$q.loading.hide()
          } */
        });
    },
    edit(index, id) {
      this.editionMode = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].text;
    },
    async updateWork() {
      try {
        const resDB = await db
          .collection("tasks")
          .doc(this.id)
          .update({
            text: this.editor
          });
        this.tasks[this.index].text = this.editor;

        this.$q.notify({
          message: "Tarea Actualizada",
          color: "blue-3",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        console.log();
      } finally {
        this.editionMode = false;
        this.index = null;
        this.id = null;
        this.editor = "";
      }
    }
  }
};
</script>

<style scoped>
.tachar {
  text-decoration: line-through;
}
</style>
