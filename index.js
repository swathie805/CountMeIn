import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import PlannerRegister from "../views/PlannerRegister.vue";
import MyEvents from "../views/MyEvents.vue";
import CreateEvent from "@/views/CreateEvent.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: HomeView
        },
        { 
            path: '/login', 
            component: PlannerRegister
        },
        { 
            path: '/MyEvents', 
            component: MyEvents,
            meta: {
                requiresAuth: true,
            },
        },

        // add new page here
        { 
            path: '/CreateEvent',
            component: CreateEvent,
            meta: {
                requiresAuth: true,
            }
        },


    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async(to, from, next) => {
   if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
        next();
    } else {
        alert("you don't have access!");
        next("/");
    }
   } else {
    next();
   } 
});
export default router;