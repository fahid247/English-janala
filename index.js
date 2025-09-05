

function loadLessons (){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(lessons=>lessons.json())
    .then(data=>display(data.data))
}
function display(data){
    const container = document.querySelector('.lessonsContainer')
    container.innerHTML="";
    data.forEach(element => {
        btnDiv= document.createElement("div")
        btnDiv.innerHTML=`
        <button id="btn-level-${element.level_no}" onclick="fetchLevel(${element.level_no})" class="btn level-btn btn-outline btn-primary" href=""
                  ><i class="fa-solid fa-book-open"></i>Lesson -${element.level_no}</button
                >
                `
                container.appendChild(btnDiv);
            });

}
loadLessons();

function fetchLevel(id){
    const URL = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(URL)
    .then(res=>res.json())
    .then(data=>{
        showLevelWord(data.data)
        removeClass()
        document.querySelector(`#btn-level-${id}`).classList.add('active');
    })
}


function removeClass(){
    const btns = document.querySelectorAll('.level-btn')
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
}

function showLevelWord(data){
    const container = document.querySelector('.cardsContainer')
    container.innerHTML =""
     if(data.length == 0){
        container.innerHTML=`
            <div class="col-span-full bg-[rgba(248,248,248,1)] max-w-[1760px] mx-auto rounded-3xl py-16">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="hind text-sm text-[rgba(121,113,107,1)] text-center mt-4 mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="hind font-medium text-4xl text-center mt-3">নেক্সট Lesson এ যান</h1>
          </div>
        `
     }
    document.querySelector('.defaultText').classList.add('hidden')
    data.forEach(element => {
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl p-3 sm:p-20 text-center h-full">
            <h1 class="inter font-bold text-3xl">${element.word?element.word:"word is missing"}</h1>
            <p class="inter font-medium text-xl mt-3">Meaning/Pronunciation</p>
            <h1 class="hind font-semibold text-3xl mt-6">"${element.meaning?element.meaning:"fail to find meaning"} / ${element.pronunciation?element.pronunciation:"can't pronunciate this word"} "</h1>
            <div class="icons flex justify-between mt-14">
              <button onclick="loadWord(${element.id})" class="btn bg-[rgba(26,145,255,0.1)] rounded-lg w-14 h-14 flex justify-center items-center"><i class="fa-solid fa-circle-info"></i></button>
              <button class= "btn bg-[rgba(26,145,255,0.1)] rounded-lg w-14 h-14 flex justify-center items-center"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `
        container.appendChild(card);
    });
}

function loadWord(id){
    const URL =`https://openapi.programming-hero.com/api/word/${id}`
    fetch(URL)
    .then(res=>res.json())
    .then(data=>showData(data.data))
}

function showData(data){
    const h3 = document.querySelector('.modal-box')
    h3.innerHTML =`
        <h1 class="poppins font-semibold text-4xl mb-8">${data.word}(<i class="fa-solid fa-microphone-lines"></i> : ${data.pronunciation})</h1>
        <h2 class="mb-2 font-bold">Meaning</h2>
        <p>${data.meaning}</p>
        <h2 class="mt-8 font-bold">Example</h2>
        <p class="mt-2">${data.sentence}</p>
        <h2 class"mt-8 mb-2 font-bold">সমার্থক শব্দ গুলো</h2>
        <div class"mt-2">${createElements(data.synonyms)}</div>
        <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
    `
    my_modal_5.showModal();
}
        
const createElements=(arr)=>{
    const spans = arr.map((el)=>`<span class="btn">${el}</span>`);
    return spans.join(" ");
    
}