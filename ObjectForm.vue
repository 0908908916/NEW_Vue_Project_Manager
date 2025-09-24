<template>
  <div class="form-card">
    <h3>{{ editItem ? '✏️ 編輯物件' : '➕ 新增物件' }}</h3>
    <form @submit.prevent="handleSubmit">
      <label>名稱：</label>
      <input v-model="form.name" required class="input-box" />

      <label>描述：</label>
      <textarea v-model="form.description" required class="input-box"></textarea>

      <div class="form-actions">
        <button type="submit" class="btn btn-green">💾 儲存</button>
        <button type="button" @click="$emit('cancel')" class="btn btn-red">❌ 取消</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ObjectForm',
  props: ['editItem'],
  data() {
    return {
      form: this.editItem ? { ...this.editItem } : { name: '', description: '' }
    }
  },
  watch: {
    editItem: {
      immediate: true,
      handler(newVal) {
        this.form = newVal ? { ...newVal } : { name: '', description: '' }
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('save', this.form)
    }
  }
}
</script>

<style>
.form-card {
  background: #f8f9fa;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}

h3 {
  margin-bottom: 15px;
  color: #333;
}

.input-box {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
