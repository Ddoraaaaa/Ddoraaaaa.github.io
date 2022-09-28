const years = [
    { 
        id: 2021, 
        bg: ".\/assets\/page1.png",
    }, 
    { 
        id: 2022, 
        bg: ".\/assets\/page2.png",
    }, 
    { 
        id: 2023, 
        bg: ".\/assets\/page3.png",
    },
    { 
        id: 0, 
        bg: ".\/assets\/page4.png",
    }
]; 
const PROJECTS = [
    {
        img: "https://placekitten.com/100/100",
        name: "Cool project 1!",
        brief: "Placeholder project to demonstrate my growth among the years",
        time: "Aug 2021",
        year: [0, 2021],
    },
    {
        img: "https://placekitten.com/200/200",
        name: "Cool project 2",
        brief: "Project to use in other cool stuffs very cool cool COOL!!!",
        time: "Feb 2022",
        year: [0, 2022],
    },
    {
        img: "https://placekitten.com/250/250",
        name: "Cool project 3",
        brief: "I like the bee movie pls love",
        time: "Jan 2021 - May 2022",
        year: [0, 2022],
    },
    {
        img: "https://placekitten.com/150/150",
        name: "Cool project 4",
        brief: "Peepeepoopoo bgfeuyuibadefbh dwiuef iufe iue fhiuefw u hefw huifew",
        time: "Jan 2023 - Feb 2023",
        year: [0, 2023],
    },
    {
        img: "https://placekitten.com/350/350",
        name: "Cool project 5",
        brief: "I went to jamaica and bought a racoon",
        time: "May 2023",
        year: [0, 2023],
    },
    {
        img: "https://placekitten.com/400/400",
        name: "Cool project 6",
        brief: "What does the fox say? Dinga ding ga ding ding ding dinga",
        time: "May 2023 - Dec 2023",
        year: [0, 2023],
    },
];

const EXPS = [
    {
        img: "https://pbs.twimg.com/profile_images/1554030696712359936/C0vq0Sju_400x400.jpg",
        name: "Optiver",
        brief: "I developed some things for them and they used those shit yeah haha!",
        time: " Dec 2021 - Jan 2022",
        year: [0, 2021, 2022],
    },
    {
        img: "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/0a3d4f75-a4ca-45e0-a4e5-95777c3e77d6.png?auto=format&size=150",
        name: "Blinq",
        brief: "They force me to blink. They held my family hostage and made me blink second-ly",
        time: "Jan 2022 - Feb 2023",
        year: [0, 2022, 2023],
    },
    {
        img: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/udrmtfofpr6abbz42gqj",
        name: "IntegraDev",
        brief: "They pay a lot. idk thats it. I like the ceo",
        time: "Mar 2023 - ~",
        year: [0, 2023],
    }
];

// console.log(1234);
var appendStr;

function insertImg(pne) {
    appendStr +=
            `
                <td style="height:8vh;width:10vw">
                    <img class="img-thing" width=1000px height=1000px src="${pne.img}">
                </td>`;
}

function insertTxt(pne, type) {
    const textAligns=["left", "right"];
    appendStr +=
            `
                <td style="height:8vh;width:60vw;text-align:${textAligns[type]}">
                    <div class="p-card-txt">
                        <p style="font-size:2.5vmin;margin-bottom:0vmin"><b>${pne.name}</b></p>
                        <p>${pne.brief}</p>
                    </div>
                    <div class="p-card-txt">
                        <p><i>${pne.time}</i></p>
                    </div>
                </td>
            `
}

function addPne(yearId) {
    let matchCount = 0;
    appendStr += 
`
    <div class="projects enp">
        <tr><h1 style="text-align:center;font-size: 4.5vmin;"><b>In ${yearId},</b></h1></tr>
        <tr><h1 style="text-align:center;font-size: 3vmin;"><b>I made...</b></h1></tr>`;

    for(const project of PROJECTS) {
        // console.log(project);
        if(project.year.includes(yearId)) {
            matchCount++;    
            if(matchCount>1) {
                appendStr +=
        `
        <hr class="small-border-line" align="center">`;
            }
            appendStr += 
        `
        <table class="enp-card">
            <tr>`;
            if(matchCount%2==0) {
                insertImg(project);
                insertTxt(project, 1);
            }
            else {
                insertTxt(project, 0);
                insertImg(project);
            }
            appendStr +=
        `
            </tr>
        </table>`;
        }
    }

    appendStr += 
    `
    </div>
    <tr><h1 style="text-align:center;font-size: 3vmin;"><b>...and went to...</b></h1></tr>
    <div class="experiences enp">`;
    // <hr class="border-line" align="center">

    const lastCount=matchCount;
    for(const exp of EXPS) {
        if(exp.year.includes(yearId)) {
            matchCount++;
            if(matchCount>lastCount+1) {
                appendStr +=
        `
        <hr class="small-border-line" align="center">`;
            }
            appendStr +=
        `
        <table class="enp-card">
            <tr>`;

            if(matchCount%2==0) {
                insertImg(exp);
                insertTxt(exp, 1);
            }
            else {
                insertTxt(exp, 0);
                insertImg(exp);
            }
            appendStr +=
        `
            </tr>
        </table>`;
        }
    }

    appendStr += 
    `
    </div>`;
}

