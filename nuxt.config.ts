// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  plugin: ["@/plugin/fontawesome.js", "@/plugin/toast.js"],
  modules: ["@nuxtjs/tailwindcss"],
});
