plusbtn.addEventListener('click', event => {
    let tokenn = window.localStorage.getItem('token')
    if(!tokenn) {
        window.location = '/'
        alert('Sizda token mavjud emas!')
    }
    else if (tokenn) window.location = '/admin'
})

let iframes_list = document.querySelector('.iframes-list')
let navbar_list = document.querySelector('.navbar-list')
let search_btn = document.querySelector('.search-btn')
let search_input = document.querySelector('.search-input')
let voicebtn = document.querySelector('#voice-btnn')
const voice = new window.webkitSpeechRecognition()
voice.lang = "en-EN"

async function render(array) {
    let responseee = await request('/users', 'GET')
    let userDatas = await responseee

    let response = await request('/video', 'GET')
    let data = await response
    if(array) data = array
    iframes_list.innerHTML = null
    data.forEach( file => {
        let option = document.createElement('option')
        option.textContent = file.title
        datalist.append(option)
        let li = document.createElement('li')
        li.setAttribute('class', 'iframe')
        let userli = ''
        for (let user of userDatas) {
            if(user.userId == file.userId) [
                userli = user.username
            ]
        }
        li.innerHTML = `
        <video src="${backendApi + '/getFile/' + file.fileLink}" controls=""></video>
        <div class="iframe-footer">
            <img src="https://cdn-icons-png.flaticon.com/512/146/146031.png" alt="channel-icon">
            <div class="iframe-footer-text">
                <h2 class="channel-name">${userli}</h2>
                <h3 class="iframe-title">${file.title}</h3>
                <time class="uploaded-time">${file.time}</time>
                <a class="download" href="${backendApi + '/download/' + file.fileLink}">
                    <span>${file.size}</span>
                    <img id="download_img" src="./img/download.png">
                </a>
            </div>                  
        </div>
        `
        iframes_list.append(li)
    })

    let responsee = await request('/users', 'GET')
    let userData = await responsee
    navbar_list.innerHTML = null
    navbar_list.innerHTML = `
    <h1>YouTube Members</h1>
    <li class="channel active" data_id="main">
        <a href="#">
            <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8" class="style-scope yt-icon"></path></g></svg>
            <span>Home</span>
        </a>
    </li>
    `
    userData.forEach( user => {
        let li = document.createElement('li')
        li.setAttribute('class', 'channel')
        li.innerHTML = `
            <a href="#">
                <img src="https://cdn-icons-png.flaticon.com/512/146/146031.png" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
        `
        navbar_list.append(li)
    })
}

render()

search_btn.addEventListener('click', async event => {
    event.preventDefault()
    let response = await request('/video', 'GET')
    let datas = await response
    let arr = []
    datas.forEach( data => {
        if(data.title.includes(search_input.value)) {
            arr.push(data)
        }
    })
    render(arr)
})

voicebtn.addEventListener("click", () => {
    voice.start()
})
voice.onresult = async event => {
    console.log(event.results[0][0].transcript)
    let response = await request('/video', 'GET')
    let datas = await response
    let arrr = []
    search_input.value = event.results[0][0].transcript
    datas.forEach( data => {
        if(data.title.includes(event.results[0][0].transcript)) {
            arrr.push(data)
        }
    })
    render(arrr)
}