function addYear(yearId) {
    let projs = [];
    let exps = [];

    for(const project of PROJECTS) {
        if(project.year.includes(yearId)) {
            projs.push(project);
        }
    }

    for(const exp of EXPS) {
        if(exp.year.includes(yearId)) {
            exps.push(exp);
        }
    }
    
    for(let i=0; i<Math.max(projs.length, exps.length); i++) {
        appendStr +=
        `
        <table class="summary">
            <tr>`;
        if(projs.length>i){
            const pne = projs[i];
            appendStr +=
            `
                <td style="height:5vh;width:40vw;text-align:right">
                    <div class="p-card-txt">
                        <p style="font-size:2.5vmin;margin-top:2vmin;margin-right:1vw"><b>${pne.name}</b></p>
                        <p style="margin-right:1vw">${pne.brief}</p>
                    </div>
                </td>
                <td style="height:5vh;width:5vw">
                    <img class="img-thing-summary" width=1000px height=1000px src="${pne.img}">
                </td>`;
        } 
        else {
            appendStr +=
            `
                <td style="height:5vh;width:40vw;">
                </td>
                <td style="height:5vh;width:5vw">
                </td>`;
        }

        appendStr +=
        `
            <td style="height:5vh;width:1vw;">
            </td>
            <td style="height:5vh;width:1vw">
            </td>`;

        if(exps.length>i){
            const pne = exps[i];
            appendStr +=
                `
                <td style="height:5vh;width:5vw">
                    <img class="img-thing-summary" width=1000px height=1000px src="${pne.img}">
                </td>
                <td style="height:5vh;width:40vw;text-align:left">
                    <div class="p-card-txt">
                        <p style="font-size:2.5vmin;margin-top:2vmin;margin-left:1vw"><b>${pne.name}</b></p>
                        <p style="margin-left:1vw">${pne.brief}</p>
                    </div>
                </td>`;
        } 
        else {
            appendStr +=
                `
                <td style="height:5vh;width:5vw">
                </td>
                <td style="height:5vh;width:40vw;">
                </td>`;
        }
        appendStr +=
        `
            </tr>
        </table>`;
    }

}

function addSummary() {
    let matchCount = 0;
    appendStr += 
`
    <div class="projects enp">
        <tr><h1 style="text-align:center;font-size: 4.5vmin;"><b>My journey</b></h1></tr>`;

    for(year of years) {  
        if(year.id==0) continue;  
        appendStr += 
        `
        <tr><h1 style="text-align:center;font-size: 3vmin;"><b>${year.id}</b></h1></tr>`
        addYear(year.id);
    }

    appendStr += 
    `
        <tr><h1 style="text-align:center;font-size: 3vmin;"><b>and to be continued...</b></h1></tr>
    </div>`;
}

for(year of years) {
    const contentSlide = document.createElement("div");
    // const controlSlide = document.createElement("div"); 
    const backgroundSlide = document.createElement("div");

    contentSlide.classList.add("swiper-slide", "content-slide");
    // controlSlide.classList.add("swiper-slide", "control-slide");
    backgroundSlide.classList.add("swiper-slide", "background-slide");
    
    appendStr=''; 
    if(year.id!=0) addPne(year.id);
    else addSummary();
    contentSlide.innerHTML=appendStr;
    // controlSlide.innerHTML=year.id; 
    backgroundSlide.innerHTML=`<img src=${year.bg} style="height:100vh;width:auto">`; 

    // console.log(appendStr);
    document.getElementById("content-wrapper").appendChild(contentSlide);
    // document.getElementById("control-wrapper").appendChild(controlSlide); 
    document.getElementById("background-wrapper").appendChild(backgroundSlide);
}
