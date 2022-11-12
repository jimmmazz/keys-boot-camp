import express from 'express'

const router = express.Router()

import {
  getExercises,
  getExercise,
  addExercise,
  editExercise,
  deleteExercise,
} from '../controller/getExercises.js'

router.get('/', getExercises)
router.get('/:id', getExercise)
router.post('/add', addExercise)
router.post('/edit/:id', editExercise)
router.delete('/delete/:id', deleteExercise)

export default router
