document.addEventListener('DOMContentLoaded', () => {
  // Get input values
  const videoForm = document.querySelector('#videoRequestForm')

  videoForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const fd = new FormData(videoForm)

    const res = await fetch('http://localhost:7777/video-request', {
      method: 'POST',
      body: fd
    })

    const data = await res.json()
    console.log(data)
  })
})
