<template>
  <section
    className="w-full h-20 flex flex-row justify-between items-center bg-black text-white font-bold"
  >
    <aside
      className="w-full flex justify-center items-center gap-4 cursor-pointer"
    >
      <img
        src="https://starworks.world/images/swlogo.png"
        alt="broken-img"
        className="w-10 h-20 object-contain "
      />
      <h1>Meal Planner</h1>
    </aside>
    <aside
      className="w-full hidden md:flex flex-row items-center justify-center gap-4 lg:gap-12 cursor-pointer"
    >
      <span>Home</span>
      <span>About</span>
      <span>Blog</span>
      <span>Contact Us</span>
    </aside>
    <aside className="w-full flex items-center justify-center">
      <span className="px-8 py-3 bg-purple-600 rounded-md cursor-pointer"
        >Get Started</span
      >
    </aside>
  </section>
</template>

<script>
export default {
  name: 'HeaderPage'
};
</script>
