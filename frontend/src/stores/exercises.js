/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'

export const useExercisesStore = defineStore('exercises', {
  state: () => {
    return {
      exercises: [],
      loading: false,
      displayExercises: [],
    }
  },
  getters: {
    allExercises(state) {
      return state.displayExercises
    },
  },
  actions: {
    async getExercises() {
      this.loading = true
      const res = await fetch('http://localhost:3001/api')
      const data = await res.json()

      this.exercises = data
      this.displayExercises = data
      this.loading = false
    },
    filterExercises(filter) {
      switch (filter.value.length) {
        case 1: {
          const filterKeys = Object.keys(filter.value[0])
          // console.log(filterKeys)
          const x = this.exercises.filter(
            (exercise) =>
              exercise[filterKeys[0]] ===
              filter.value[0][filterKeys[0]]
          )
          return x
        }
        case 2: {
          let filterKeys = []
          filter.value.forEach((f) => {
            filterKeys.push(Object.keys(f)[0])
          })
          // console.log(filterKeys) //['type', 'muscle']
          // console.log(filter.value) // [{type:'strength, muscle:'biceps'}]
          const x = this.exercises.filter((exercise) => {
            return (
              exercise[filterKeys[0]] ===
                filter.value[0][filterKeys[0]] &&
              exercise[filterKeys[1]] ===
                filter.value[1][filterKeys[1]]
            )
          })
          // console.log(x)
          return x
        }
        case 3: {
          let filterKeys = []
          filter.value.forEach((f) => {
            filterKeys.push(Object.keys(f)[0])
          })
          const x = this.exercises.filter((exercise) => {
            return (
              exercise[filterKeys[0]] ===
                filter.value[0][filterKeys[0]] &&
              exercise[filterKeys[1]] ===
                filter.value[1][filterKeys[1]] &&
              exercise[filterKeys[2]] ===
                filter.value[2][filterKeys[2]]
            )
          })
          // console.log(x)
          return x
        }
        default:
          console.log('reset exercises')
          return this.exercises
      }
    },
  },
})
