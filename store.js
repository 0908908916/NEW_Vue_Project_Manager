import { reactive } from "vue";

export const store = reactive({
  objects: JSON.parse(localStorage.getItem("objects")) || [],

  addObject(obj) {
    obj.id = Date.now();
    this.objects.push(obj);
    this.save();
  },

  updateObject(updatedObj) {
    const index = this.objects.findIndex((o) => o.id === updatedObj.id);
    if (index !== -1) {
      this.objects[index] = updatedObj;
      this.save();
    }
  },

  deleteObject(id) {
    this.objects = this.objects.filter((o) => o.id !== id);
    this.save();
  },

  save() {
    localStorage.setItem("objects", JSON.stringify(this.objects));
  },
});
