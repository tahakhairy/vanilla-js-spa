const reqItemTemplate = (item) => `<div class="card mb-3">
        <div class="card-body d-flex justify-content-between flex-row">
          <div class="d-flex flex-column">
            <h3>${item.topic_title}</h3>
            <p class="text-muted mb-2">${item.topic_details}</p>
            <p class="mb-0 text-muted">
              <strong>Expected results:</strong> ${item.expected_result}
            </p>
          </div>
          <div class="d-flex flex-column text-center">
            <a class="btn btn-link">🔺</a>
            <h3>0</h3>
            <a class="btn btn-link">🔻</a>
          </div>
        </div>
        <div class="card-footer d-flex flex-row justify-content-between">
          <div>
            <span class="text-info">${item.status.toUpperCase()}</span>
            &bullet; added by <strong>${item.author_name}</strong> on
            <strong>${new Date(item.submit_date).toLocaleDateString('en-us', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</strong>
          </div>
          <div class="d-flex justify-content-center flex-column 408ml-auto mr-2">
            <div class="badge badge-success">
              ${item.target_level}
            </div>
          </div>
        </div>
      </div>
`

document.addEventListener('DOMContentLoaded', async () => {
  const videoRequests = await getAllRequests()

  listAllRequests(videoRequests)

  const videoForm = document.querySelector('#videoRequestForm')

  videoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData(videoForm)
    submitVideoRequest(fd)
  })
})

async function getAllRequests() {
  const res = await fetch('http://localhost:7777/video-request')
  return await res.json()
}

function listAllRequests(videoRequests) {
  const videosListElement = document.querySelector('#listOfRequests')

  videoRequests.forEach((item) => {
    videosListElement.insertAdjacentHTML('beforeend', reqItemTemplate(item))
  })
}

async function submitVideoRequest(payload) {
  await fetch('http://localhost:7777/video-request', {
    method: 'POST',
    body: payload
  })
}
