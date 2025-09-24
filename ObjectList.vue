<template>
  <div class="list-container">
    <div class="top-bar">
      <input 
        v-model="search" 
        placeholder="🔍 搜尋物件" 
        class="search-box"
      />
      <button @click="toggleForm" class="btn btn-green">
        ➕ 新增物件
      </button>
    </div>

    <!-- 表單 -->
    <ObjectForm 
      v-if="showForm" 
      :editItem="editItem" 
      @save="saveObject" 
      @cancel="cancelForm"
    />

    <!-- 物件列表 -->
    <div class="card-list">
      <div v-for="(obj, index) in filteredObjects" :key="index" class="card">
        <p><strong>名稱：</strong>{{ obj.name }}</p>
        <p><strong>描述：</strong>{{ obj.description }}</p>
        <div class="actions">
          <button @click="editObject(index)" class="btn btn-blue">✏️ 編輯</button>
          <button @click="deleteObject(index)" class="btn btn-red">🗑 刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectForm from './ObjectForm.vue'

export default {
  name: 'ObjectList',
  components: { ObjectForm },
  data() {
    return {
      objects: JSON.parse(localStorage.getItem('objects')) || [],
      search: '',
      showForm: false,
      editIndex: null,
      editItem: null
    }
  },
  computed: {
    filteredObjects() {
      return this.objects.filter(obj =>
        obj.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    toggleForm() {
      this.showForm = true
      this.editItem = null
      this.editIndex = null
    },
    saveObject(obj) {
      if (this.editIndex !== null) {
        this.objects[this.editIndex] = obj
      } else {
        this.objects.push(obj)
      }
      this.updateStorage()
      this.showForm = false
    },
    editObject(index) {
      this.editItem = { ...this.objects[index] }
      this.editIndex = index
      this.showForm = true
    },
    deleteObject(index) {
      this.objects.splice(index, 1)
      this.updateStorage()
    },
    cancelForm() {
      this.showForm = false
      this.editItem = null
      this.editIndex = null
    },
    updateStorage() {
      localStorage.setItem('objects', JSON.stringify(this.objects))
    }
  }
}
</script>

<style>
.list-container {
  max-width: 800px;
  margin: 0 auto;
  background: #ffffffcc;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-box {
  flex: 1;
  padding: 10px;
  border: 2px solid #3a7bd5;
  border-radius: 8px;
  margin-right: 10px;
  font-size: 16px;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: transform 0.2s;
}
.btn:hover {
  transform: scale(1.05);
}
.btn-green {
  background: #28a745;
}
.btn-blue {
  background: #007bff;
}
.btn-red {
  background: #dc3545;
}
</style>
