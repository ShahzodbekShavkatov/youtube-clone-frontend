let token = window.localStorage.getItem('token')
let videos_list = document.querySelector('.videos-list')

submitButton.onclick = async event => {
    event.preventDefault()

    let formData = new FormData()

    formData.append('file', uploadInput.files[0])
    formData.append('title', videoInput.value)
    formData.append('userId', JSON.parse(token))
    console.log(JSON.parse(token))

    let response = await fetch(backendApi + '/upload', {
        method: 'POST',
        body: formData
    })

    videoInput.value = null
    uploadInput.files[0] = null
}

async function render() {
    let response = await request('/video', 'GET')
    let data = await response
    let id = window.localStorage.getItem('id')
    let arr = []
    for (let d of data) {
        if (d.userId == id) {
            arr.push(d)
        }
    }
    for (let v of arr) {
        let li = document.createElement('li')
        li.setAttribute('class', 'video-item')
        li.innerHTML = `
        <video src="${backendApi + '/getFile/' + v.fileLink}" controls=""></video>
        <p class="content" data-id="2" contenteditable="true">${v.title}</p>
        <img src="./img/delete.png" width="25px" alt="upload" class="delete-icon" data-id="2">
        `
        videos_list.append(li)
    }
}

render()