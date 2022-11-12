<template>
  <div v-if="exercises">
    <RouterView />

  </div>

</template>

<script setup>

//get data
import { useExercisesStore } from './stores/exercises';
const exercisesStore = useExercisesStore()
const exercises = exercisesStore.getExercises()



</script>

<style lang="scss" scoped>

</style>