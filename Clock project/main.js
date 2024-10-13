
setInterval(function clock(){
  let time = new Date()
  
  let day = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
  let getday = time.getDay()
   let todayday =  day[getday-1]
   
  let month = time.getMonth()
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Sep','Oct','Nov','Dec']
  
  
  let monthNum = time.getDate()
  let monthNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  
  
  let hour = time.getHours().toString().padStart(2,0)
  let pa = hour >= 12 ? 'PM': 'AM'
  hour = hour % 12 || 12
  let minute = time.getMinutes()
  let sec = time.getSeconds()
  let timestring = `${hour}:${minute}:${sec} ${pa}`
  
  document.querySelector('.day').innerHTML = todayday
  
  document.querySelector('.month').innerHTML = months[month -1] +':' + monthNums[monthNum -1]
  
  document.querySelector('.clock').textContent = timestring
},1000 


)