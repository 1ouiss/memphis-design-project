let backgroundList = ['../img/bg1.jpg','../img/bg2.jpg','../img/bg3.jpg','../img/bg4.jpg','../img/bg5.jpg'];
let datas = [];
let musicsChoices = [];
let musicsList = [];
let backgroundListUsed = [];

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

      for (let index = 0; index < 2; index++) {
            const randomElement = musicsList[Math.floor(Math.random() * musicsList.length)];
            musicsChoices.push(randomElement);
            musicsList.splice(musicsList.indexOf(randomElement), 1);
      };

      const musicContainer = document.querySelector("#music-container");

      musicsChoices.forEach(music => {
            const musicElement = document.createElement("div");
            musicElement.classList.add("music");
            musicElement.innerHTML = `
                  <div class="music-img">
                        <img src="${music.imgUrl}" alt="${music.title}">
                  </div>
                  <div class="music-text">
                        <input type="hidden" value="${music.id}">
                        <div class="music-title">${music.title}<span> ${music.years}</span></div>
                        <div class="music-artist">${music.artist}</div> 
                        <div class="music-nbVote">${music.nbVote}</div>
                  </div>`;
                  // add VS between 2 musics and remove forEach musicsChoices
                  // musicsChoices[0] and [1]
            musicContainer.append(musicElement);
      });

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
      });
};