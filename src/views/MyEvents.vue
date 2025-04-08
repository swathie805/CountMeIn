<template>
    <div class="page-container">
      <!-- Navigation Bar -->
      <nav class="nav-bar">
        <router-link to="/MyEvents">My Events</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
        <button @click="eventCreation">Create Events</button>
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
            <button @click="editEvent(event.id)">Edit</button>
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
  import { onMounted, ref } from 'vue';
  import { getAuth, onAuthStateChanged, signOut, } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { getFirestore, collection,  getDocs, } from 'firebase/firestore';

  const router = useRouter();
  const isLoggedIn = ref(false);
  const events = ref([]);
  const db = getFirestore();

  let auth;
  onMounted(async () => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });

    const eventsSnapshot = await getDocs(collection(db, 'events'));
    events.value = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  const eventCreation = () => {
    router.push("/CreateEvent");
  };
</script>

<!--   
  
<script setup>
    import { onMounted, ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut, getDoc, getDocs, doc, db, eventId, collection, events } from "firebase/auth";
    import { useRouter } from "vue-router";

    const router = useRouter(); //get a reference to our vue router 
    const isLoggedIn = ref(false);

    let auth;
    onMounted(async () => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                isLoggedIn.value = true;
            } else {
                isLoggedIn.value = false;
            }
        });

        const eventsSnapshot = await getDocs(collection(db, 'events'))
        events.value = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }))

    });
    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push("/");
        });
    }
    const eventCreation = () => {
        router.push("/CreateEvent");
    }

    //const docSnap = await getDoc(doc(db, 'events', eventId))
    //const responses = docSnap.data().responses || []

</script> -->

<style scoped>
.events-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.event-card {
  background: white;
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