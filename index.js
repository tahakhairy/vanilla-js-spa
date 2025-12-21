import { getAllRequests, submitVideoRequest, submitVote } from './service.js'
import { debounce } from './utils.js'
const filters = {
  sortBy: '',
  search: ''
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllRequests()

  const sortingElemnts = document.querySelectorAll('[for*=sort_by_]')

  sortingElemnts.forEach((element) => {
    element.addEventListener('click', async function (e) {
      e.preventDefault()

      filters.sortBy = this.querySelector('input').value
      await loadAllRequests(filters)

      this.classList.add('active')
      if (filters.sortBy === 'topFirst') {
        document.querySelector('[for=sort_by_new]').classList.remove('active')
      } else {
        document.querySelector('[for=sort_by_top]').classList.remove('active')
      }
    })
  })

  const videoForm = document.querySelector('#videoRequestForm')

  videoForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const fd = new FormData(videoForm)
    const data = await submitVideoRequest(fd)
    appendToList(data, true)
  })

  const searchInput = document.getElementById('search-box')

  searchInput.addEventListener(
    'input',
    debounce(async function (e) {
      filters.search = e.target.value

      await loadAllRequests(filters)
    }, 300)
  )
})

const reqItemTemplate = (item) => `<div class="card mb-3">
        <div class="card-body d-flex justify-content-between flex-row">
          <div class="d-flex flex-column">
            <h3>${item.topic_title}</h3>
            <p class="text-muted mb-2">${item.topic_details}</p>
            <p class="mb-0 text-muted">
              ${
                item.expected_result &&
                `<strong>Expected results:</strong> ${item.expected_result}`
              }
            </p>
          </div>
          <div class="d-flex flex-column text-center">
            <button id="vote-ups-${item._id}" class="btn votebtn">🔺</button>
            <h3 id="vote-score-${item._id}">${item.votes.ups - item.votes.downs}
            </h3>
            <button id="vote-downs-${item._id}" class="btn votebtn">🔻</button>
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

function appendToList(item, isPrepend = false) {
  const videosListElement = document.querySelector('#listOfRequests')
  const container = document.createElement('div')
  container.innerHTML = reqItemTemplate(item)

  if (isPrepend) {
    videosListElement.prepend(container)
  } else {
    videosListElement.appendChild(container)
  }

  const voteBtns = document.querySelectorAll('.votebtn')

  voteBtns.forEach((btn) => {
    btn.addEventListener('click', handleVoteClick)
  })
}

async function loadAllRequests(filters = {}) {
  const videosListElement = document.querySelector('#listOfRequests')
  const videoRequests = await getAllRequests(filters)
  videosListElement.innerHTML = ''
  videoRequests.forEach((item) => appendToList(item))
}

async function handleVoteClick(e) {
  const clickedButtonId = e.target.id

  const [_, voteType, itemId] = clickedButtonId.split('-')

  const data = await submitVote(itemId, voteType)

  const voteScore = document.querySelector(`#vote-score-${itemId}`)

  voteScore.innerHTML = data.ups - data.downs
}
