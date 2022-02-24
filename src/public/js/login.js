submitButton.onclick = async event => {
    event.preventDefault()
    let obj = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    let response = await request('/auth/login', 'POST', obj)
    let token = await response.token
    let id = await response.id
    window.localStorage.setItem('token', JSON.stringify(token))
    window.localStorage.setItem('id', JSON.stringify(id))
    window.location = '/'
}