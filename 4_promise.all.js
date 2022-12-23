const USER = 'https://jsonplaceholder.typicode.com/photos'
const usersId = [60, 12, 55]
const dataContainer = document.querySelector('#data-container')

const createUserElement = (title, url)=>{
    const userElement = document.createElement('li')
    const userElementImg = document.createElement('img')
    const userElementH3 = document.createElement('h3')
    userElement.className = 'photo-item'
    userElementImg.className= 'photo-item__image'
    userElementImg.src= url
    userElementH3.className = 'photo-item__title'
    userElementH3.textContent = title
    userElement.append(userElementImg,userElementH3)
    return userElement
}
const hidden = ()=>{
  const hiddenHTML = document.querySelector('#loader')
  const isHidden = hiddenHTML.hasAttribute('hidden')
  if(isHidden){
    hiddenHTML.removeAttribute('hidden')
  } else {hiddenHTML.setAttribute('hidden', '')}
}

const getFastestLoadedPhoto = (ids)=>{
  hidden ()
  const requests = ids.map((id)=>fetch(`${USER}/${id}`))
  Promise.all(requests)
  .then((responses)=>{
    const dataResults = responses.map((response)=>response.json())
    return Promise.race(dataResults)
  })
  .then((user)=>{
    console.log('user', user)
    
    const userHTML = createUserElement(user.title, user.url)
    dataContainer.append(userHTML)
  
  })
  .catch((err)=>{
    console.log('err', err);
  })
  .finally(()=>{
    hidden ()
    console.log('Завершение кода');
  }) 
}
getFastestLoadedPhoto(usersId)

