<template>
  <div class="list-card">
    <h2 class="title">📦 物件列表</h2>

    <!-- 新增區塊 -->
    <div class="form-row">
      <input v-model="newName" type="text" placeholder="輸入物件名稱" class="input" />
      <input v-model="newDesc" type="text" placeholder="輸入描述" class="input" />
      <input v-model="newDate" type="date" class="input" />
      <input v-model="newTime" type="time" class="input" />
      <button @click="addObject" class="btn add">➕ 新增</button>
    </div>

    <!-- 物件列表 -->
    <ul>
      <li v-for="(obj, index) in objects" :key="obj.id" class="item">
        <div class="item-info">
          <template v-if="editingIndex === index">
            <input v-model="editName" class="edit-input" />
            <input v-model="editDesc" class="edit-input" />
            <input v-model="editDate" type="date" class="edit-input" />
            <input v-model="editTime" type="time" class="edit-input" />
          </template>
          <template v-else>
            <strong>{{ obj.name }}</strong> - {{ obj.description }}
            <br />
            <small class="datetime">{{ obj.date }} {{ obj.time }}</small>
          </template>
        </div>
        <div class="actions">
          <template v-if="editingIndex === index">
            <button class="btn save" @click="saveEdit(index)">💾 儲存</button>
            <button class="btn cancel" @click="cancelEdit">❌ 取消</button>
          </template>
          <template v-else>
            <button class="btn edit" @click="startEdit(index)">✏️ 編輯</button>
            <button class="btn delete" @click="removeObject(index)">🗑 刪除</button>
          </template>
        </div>
      </li>
    </ul>

    <p v-if="objects.length === 0" class="empty">尚未新增任何物件</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objects: JSON.parse(localStorage.getItem("objects")) || [],
      newName: "",
      newDesc: "",
      newDate: "",
      newTime: "",
      editingIndex: null,
      editName: "",
      editDesc: "",
      editDate: "",
      editTime: ""
    }
  },
  methods: {
    saveData() {
      localStorage.setItem("objects", JSON.stringify(this.objects))
    },
    addObject() {
      if (!this.newName.trim()) return alert("名稱不能為空")
      const obj = {
        id: Date.now(),
        name: this.newName,
        description: this.newDesc,
        date: this.newDate,
        time: this.newTime
      }
      this.objects.push(obj)
      this.saveData()
      this.newName = ""
      this.newDesc = ""
      this.newDate = ""
      this.newTime = ""
    },
    removeObject(index) {
      this.objects.splice(index, 1)
      this.saveData()
    },
    startEdit(index) {
      const obj = this.objects[index]
      this.editingIndex = index
      this.editName = obj.name
      this.editDesc = obj.description
      this.editDate = obj.date
      this.editTime = obj.time
    },
    saveEdit(index) {
      const obj = this.objects[index]
      obj.name = this.editName
      obj.description = this.editDesc
      obj.date = this.editDate
      obj.time = this.editTime
      this.editingIndex = null
      this.saveData()
    },
    cancelEdit() {
      this.editingIndex = null
    }
  }
}
</script>

<style scoped>
.list-card {
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  color: #333;
  width: 100%;
  max-width: 600px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.input, .edit-input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  font-size: 0.95rem;
}

ul {
  list-style: none;
  padding: 0;
}

.item {
  background: #ffffffcc;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

/* 彩色按鈕 */
.btn.add { background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; }
.btn.add:hover { background: linear-gradient(135deg, #11998e, #38ef7d); }

.btn.edit { background: linear-gradient(135deg, #f6d365, #fda085); color: white; }
.btn.edit:hover { background: linear-gradient(135deg, #ff9a9e, #fecfef); }

.btn.delete { background: linear-gradient(135deg, #ff758c, #ff7eb3); color: white; }
.btn.delete:hover { background: linear-gradient(135deg, #ff4e50, #f9d423); }

.btn.save { background: linear-gradient(135deg, #6a11cb, #2575fc); color: white; }
.btn.save:hover { background: linear-gradient(135deg, #2575fc, #6a11cb); }

.btn.cancel { background: linear-gradient(135deg, #ff9966, #ff5e62); color: white; }
.btn.cancel:hover { background: linear-gradient(135deg, #ff5e62, #ff9966); }

.empty {
  text-align: center;
  color: #fff;
  font-style: italic;
}

.datetime {
  color: #555;
  font-size: 0.8rem;
}
</style>
