import { Schema, model } from 'mongoose'

const exerciseSchema = new Schema({
  name: String,
  instructions: String,
  difficulty: String,
  muscle: String,
  type: String,
  equipment: String,
})

exerciseSchema.statics.getExercises = async function () {
  try {
    const exercises = await this.find({}).sort('name')
    if (exercises.length < 1) {
      throw new Error('No exercises found')
    }
    // console.log(exercises)
    return exercises
  } catch (err) {
    console.log(err)
  }
}

exerciseSchema.statics.getExercise = async function (id) {
  try {
    const exercise = await this.findById({ _id: id })
    if (exercise.length < 1) {
      throw new Error('No exercise found')
    }
    console.log(exercise)
    return exercise
  } catch (err) {
    console.log(err)
    // return err
  }
}

exerciseSchema.statics.addExercise = async function (exerciseData) {
  try {
    const newExercise = await this.create({ ...exerciseData })
    if (!newExercise) {
      throw new Error('Something went wrong, please try again.')
    }
    return newExercise
  } catch (err) {
    console.log(err)
  }
}

exerciseSchema.statics.editExercise = async function (id, data) {
  try {
    const doc = await this.findOneAndUpdate({ _id: id }, data, {
      new: true,
    })
    return doc
  } catch (err) {
    console.log(err)
  }
}

exerciseSchema.statics.deleteExercise = async function (id) {
  try {
    const doc = await this.findOneAndDelete({ _id: id })
    return doc
  } catch (err) {
    console.log(err)
  }
}

export default model('Exercise', exerciseSchema)
