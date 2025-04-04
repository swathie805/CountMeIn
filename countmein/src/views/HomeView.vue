<template>
    <div class="home">
      <!-- Navigation bar -->
      <nav class="navbar">
        <button @click="navigateToRegister" class="btn primary">Plan an event</button>
      </nav>

      <!-- Main Content -->
      <div class="hero">
        <h1>Welcome to CountMeIn</h1>
        <p>Your one-stop platform for managing events and RSVPs</p>
      </div>
      
      <!-- Features Section -->
      <section class="features">
        <h2>Features</h2>
        <ul>
          <li>Create and manage events</li>
          <li>Send invitations</li>
          <li>Track RSVPs</li>
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
</script>
  
  <style scoped>
  .home {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  
  /*Navigation bar */
  .navbar{
    position: absolute;
    top: 20px;
    right: 20px;
  }

  /* Hero Section */
  .hero {
    margin-top: 50px;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .features {
    margin: 2rem 0;
    text-align: left;
    display: inline-block;
  }

  .ul{
    list-style: none;
    padding: 0;
  }

  li{
    margin-bottom: 0.5 rem;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }

  .primary {
    background-color: #4c91af;
    color: white;
  }

  .primary:hover{
    background-color: #4556a0;
  }
</style>