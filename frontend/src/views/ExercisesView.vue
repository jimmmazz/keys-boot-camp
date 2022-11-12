<template>
	<div>
		<div class="loading" v-if="loading">Loading exercises...</div>
		<p>Sort by...</p>
		<label for="type">Choose a type:</label>
		<select v-model="type" id="type" @change="handleOnTypeChange">
			<option disabled value="">Please select one</option>
			<option v-for="tl in getTypeList()" :key="tl">{{ tl }}</option>
		</select>

		<label for="muscle">Choose a muscle:</label>
		<select v-model="muscle" id="muscle" @change="handleOnMuscleChange">
			<option disabled value="">Please select one</option>
			<option v-for="m in getMuscleList()" :key="m">{{ m }}</option>
		</select>

		<label for="equipment">Choose equipment:</label>
		<select v-model="equipment" id="equipment" @change="handleOnEquipmentChange">
			<option disabled value="">Please select one</option>
			<option v-for="eq in getEquipmentList()" :key="eq">{{ eq }}</option>
		</select>

		<button @click="resetFilter">Rest filter</button>

		<div v-if="filters.length < 1">
			<h3>Beginner</h3>
			<div v-for="exercise in allExercises" :key="exercise._id">
				<div v-if="exercise.difficulty === 'beginner'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
		<div v-else>
			<h3>Beginner</h3>
			<div v-for="exercise in x" :key="exercise._id">
				<div v-if="exercise.difficulty === 'beginner'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
		<div v-if="filters.length < 1">
			<h3>Intermediate</h3>
			<div v-for="exercise in allExercises" :key="exercise._id">
				<div v-if="exercise.difficulty === 'intermediate'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
		<div v-else>
			<h3>Intermediate</h3>
			<div v-for="exercise in x" :key="exercise._id">
				<div v-if="exercise.difficulty === 'intermediate'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
		<div v-if="filters.length < 1">
			<h3>Expert</h3>
			<div v-for="exercise in allExercises" :key="exercise._id">
				<div v-if="exercise.difficulty === 'expert'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
		<div v-else>
			<h3>Expert</h3>
			<div v-for="exercise in x" :key="exercise._id">
				<div v-if="exercise.difficulty === 'expert'">
					{{ exercise.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useExercisesStore } from '../stores/exercises';
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, watch, watchEffect } from 'vue';

//store data
const exercisesStore = useExercisesStore()
const { loading, exercises, allExercises } = storeToRefs(exercisesStore)

//filter
const filters = ref([])
const type = ref('')
const muscle = ref('')
const equipment = ref('')
const x = ref([])
// const myDisplayExercises = allExercises

function getTypeList() {
	const typeList = []
	allExercises.value.forEach(exercise => {
		if (!typeList.includes(exercise.type)) {
			typeList.push(exercise.type)
		}
	})
	return typeList
}
function getMuscleList() {
	const muscleList = []
	allExercises.value.forEach(exercise => {
		if (!muscleList.includes(exercise.muscle)) {
			muscleList.push(exercise.muscle)
		}
	})
	return muscleList
}
function getEquipmentList() {
	const equipmentList = []
	allExercises.value.forEach(exercise => {
		if (!equipmentList.includes(exercise.equipment)) {
			equipmentList.push(exercise.equipment)
		}
	})
	return equipmentList
}

const handleOnTypeChange = () => {
	if (filters.value.length !== 0 && filters.value.find(t => 'type' in t)) {
		const index = filters.value.indexOf(filters.value.find(t => 'type' in t))
		filters.value[index].type = type.value
		// console.log(index)
	} else {
		filters.value.push({ type: type.value })
	}
	// console.log(filters.value)
	x.value = exercisesStore.filterExercises(filters)
	// console.log(x.value)
}
const handleOnMuscleChange = () => {
	if (filters.value.length !== 0 && filters.value.find(t => 'muscle' in t)) {
		const index = filters.value.indexOf(filters.value.find(t => 'muscle' in t))
		filters.value[index].muscle = muscle.value
		// console.log(index)
	} else {
		filters.value.push({ muscle: muscle.value })
	}
	// console.log(filters.value)
	x.value = exercisesStore.filterExercises(filters)
	// console.log(x.value)

}
const handleOnEquipmentChange = () => {
	if (filters.value.length !== 0 && filters.value.find(t => 'equipment' in t)) {
		const index = filters.value.indexOf(filters.value.find(t => 'equipment' in t))
		filters.value[index].equipment = equipment.value
		// console.log(index)
	} else {
		filters.value.push({ equipment: equipment.value })
	}
	// console.log(filters.value)
	x.value = exercisesStore.filterExercises(filters)
	// console.log(x.value)

}

const resetFilter = () => {
	allExercises
	type.value = ''
	muscle.value = ''
	equipment.value = ''
	filters.value = []
}
</script>

<style lang="scss" scoped>

</style>