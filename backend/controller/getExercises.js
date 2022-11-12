import Exercise from '../models/exercises.js'

export const getExercises = async (req, res) => {
  const exercises = await Exercise.getExercises()
  res.status(200).json(exercises)
  console.log('Got exercises')
}

export const getExercise = async (req, res) => {
  const exercise = await Exercise.getExercise(req.params.id)
  res.status(200).json(exercise)
  console.log('Got exercise')
}

export const addExercise = async (req, res) => {
  const addedExercise = await Exercise.addExercise(req.body)
  res.status(200).send(addedExercise)
  console.log(addedExercise)
}

export const editExercise = async (req, res) => {
  const editedExercise = await Exercise.editExercise(
    req.params.id,
    req.body
  )
  res.status(200).send(editedExercise)
  console.log(editedExercise)
}

export const deleteExercise = async (req, res) => {
  const deletedExercise = await Exercise.deleteExercise(req.params.id)
  res.status(200).json(deletedExercise)
  console.log('Deleted exercise')
}
