let backgroundList = ['../img/bg1.jpg','../img/bg2.jpg','../img/bg3.jpg','../img/bg4.jpg','../img/bg5.jpg'];
let datas = [];
let musicsChoices = [];
let musicsList = [];
let backgroundListUsed = [];
let colorList = ['#F2D438','#EEEC76','#89E7D4','#F3EF63','#EEA8B5']
let colorChoice = '';


let background = document.querySelector(".background");

async function fetchApi(){
      const response = await fetch("https://629a00896f8c03a9784e867c.mockapi.io/musics");
      datas = await response.json();
      modelingData();
};

window.load = fetchApi();

function modelingData(){
      musicsChoices = [];
      if (musicsList.length === 0){
            datas.forEach(el => {
                  musicsList.push(el);
            });
      }

      if (backgroundListUsed.length === 0){
            backgroundList.forEach(el => {
                  backgroundListUsed.push(el);
            });
      }

      const randomBackground = backgroundListUsed[Math.floor(Math.random() * backgroundListUsed.length)];
      background.style.backgroundImage = `url(${randomBackground})`;
      backgroundListUsed.splice(backgroundListUsed.indexOf(randomBackground), 1);

      if (background.style.backgroundImage === 'url("../img/bg1.jpg")'){
            colorChoice = colorList[0];
      }else if (background.style.backgroundImage === 'url("../img/bg2.jpg")'){
            colorChoice = colorList[1];
      }else if (background.style.backgroundImage === 'url("../img/bg3.jpg")'){
            colorChoice = colorList[2];
      }else if (background.style.backgroundImage === 'url("../img/bg4.jpg")'){
            colorChoice = colorList[3];
      }else if (background.style.backgroundImage === 'url("../img/bg5.jpg")'){
            colorChoice = colorList[4];
      }


      for (let index = 0; index < 2; index++) {
            const randomElement = musicsList[Math.floor(Math.random() * musicsList.length)];
            musicsChoices.push(randomElement);
            musicsList.splice(musicsList.indexOf(randomElement), 1);
      };

      const musicContainer = document.querySelector("#music-container");

      musicContainer.innerHTML = `
            <div class="music" data-id="${musicsChoices[0].id}">
                  <div class="music-img">
                        <img src="${musicsChoices[0].imgUrl}" alt="${musicsChoices[0].title}">
                  </div>
                  <audio src="${musicsChoices[0].audio}"></audio>
                  <div class="music-text" style="box-shadow: -19px -19px 0px -4px ${colorChoice}, -19px -19px 0px 0px black;">
                        <input type="hidden" value="${musicsChoices[0].id}">
                        <div class="music-title">${musicsChoices[0].title}</div>
                        <div class="music-artist">${musicsChoices[0].artist}</div> 
                        <div class="music-nbVote">${musicsChoices[0].nbVote}</div>
                  </div>
            </div>
            <h1 class="vs" style="color: ${colorChoice}">VS</h1>
            <div class="music" data-id="${musicsChoices[1].id}">
                  <div class="music-img">
                        <img src="${musicsChoices[1].imgUrl}" alt="${musicsChoices[1].title}">
                  </div>
                  <audio src="${musicsChoices[1].audio}"></audio>
                  <div class="music-text" style="box-shadow: -19px -19px 0px -4px ${colorChoice}, -19px -19px 0px 0px black; ">
                        <input type="hidden" value="${musicsChoices[1].id}">
                        <div class="music-title">${musicsChoices[1].title}</div>
                        <div class="music-artist">${musicsChoices[1].artist}</div> 
                        <div class="music-nbVote">${musicsChoices[1].nbVote}</div>
                  </div>
            </div>`;

      handleClick(musicsChoices);
};


async function putMusics(musicVote){
      const response = await fetch("https://629a00896f8c03a9784e867c.mockapi.io/musics/" + musicVote.id, {
            method: "PUT",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify({
                  "nbVote": musicVote.nbVote + 1
            })
      });
      const datas = await response.json();
};

function handleClick(musicsChoices){
      const musicElements = document.querySelectorAll(".music");
      musicElements.forEach((el)=> {
            el.addEventListener('click', (e) =>{
                  const musicVote = musicsChoices.find(elem => elem.id == el.querySelector("input").value);
                  putMusics(musicVote);
                  document.querySelectorAll(".music").forEach(el => el.remove());
                  musicsChoices = [];
                  modelingData();
            });
            // el.addEventListener('mouseover', (e) =>{
            //       el.querySelector("audio").play();
            //       el.addEventListener('mouseout', (e) =>{
            //             el.querySelector("audio").pause();
            //       });
            // });
      });
};