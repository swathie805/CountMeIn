<template>

    <div class="page-container">
      <div class="form-container">
        <h1 class="form-title">Create Event</h1>
  
        <div class="form-group">
          <label>Event Title</label>
          <input v-model="title" type="text" />
        </div>
  
        <div class="form-group">
          <label>Date & Time</label>
          <input v-model="datetime" type="datetime-local" />
        </div>

        <div class="form-group">
            <label>Background Photo (Optional)</label>
            <input id="photo-upload" type="file" accept="image/*" @change="handlePhotoUpload" hidden />
            <label for="photo-upload" class="upload-label">Upload Background Photo</label>

            <div v-if="backgroundPreview" class="image-preview">
                <img :src="backgroundPreview" alt="Background Preview" />
            </div>
        </div>

  
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="description" rows="5" />
        </div>
  
        <div class="form-group">
          <label>Guest Questions</label>
          <div v-for="(question, index) in guestQuestions" :key="index" class="question-entry">
            <input v-model="guestQuestions[index]" type="text" placeholder="Question for guests" />
          </div>
          <button class="add-question-btn" @click="addGuestQuestion">Add Guest Question</button>
        </div>
  
        <div class="form-group">
          <label>Guests</label>
          <div v-for="(guest, index) in guests" :key="index" class="guest-entry">
            <input v-model="guest.name" type="text" placeholder="Guest Name" />
            <button class="add-guest-btn" @click="addGuest" v-if="index === guests.length - 1">Add Guest</button>
          </div>
        </div>
  
        <div class="form-actions">
          <button class="create-button" @click="createEvent">Create Event</button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const datetime = ref('')
const description = ref('')
const guests = ref([{ name: '' }])
const guestQuestions = ref(['']) // allow multiple questions
const backgroundPhoto = ref(null)
const backgroundPreview = ref('')
const router = useRouter();
function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    backgroundPhoto.value = file
    backgroundPreview.value = URL.createObjectURL(file)
  }
}


function addGuest() {
  guests.value.push({ name: '' })
}

function addGuestQuestion() {
  guestQuestions.value.push('')
}

function createEvent() {
  console.log('Event Created:', {
    title: title.value,
    datetime: datetime.value,
    description: description.value,
    guests: guests.value,
    questions: guestQuestions.value,
    backgroundPhoto: backgroundPhoto.value,
  })

  alert("Event Created!")
  
  alert("Link: http://192.168.2.16:8080/GuestRegister");

  router.push("/MyEvents");
}

</script>

  
<style scoped>
.page-container {
  background-color: #e0f7ff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-container {
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
}

.form-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 2rem;
}

label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: #3b82f6;
  outline: none;
}

.question-entry {
  margin-bottom: 1rem;
}

.guest-entry {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.add-guest-btn,
.add-question-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.add-guest-btn:hover,
.add-question-btn:hover {
  background-color: #2563eb;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.create-button {
  background-color: #10b981;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #059669;
}

.upload-label {
  display: inline-block;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.upload-label:hover {
  background-color: #2563eb;
}

.image-preview {
  margin-top: 1rem;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
