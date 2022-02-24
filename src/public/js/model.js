const backendApi = 'http://localhost:1515'

async function request (path, method, body) {
	const response = await fetch(backendApi + path, {
		method,
		headers: {
			'Content-Type':'application/json'
		},
		body: body ? JSON.stringify(body) : null
	})
	return await response.json()
}