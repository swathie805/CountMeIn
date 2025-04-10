<template>
    <div class="home">
      <!-- Navigation bar -->
      <nav class="navbar">
        <button @click="navigateToRegister" class="btn primary">Plan an event</button>
        <!-- <button @click="navigateToGuest" class="btn primary">RSVP here</button> -->
      </nav>

      <!-- Main Content -->
      <div class="hero">
        <h1>Welcome to CountMeIn</h1>
        <p>Your one-stop platform for managing events and RSVPs</p>
        <h2>Create Your Event. Share the Link. Count Me In.</h2>
      </div>
      
      <!-- Features Section -->
      <section class="features">
        <h2>A New Way to Plan</h2>
        <ul>
          <li>Create custom events</li>
          <li>Link invitations</li>
          <li>Track guest responses</li>
          <li>Manage attendees</li>
        </ul>
      </section>
    </div>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const navigateToRegister = () => {
    console.log('Attempting navigation to login page');
    router.push('/login');
  }

  // const navigateToGuest = () => {
  //   console.log('Attempting navigation to guest page');
  //   router.push('/GuestRegister');
  // }

</script>
  
<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1c2e4a;
}

/* Navigation bar */
.navbar {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
}

/* Hero Section */
.hero {
  margin-top: 6rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0a69a6;
}

p {
  font-size: 1.2rem;
  color: #333;
}

/* Features Section */
.features {
  margin: 3rem auto;
  text-align: left;
  display: inline-block;
  background-color: #e0f0ff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.features h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1c2e4a;
}

.features ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.features li {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 15px 30px;
  font-size: 1.1rem;
  margin: 0 10px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: #4c91af;
  color: white;
}

.primary:hover {
  background-color: #3a7794;
}
</style>
