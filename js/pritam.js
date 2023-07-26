console.log("welcome to the pritam");

//displaying the song in the page
pritamsongs = [
    { name: "Kabira", count: "103,077,869", time: "4:20", src: "../images/pritam1.jpeg" },
    { name: "Shayad", count: "191,840,566", time: "4:28", src: "../images/arijit4.jpeg" },
    { name: "Tum Se Hi", count: "101,697,190", time: "3:28", src: "../images/pritam2.jpg" },
    { name: "Gerua", count: "191,480,566", time: "4:48", src: "../images/pritam3.jpeg" },
    { name: "Tere Siva Jag mein", count: "138,441,672", time: "3:26", src: "../images/pritam5.jpeg" },
    { name: "Aabaad Barbaad", count: "192,028,457", time: "5:09", src: "../images/pritam6.jpeg" },
    { name: "Haan Main Galat", count: "56,421,806", time: "3:38", src: "../images/pritam7.jpeg" },
    { name: "Rahogi Meri", count: "71,204,574", time: "4:12", src: "../images/pritam8.jpeg" },
    { name: "Hawayein", count: "47,926,280", time: "4:49", src: "../images/pritam9.jpeg" },
    { name: "Nach Meri Jaan", count: "111,291,610", time: "4:47", src: "../images/pritam10.jpeg" }
]

pritamsongs.forEach((e, i) => {
    let songlist = document.getElementById("songlist")
    songlist.innerHTML += `<div class="song">
                                <div class="index" id="index${i}">${i + 1}</div>
                                <div class="songimg"><img src="${e.src}"></div>
                                <div class="songname">${e.name}</div>
                                <div class="songcount">${e.count}</div>
                                <div class="songtime">${e.time}</div>
                                <div><i class="fa-solid fa-play songicon" id="${i}songicon"></i></div>
                            </div>`
});

// this is the main javascript
let issongplay = 0
let playbtn = document.getElementById("playbtn")
let backbtn = document.getElementById("backbtn")
let nextbtn = document.getElementById("nextbtn")
let songname = document.getElementById("songname")
let volume = document.getElementById("volume")
let heart = document.getElementById("heart")
let range = document.getElementById("range")
let volumerange = document.getElementById("volumerange")
let songicon = document.getElementsByClassName("songicon")
let songfulltime = document.getElementById("songfulltime")
let songcurrenttimeupdate = document.getElementById("songcurrenttimeupdate")
let songindex = 1
let isvolume = 1
let audioelement = new Audio(`../songs/pritam${songindex}.mp3`)

const nextsongauto = () => {
    audioelement.addEventListener("ended", () => {
        console.log("ended");
        audioelement.currentTime = 0
        audioelement.play()
        // songindex = songindex + 1

    })
}

const playbtnfunction = () => {
    if (issongplay == 0) {
        playbtn.classList.remove("fa-play")
        playbtn.classList.add("fa-pause")
        issongplay = 1
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        audioelement.play()
        audioelement.volume = 0.5
        songname.innerHTML = `${pritamsongs[songindex - 1].name}`

        //setting time and the range
        timeandrange()

        //next song play automatically
        nextsongauto()
    }
    else if (issongplay == 1) {
        playbtn.classList.remove("fa-pause")
        playbtn.classList.add("fa-play")
        issongplay = 0
        audioelement.pause()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `${songindex}`
    }
}

const timeandrange = () => {
    setInterval(() => {
        let songcurrenttime = audioelement.currentTime
        barvalue = (songcurrenttime * 100) / audioelement.duration
        range.value = barvalue
        songcurrenttimeupdate.innerHTML = `${parseInt(audioelement.currentTime)}`
        songfulltime.innerHTML = `${parseInt(audioelement.duration)}`
    }, 1000);

    range.addEventListener("change", () => {
        let currenttime = (range.value * audioelement.duration) / 100
        audioelement.currentTime = currenttime
    })
}

const makeallindex = () => {
    Array.from(document.getElementsByClassName("index")).forEach((e, i) => {
        e.innerHTML = i + 1
    })
}

playbtn.addEventListener("click", playbtnfunction)

window.addEventListener("keypress", (e) => {
    if (e.key == " ") {
        playbtnfunction()
    }
})

nextbtn.addEventListener("click", () => {
    console.log("next click");
    makeallplay()
    songindex = songindex + 1
    audioelement.pause()

    if (issongplay == 0 || songindex < 11) {
        playbtn.classList.remove("fa-play")
        playbtn.classList.add("fa-pause")
        console.log(songindex);
        audioelement = new Audio(`../songs/pritam${songindex}.mp3`)
        audioelement.play()
        makeallindex()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        audioelement.volume = 0.5
        issongplay = 1
        songname.innerHTML = `${pritamsongs[songindex - 1].name}`

        Array.from(songicon).forEach((e, index) => {
            makeallplay()

        })

        //setting time and the range
        timeandrange()

        //next song play automatically
        nextsongauto()
    }
    else if (issongplay == 1 && songindex < 11) {
        console.log(songindex);
        audioelement = new Audio(`../songs/pritam${songindex}.mp3`)
        audioelement.play()
        makeallindex()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        let currentsongicon = document.getElementById(`${songindex}songicon`)
        currentsongicon.classList.remove("fa-play")
        currentsongicon.classList.add("fa-pause")
        audioelement.volume = 0.5
        issongplay = 1
        songname.innerHTML = `${pritamsongs[songindex - 1].name}`

        //setting time and the range
        timeandrange()

        //next song play automatically
        nextsongauto()
    }
    else {
        console.log("there are some error");
        alert("you are listning the last song of the list")
        songindex = 10
        audioelement = new Audio(`../songs/pritam${songindex}.mp3`)
        audioelement.play()
        makeallindex()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        let currentsongicon = document.getElementById(`${songindex - 1}songicon`)
        console.log(currentsongicon);
    }
})

