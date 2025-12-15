export async function getAllRequests() {
  const res = await fetch('http://localhost:7777/video-request')
  return await res.json()
}

export async function getRequestById(id) {
  const res = await fetch(`http://localhost:7777/video-request/${id}`)
  return await res.json()
}

export async function submitVote(reqId, voteType) {
  const res = await fetch('http://localhost:7777/video-request/vote', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: reqId, vote_type: voteType })
  })
  return await res.json()
}

export async function submitVideoRequest(payload) {
  const res = await fetch('http://localhost:7777/video-request', {
    method: 'POST',
    body: payload
  })
  return await res.json()
}
