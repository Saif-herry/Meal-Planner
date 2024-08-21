<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="lg:w-1/3 md:w-[70%] w-[95%] p-6 bg-white rounded-md">
      <h2 class="mb-4 text-2xl">
        {{ isEditMode ? 'Edit Meal' : 'Add New Meal' }}
      </h2>
      <form @submit.prevent="submitMeal">
        <div class="mb-4">
          <label class="block text-gray-700">Meal Image URL:</label>
          <input
            type="text"
            v-model="localMeal.img"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Meal Name:</label>
          <input
            type="text"
            v-model="localMeal.name"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Calories:</label>
          <input
            type="text"
            v-model="localMeal.Calories"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Ingredients:</label>
          <input
            type="text"
            v-model="localMeal.ingredient"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 mr-2 text-white bg-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white bg-green-600 rounded-md"
          >
            {{ isEditMode ? 'Save Changes' : 'Add Meal' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    meal: {
      type: Object,
      default: () => ({
        img: '',
        name: '',
        Calories: '',
        ingredient: ''
      })
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localMeal: { ...this.meal } // Create a local copy of the meal object to edit
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitMeal() {
      if (this.isEditMode) {
        this.$emit('edit-meal', { ...this.localMeal }); // Emit with a new object to ensure reactivity
      } else {
        this.$emit('add-meal', { ...this.localMeal });
      }
      this.closeModal();
    }
  },
  watch: {
    meal(newMeal) {
      this.localMeal = { ...newMeal }; // Update localMeal when the prop changes
    }
  }
};
</script>