backbtn.addEventListener("click", () => {
    console.log("click on back");
    makeallplay()
    audioelement.pause()
    if (songindex == 1) {
        alert("you are listening the first song")
        audioelement = new Audio(`../songs/pritam${songindex}.mp3`)
        audioelement.play()
        makeallindex()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        //next song play automatically
        nextsongauto()
        playbtn.classList.remove("fa-play")
        playbtn.classList.add("fa-pause")
    }
    else if (songindex < 10 || songindex == 10) {
        songindex = songindex - 1
        audioelement = new Audio(`../songs/pritam${songindex}.mp3`)
        audioelement.play()
        makeallindex()
        let gifindex = document.getElementById(`index${songindex - 1}`)
        gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`
        audioelement.volume = 0.5
        songname.innerHTML = `${pritamsongs[songindex - 1].name}`
        issongplay = 1
        playbtn.classList.remove("fa-play")
        playbtn.classList.add("fa-pause")

        //setting time and the range
        timeandrange()

        //next song play automatically
        nextsongauto()
    }
})

volume.addEventListener("click", () => {
    if (isvolume == 1) {
        audioelement.volume = 0
        isvolume = 0
        volume.classList.remove("fa-volume-high")
        volume.classList.add("fa-volume-xmark")
        console.log("volume off");
    } else if (isvolume == 0) {
        audioelement.volume = 1
        isvolume = 1
        volume.classList.remove("fa-volume-xmark")
        volume.classList.add("fa-volume-high")
        console.log("volume on");
    }
})

let givenheart = 0
heart.addEventListener("click", () => {
    if (givenheart == 0) {
        heart.classList.remove("fa-regular")
        heart.classList.add("fa-solid")
        givenheart = 1
    }
    else if (givenheart == 1) {
        alert("you have already liked this song")
    }
})

volumerange.addEventListener("change", () => {
    volumeindex = volumerange.value / 100
    audioelement.volume = volumeindex
})

Array.from(songicon).forEach((e, index) => {
    e.addEventListener("click", () => {
        console.log("you have click on the icon");
        console.log(e, index);
        makeallplay()
        audioelement.pause()
        // makeallindex()
        audioelement = new Audio(`../songs/pritam${index + 1}.mp3`)
        e.classList.remove("fa-play")
        e.classList.add("fa-pause")
        if (issongplay == 0) {
            e.classList.remove("fa-play")
            e.classList.add("fa-pause")
            issongplay = 1
            audioelement.play()
            audioelement.volume = 0.5
            songname.innerHTML = `${pritamsongs[index].name}`
            audioelement.duration = audioelement.duration
            console.log(audioelement.duration);
            playbtn.classList.remove("fa-play")
            playbtn.classList.add("fa-pause")
            songindex = index + 1
            makeallindex()
            let gifindex = document.getElementById(`index${songindex - 1}`)
            gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`

            //setting time and the range
            timeandrange()

            //next song play automatically
            nextsongauto()
        } else if (issongplay == 1) {
            e.classList.remove("fa-play")
            e.classList.add("fa-pause")
            issongplay = 1
            audioelement.play()
            audioelement.volume = 0.5
            songname.innerHTML = `${pritamsongs[index].name}`
            audioelement.duration = audioelement.duration
            console.log(audioelement.duration);
            playbtn.classList.remove("fa-play")
            playbtn.classList.add("fa-pause")
            songindex = index + 1
            makeallindex()
            let gifindex = document.getElementById(`index${songindex - 1}`)
            gifindex.innerHTML = `<img class="dancegif" src="../images/dancegif.gif">`

            //setting time and the range
            timeandrange()

            //next song play automatically
            nextsongauto()
        }
    })
})

makeallplay = () => {
    Array.from(songicon).forEach((e) => {
        e.classList.remove("fa-pause")
        e.classList.add("fa-play")
    })
}

onkeyup = ()=>{
    let filter = search.value.toUpperCase()
    console.log(filter);
    let songname = document.getElementsByClassName("songname")  
    console.log(songname);
    for (let i = 0; i < songname.length; i++) {
        const element = songname[i].innerHTML.toUpperCase();
        console.log(element);

        if(element.indexOf(filter) > -1){
            let song = document.getElementsByClassName("song")
            console.log(song);
            song[i].style.display = ""
        }else{
            console.log("no");
            let song = document.getElementsByClassName("song")
            // console.log(song);
            song[i].style.display = "none"
        }        
    }
}