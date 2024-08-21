<template>
  <section className="w-full h-full flex  items-center justify-center">
    <aside
      className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-[80%] h-full lg:my-12 xl:my-8 py-3 md:py-5 lg:py-3 bg-white rounded-2xl"
    >
      <div className="w-full h-full flex items-center justify-center ">
        <aside className="w-[95%] h-[95%] bg-[#d0df44] rounded-lg">
          <img src="login-bg.png" alt="broken-img" />
        </aside>
      </div>
      <div className="flex items-center justify-center w-full h-full ">
        <aside className="flex flex-col w-[95%] h-[95%] rounded-lg gap-8">
          <div
            className="w-full flex flex-col justify-center items-center pt-6 "
          >
            <h1 className="font-semibold text-3xl">Welcome Back</h1>
            <p className="text-gray-400">to</p>
            <h1
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-3xl md:text-3xl font-semibold"
            >
              Meal Planner
            </h1>
          </div>
          <div
            className="w-full flex flex-col justify-center items-center gap-2"
          >
            <aside
              className="w-full flex flex-col justify-start items-start gap-1"
            >
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                v-model="email"
                className="pl-4 w-[97%] border border-blue-400 outline-none py-4 rounded-md"
              />
            </aside>
            <aside
              className="w-full flex flex-col justify-start items-start gap-1"
            >
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                v-model="password"
                className="pl-4
              w-[97%] border border-blue-400 outline-none py-4 rounded-md"
              />
            </aside>
            <button
              className="hover:bg-blue-600 cursor-pointer mt-4 w-[85%] bg-blue-500 rounded-full text-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-12 flex items-center justify-center"
              @click="login"
            >
              Login
            </button>

            <p className="font-medium">
              Don't have an account, Please
              <router-link to="/signup">
                <span class="text-blue-500 cursor-pointer">Sign Up</span>
              </router-link>
              here
            </p>
          </div>
        </aside>
      </div>
    </aside>
  </section>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(
          'https://dashboard-backend-rtln.onrender.com/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          }
        );
        if (!response.ok) {
          throw new Error('Login failed, please check your credentials.');
        }
        const data = await response.json();
        console.log('login Data>>>>', data);
        this.toast.success('Login successful!', {
          position: 'top-right',
          timeout: 3000
        });
        this.$router.push('/dashboard');
        // Redirect to another page or perform additional actions
        // For example: this.$router.push('/dashboard');
      } catch (error) {
        this.toast.error('Login failed: ' + error.message, {
          position: 'top-right',
          timeout: 3000
        });
      }
    }
  }
};
</script>
