<template>
    <div class="register-container" :style="backgroundStyle">
      <div class="register-card">
        <h1>{{ event.title }}</h1>
        <p><strong>Date & Time:</strong> {{ event.datetime }}</p>
        <p>{{ event.description }}</p>
  
        <div class="form-group">
          <label>Select Your Name</label>
          <select v-model="selectedGuest">
            <option disabled value="">-- Choose Your Name --</option>
            <option v-for="guest in event.guests" :key="guest.name" :value="guest.name">
              {{ guest.name }}
            </option>
          </select>
        </div>
  
        <div class="form-group" v-for="(q, index) in event.questions" :key="index">
          <label>{{ q }}</label>
          <input type="text" v-model="answers[index]" placeholder="Your answer" />
        </div>
  
        <button @click="submitResponse">Submit</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
  
  const db = getFirestore()
  const route = useRoute()
  const eventId = route.params.id
  
  const event = ref({
    title: '',
    datetime: '',
    description: '',
    guests: [],
    questions: [],
    backgroundPhoto: ''
  })
  
  const selectedGuest = ref('')
  const answers = ref([])
  
  const backgroundStyle = computed(() => ({
    backgroundImage: event.value.backgroundPhoto ? `url(${event.value.backgroundPhoto})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }))
  
  onMounted(async () => {
    const docSnap = await getDoc(doc(db, 'events', eventId))
    if (docSnap.exists()) {
      event.value = docSnap.data()
      answers.value = Array(event.value.questions.length).fill('')
    }
  })
  
  const submitResponse = async () => {
    if (!selectedGuest.value) return alert('Please select your name.')
  
    const response = {
      guestName: selectedGuest.value,
      answers: answers.value,
    }
  
    // Add response to Firestore
    const eventRef = doc(db, 'events', eventId)
    await updateDoc(eventRef, {
      responses: arrayUnion(response) // Save response in the event document
    })
  
    alert('Response submitted!')
  }
  </script>
  
  <style scoped>
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f0f8ff;
  }
  
  .register-card {
    background-color: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  select, input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }
  
  button {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #059669;
  }
  </style>
  