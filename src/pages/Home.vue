<template>
  <section class="flex flex-col w-full">
    <div class="flex flex-row justify-between w-full px-10 mt-12">
      <div class="flex flex-row items-start justify-center gap-8">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Meals..."
          class="py-2 pl-4 border border-black rounded-full outline-none w-80"
        />

        <input
          type="date"
          v-model="startDate"
          class="py-2 pl-4 border border-black rounded-full outline-none w-80"
        />
      </div>

      <div class="flex flex-row items-center justify-center gap-4">
        <router-link
          to="/weekly-meal"
          class="px-6 py-2 text-white bg-purple-500 rounded-md"
        >
          Weekly Planned Calendar
        </router-link>

        <button
          @click="
            showModal = true;
            isEditMode = false;
            currentMeal = {
              img: '',
              name: '',
              Calories: '',
              ingredient: '',
              date: ''
            };
          "
          class="px-4 py-2 text-white bg-green-600 border-none rounded-md outline-none"
        >
          Add Meal
        </button>
      </div>

      <!-- Use AddMeal component -->
      <AddMeal
        v-if="showModal"
        :isVisible="showModal"
        :meal="currentMeal"
        :isEditMode="isEditMode"
        @close="showModal = false"
        @add-meal="addMeal"
        @edit-meal="editMeal"
      />
    </div>
    <div class="grid items-center justify-center w-full grid-cols-3 gap-5 p-10">
      <div
        v-for="(item, index) in filteredMeals"
        :key="index"
        class="h-96 rounded-md flex flex-col gap-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white"
      >
        <div class="w-full h-52">
          <img
            :src="item.img"
            :alt="item.name"
            class="object-cover w-full h-full rounded-t-md"
          />
        </div>
        <div
          class="flex flex-row items-center justify-between w-full px-4 my-2"
        >
          <button
            @click="deleteMeal(index)"
            class="px-6 py-2 text-white bg-red-400 rounded-md"
          >
            Delete
          </button>
          <button
            @click="openEditModal(item, index)"
            class="px-8 py-2 text-white bg-purple-600 rounded-md"
          >
            Edit
          </button>
        </div>
        <div class="pl-4">
          <h2>
            <span class="font-semibold">Meal Name:</span>
            <span> {{ item.name }}</span>
          </h2>
          <p>
            <span class="font-semibold">Calories:</span>
            <span class="text-sm text-gray-600">{{ item.Calories }}</span>
          </p>
          <p>
            <span class="font-semibold"> Ingredients:</span>
            <span class="text-sm text-gray-600">{{ item.ingredient }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddMeal from '@/components/AddMeal.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'HomePage',
  components: {
    AddMeal
  },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      currentMealIndex: null,
      currentMeal: {
        img: '',
        name: '',
        Calories: '',
        ingredient: '',
        date: ''
      },
      searchQuery: '',
      startDate: '',
      data: [
        {
          img: 'https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg',
          name: 'Coconut and Mugcake',
          Calories: '20 Calories',
          ingredient:
            'egg,orange,organic coconut flour,oat flour,yeast,coconut oil,plant-based milk',
          date: '2024-08-19'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/kos9av1699014767.jpg',
          name: 'Lemon Cookies',
          Calories: '30 Calories',
          ingredient: 'egg,butter,greek yogurt,lemon,sugar,wheat flour',
          date: '2024-08-18'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/0206h11699013358.jpg',
          name: 'Chocolate and Coconut Bonbons',
          Calories: '40 Calories',
          ingredient: 'Almond butter,Coconut Oil,Grated Coconut,Dark Chocolate',
          date: '2024-08-01'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg',
          name: 'Crispy Rolls with Apple and Blue Cheese',
          Calories: '60 Calories',
          ingredient: 'Butter,Apple,Blue Cheese,Honey,Rice Paper,Walnut',
          date: '2024-08-02'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/60oc3k1699009846.jpg',
          name: 'Microwave Yogurt Cheesecake',
          Calories: '60 Calories',
          ingredient:
            'Egg,Butter,Greek Yogurt,Cream Cheese,Strawberry Jam,Cookie,Sugar,Corn Starch',
          date: '2024-08-03'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/u55lbp1585564013.jpg',
          name: 'Air Fryer Bread Flan',
          Calories: '70 Calories',
          ingredient: 'Milk,Egg,cinnamon,Brown Sugar,Bread,',
          date: '2024-08-04'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/020z181619788503.jpg',
          name: 'Vegan Garbanzo Brownie',
          Calories: '50 Calories',
          ingredient:
            'cocoa,date,walnut,plant-based milk,dark chocolate,canned chickpea',
          date: '2024-08-05'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
          name: 'Coconut and Mugcake',
          Calories: '20 Calories',
          ingredient:
            'egg,orange,organic coconut flour,oat flour,yeast,coconut oil,plant-based milk',
          date: '2024-08-06'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/1549542994.jpg',
          name: 'Lemon Cookies',
          Calories: '30 Calories',
          ingredient: 'egg,butter,greek yogurt,lemon,sugar,wheat flour',
          date: '2024-08-08'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg',
          name: 'Chocolate and Coconut Bonbons',
          Calories: '40 Calories',
          ingredient: 'Almond butter,Coconut Oil,Grated Coconut,Dark Chocolate',
          date: '2024-08-09'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg',
          name: 'Crispy Rolls with Apple and Blue Cheese',
          Calories: '60 Calories',
          ingredient: 'Butter,Apple,Blue Cheese,Honey,Rice Paper,Walnut',
          date: '2024-08-10'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          name: 'Microwave Yogurt Cheesecake',
          Calories: '60 Calories',
          ingredient:
            'Egg,Butter,Greek Yogurt,Cream Cheese,Strawberry Jam,Cookie,Sugar,Corn Starch',
          date: '2024-08-11'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg',
          name: 'Air Fryer Bread Flan',
          Calories: '70 Calories',
          ingredient: 'Milk,Egg,cinnamon,Brown Sugar,Bread,',
          date: '2024-08-12'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
          name: 'Vegan Garbanzo Brownie',
          Calories: '50 Calories',
          ingredient:
            'cocoa,date,walnut,plant-based milk,dark chocolate,canned chickpea',
          date: '2024-08-13'
        },
        {
          img: 'https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg',
          name: 'Vegan Garbanzo Brownie',
          Calories: '50 Calories',
          ingredient:
            'cocoa,date,walnut,plant-based milk,dark chocolate,canned chickpea',
          date: '2024-08-14'
        }
      ]
    };
  },
  computed: {
    filteredMeals() {
      const query = this.searchQuery.toLowerCase();
      const filteredByQuery = this.data.filter((meal) => {
        return (
          meal.name.toLowerCase().includes(query) ||
          meal.ingredient.toLowerCase().includes(query)
        );
      });

      // If startDate is selected, further filter the meals by date
      if (this.startDate) {
        return filteredByQuery.filter((meal) => meal.date === this.startDate);
      } else {
        return filteredByQuery;
      }
    }
  },
  methods: {
    addMeal(newMeal) {
      const toast = useToast();
      try {
        this.data.push(newMeal);
        toast.success('Meal added successfully');
        this.showModal = false;
      } catch (error) {
        toast.error('Error adding meal');
      }
    },
    deleteMeal(index) {
      const toast = useToast();
      try {
        this.data.splice(index, 1);
        toast.success('Meal deleted successfully');
      } catch (error) {
        toast.error('Error deleting meal');
      }
    },
    openEditModal(meal, index) {
      this.currentMeal = { ...meal };
      this.currentMealIndex = index;
      this.isEditMode = true;
      this.showModal = true;
    },
    editMeal(updatedMeal) {
      const toast = useToast();
      try {
        this.data[this.currentMealIndex] = { ...updatedMeal }; // Update the meal in the array
        toast.success('Meal updated successfully');
        this.showModal = false;
        this.isEditMode = false;
        this.currentMealIndex = null;
      } catch (error) {
        toast.error('Error updating meal');
      }
    }
  }
};
</script>
