const api = await fetch(
  'https://api.api-ninjas.com/v1/exercises?type=cardio',
  {
    headers: {
      'X-Api-Key': 'PPOlYWO7rpuwdh2tjm1ptQ==hYiWwaCqC9pUHTpn',
    },
  }
)
if (api.ok) {
  const data = await api.json()
  // res.send(data)
  // console.log(data)
  try {
    let response
    response.json(data)
    console.log(response.json())
  } catch (error) {
    console.log(error)
  }
}
