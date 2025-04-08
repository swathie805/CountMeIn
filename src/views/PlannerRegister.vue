<template>
    <div class="page-container">
        <img
        id="bg-image"
        :src="`https://media.istockphoto.com/id/1364376802/vector/glow-modern-background-blur.jpg?s=612x612&w=0&k=20&c=SBOz5Ge_Q_jidQ--q2Cud70BJk8AOcdnWFRT1jh65BQ=`"
        alt=""
        />
        <div class="auth-container">
            <div id="login">
                <h2>Sign In</h2>
                <form class="setup" @submit.prevent="loginIn">
                    <input v-model="email" type="email" placeholder="email" />
                    <input v-model="password" type="password" placeholder="Enter Password"/>
                    <p v-if="errMsg">{{ errMsg }}</p>
                    <input class="btn" type="submit" value="Login" />
                </form>
            </div>
            <div class="vl"></div>
            <div class="register">
                <h2>Register via Email</h2>
                <form class="setup" @submit.prevent="registerViaEmail" >
                    <input v-model="email" type="email" placeholder="email" />
                    <input v-model="password" type="password" placeholder="Enter Password"/>
                    <input class="btn" type="submit" value="Register" />
                </form>
                <img
                    class="google-login"
                    @click="registerViaGoogle()"
                    src="https://cdn-icons-png.flaticon.com/512/270/270014.png"
                />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router'; // import router
    import { getAuth, 
        createUserWithEmailAndPassword, 
        GoogleAuthProvider, 
        signInWithPopup,
        signInWithEmailAndPassword } from "firebase/auth";
    const email = ref("");
    const errMsg = ref(); // ERROR MESSAGE
    const router = useRouter(); //get a reference to our vue router 
    const password = ref("");

    const registerViaEmail = async () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Successfully registered!");
        console.log(auth.currentUser);
        router.push('/MyEvents'); // redirect to planners events 
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
    };

    const registerViaGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push('/MyEvents'); // redirect to planners events
        })
        .catch((error) => {
            console.log(error.code);
        });
    }
    
    const loginIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            console.log("Successfully signed in!");
            console.log(auth.currentUser);
            router.push('/MyEvents'); // redirect to planners events 
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
                case "auth/user-not-found":
                errMsg.value = "No account with tht email was found";
                break;
                case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
                default:
                errMsg.value = "Email or password was incorrect";
                break;
            }
        });
    };
</script>

<style scoped>
.page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

#bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.auth-container {
  border-radius: 10px;
  padding: 40px 30px;
  font-family: sans-serif;
  color: white;
  background-color: rgba(177, 182, 255, 0.25);
  backdrop-filter: blur(5px);
  box-shadow: -10px 10px 20px rgba(130, 115, 151, 0.5);
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  align-items: center;
}

.vl {
  border-left: 2px solid white;
  height: 400px;
  display: none; /* Hidden by default on mobile */
}

.setup {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 350px;
}

input {
  padding: 12px 15px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);
}

input:focus {
  outline: 2px solid #4c91af;
}

.error-message {
  color: #ff6b6b;
  margin: -0.5rem 0;
  font-size: 14px;
}

.btn {
  background-color: rgb(3, 22, 85);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn:hover {
  background-color: #cddcff;
  color: rgb(1, 1, 48);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(124, 131, 165, 0.5);
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: all 0.3s ease;
}

.google-btn:hover {
  background: #f1f1f1;
}

.google-login {
  width: 30px;
  height: 30px;
}

.register h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .auth-container {
    flex-wrap: nowrap;
    padding: 60px 40px;
  }
  
  .vl {
    display: block; /* Show vertical line on larger screens */
  }
  
  #login {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 30px 20px;
    gap: 30px;
  }
  
  .btn, input {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>