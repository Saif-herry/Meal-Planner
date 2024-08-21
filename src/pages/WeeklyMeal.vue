<template>
  <section class="flex flex-col w-full">
    <div
      class="flex items-center justify-center w-full py-8 text-xl font-bold underline"
    >
      <h1>Weekly Planned Meal</h1>
    </div>
    <div
      class="grid items-center justify-center w-full grid-cols-1 gap-5 px-0 md:grid-cols-2 lg:px-10 lg:grid-cols-3"
    >
      <div v-for="(day, index) in daysOfWeek" :key="index" class="day-column">
        <div class="flex items-center justify-center w-full font-bold">
          <h3>{{ day }}</h3>
        </div>
        <VueDraggable
          v-model="mealsByDay[day]"
          group="meals"
          @end="onDragEnd"
          class="meal-list"
          :data-day="day"
        >
          <div
            v-for="meal in mealsByDay[day]"
            :key="meal.id"
            class="h-full pb-2 rounded-md flex flex-col gap-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white"
            :data-meal-id="meal.id"
          >
            <div class="w-full h-40">
              <img
                :src="meal.img"
                alt=""
                class="object-cover w-full h-full rounded-t-md"
              />
            </div>
            <div class="pl-4">
              <h2>
                <span class="font-semibold">Meal Name:</span>
                <span> {{ meal.name }}</span>
              </h2>
              <p>
                <span class="font-semibold">Calories:</span>
                <span class="text-sm text-gray-600">{{ meal.Calories }}</span>
              </p>
              <p>
                <span class="font-semibold">Ingredients:</span>
                <span class="text-sm text-gray-600">{{ meal.ingredient }}</span>
              </p>
              <div class="flex justify-center w-full">
                <button
                  class="px-16 py-2 mt-4 text-white bg-green-500 border-none rounded-md outline-none"
                  @click="editMeal(meal)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </VueDraggable>
      </div>
    </div>

    <!-- Edit Meal Modal -->
    <div
      v-if="isEditing"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="p-8 bg-white rounded-md w-[40%]">
        <!-- <h2 class="mb-4 text-xl font-bold">Edit Meal</h2> -->

        <!-- Meal Image Preview and Upload -->
        <div class="mb-4">
          <!-- <label class="block mb-2 font-semibold">Meal Image:</label> -->
          <img
            :src="editingMeal.img"
            alt="Meal Image"
            class="object-cover w-full h-40 mb-2"
          />
          <input
            type="file"
            @change="onImageChange"
            class="w-full p-2 border rounded-md"
          />
        </div>

        <div class="mb-4">
          <!-- <label class="block font-semibold">Meal Name:</label> -->
          <input
            v-model="editingMeal.name"
            class="w-full p-2 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <!-- <label class="block font-semibold">Calories:</label> -->
          <input
            v-model="editingMeal.Calories"
            class="w-full p-2 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <!-- <label class="block font-semibold">Ingredients:</label> -->
          <textarea
            v-model="editingMeal.ingredient"
            class="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <button
            @click="saveMeal"
            class="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-white bg-gray-500 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default {
  name: 'WeeklyMeal',
  components: {
    VueDraggable: VueDraggableNext
  },
  setup() {
    const daysOfWeek = ref([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]);

    const mealsByDay = ref({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    });

    const meals = [
      {
        img: 'https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg',
        name: 'Coconut and Mugcake',
        day: 'Monday',
        Calories: '20 Calories',
        ingredient:
          'egg,orange,organic coconut flour,oat flour,yeast,coconut oil,plant-based milk',
        date: '2024-08-19'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg',
        name: 'Lemon Cookies',
        day: 'Tuesday',
        Calories: '30 Calories',
        ingredient: 'egg,butter,greek yogurt,lemon,sugar,wheat flour',
        date: '2024-08-18'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg',
        name: 'Chocolate and Coconut Bonbons',
        Calories: '40 Calories',
        day: 'Wednesday',
        ingredient: 'Almond butter,Coconut Oil,Grated Coconut,Dark Chocolate',
        date: '2024-08-01'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/qysyss1511558054.jpg',
        name: 'Crispy Rolls with Apple and Blue Cheese',
        day: 'Thursday',
        Calories: '60 Calories',
        ingredient: 'Butter,Apple,Blue Cheese,Honey,Rice Paper,Walnut',
        date: '2024-08-02'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg',
        name: 'Microwave Yogurt Cheesecake',
        day: 'Friday',
        Calories: '60 Calories',
        ingredient:
          'Egg,Butter,Greek Yogurt,Cream Cheese,Strawberry Jam,Cookie,Sugar,Corn Starch',
        date: '2024-08-03'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/kos9av1699014767.jpg',
        name: 'Air Fryer Bread Flan',
        day: 'Saturday',
        Calories: '70 Calories',
        ingredient: 'Milk,Egg,cinnamon,Brown Sugar,Bread,',
        date: '2024-08-04'
      },
      {
        img: 'https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg',
        name: 'Vegan Garbanzo Brownie',
        day: 'Sunday',
        Calories: '50 Calories',
        ingredient:
          'cocoa,date,walnut,plant-based milk,dark chocolate,canned chickpea',
        date: '2024-08-05'
      }
    ];

    meals.forEach((meal) => {
      mealsByDay.value[meal.day].push(meal);
    });

    const isEditing = ref(false);
    const editingMeal = ref(null);

    const editMeal = (meal) => {
      editingMeal.value = { ...meal }; // Create a copy of the meal to edit
      isEditing.value = true;
    };

    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editingMeal.value.img = e.target.result; // Update image preview
        };
        reader.readAsDataURL(file);
      }
    };

    const saveMeal = () => {
      if (editingMeal.value) {
        const day = editingMeal.value.day;
        const index = mealsByDay.value[day].findIndex(
          (m) => m.id === editingMeal.value.id
        );
        if (index !== -1) {
          mealsByDay.value[day][index] = editingMeal.value; // Update meal
        }
        isEditing.value = false;
        editingMeal.value = null;
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editingMeal.value = null;
    };

    const onDragEnd = (evt) => {
      const movedMealId = evt.item.dataset.mealId;
      const newDay = evt.to.dataset.day;
      const oldDay = evt.from.dataset.day;

      const meal = mealsByDay.value[oldDay].find(
        (m) => m.id === parseInt(movedMealId)
      );
      if (meal) {
        mealsByDay.value[oldDay] = mealsByDay.value[oldDay].filter(
          (m) => m.id !== meal.id
        );
        mealsByDay.value[newDay].push(meal);
      }
    };

    return {
      daysOfWeek,
      mealsByDay,
      isEditing,
      editingMeal,
      editMeal,
      saveMeal,
      cancelEdit,
      onImageChange,
      onDragEnd
    };
  }
};
</script>

<style>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}
.day-column {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}
.meal-list {
  min-height: 100px;
  border: 1px dashed #ccc;
  padding: 5px;
}
.meal-item {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.meal-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
