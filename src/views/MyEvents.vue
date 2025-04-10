

<template>
  <div class="page-container">
    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <router-link to="/MyEvents">My Events</router-link>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
      <button @click="eventCreation">Create Event</button>
    </nav>

    <!-- Events Section -->
    <div class="events-container">
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="event-card"
      >
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p><strong>Date:</strong> {{ event.datetime }}</p>

        <div class="button-row">
          <button @click="editEvent()">Edit</button>
          <button @click="deleteEvent(event.id)">Delete</button>
        </div>

        <div class="responses-section" v-if="event.responses && event.responses.length">
          <h3>Guest Responses</h3>
          <div 
            class="response" 
            v-for="(resp, i) in event.responses" 
            :key="i"
          >
            <h4>{{ resp.guestName }}</h4>
            <ul>
              <li 
                v-for="(answer, qIndex) in resp.answers" 
                :key="qIndex"
              >
                <strong>{{ event.questions[qIndex] }}:</strong> {{ answer }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

// Simulated auth state (you can toggle this manually if needed)
const isLoggedIn = ref(true)

// Hardcoded sample events – update or add your own here
const events = ref([
  {
    id: '1',
    title: "Swathie's Birthday 🥳",
    description: "For a celebration of Swathie's 20th birthday!",
    datetime: '2025-05-01 13:00',
    questions: ['What snacks are you bringing?', 'Any allergies?'],
    responses: [
      {
        guestName: 'Nevaeh',
        answers: ['Strawberry cake', 'No allergies']
      },
      {
        guestName: 'Ayusha',
        answers: ['Pocky', 'None']
      }
    ]
  },
  {
    id: '2',
    title: 'Book Club Meeting',
    description: 'We will be discussing Chapter 23 of Dracula',
    datetime: '2025-06-10 18:00',
    questions: ['Did you read the chapter?', 'Future book recommendations?'],
    responses: [
      {
        guestName: 'Ruth',
        answers: ['Yes!', 'Frankenstein']
      }
    ]
  }
])

const router = useRouter()

const handleSignOut = () => {
  isLoggedIn.value = false
  router.push("/")
}

const eventCreation = () => {
  router.push("/CreateEvent")
}

const editEvent = () => {
  router.push('/CreateEvent')
}

const deleteEvent = (eventId) => {
  events.value = events.value.filter(event => event.id !== eventId)
}
</script>

<style> 
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>

<style scoped>
.events-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.event-card {
  background: #b2d4ee;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  padding: 2rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.responses-section {
  margin-top: 2rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
}

.response h4 {
  margin-bottom: 0.5rem;
}

.nav-bar {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: #e0f0ff;
  border-bottom: 2px solid #b2d4ee;
  border-radius: 0 0 1rem 1rem;
  font-weight: bold;
}

.nav-bar a,
.nav-bar button {
  text-decoration: none;
  color: #1c2e4a;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-bar button:hover,
.nav-bar a:hover {
  color: #0a69a6;
  text-decoration: underline;
}
</style>
