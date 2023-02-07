
let resume;
let filterList;
let index = 0;
let totalResume;

//Get the data from json file.
fetch('./Data.json')
        .then(response => response.json())
        .then(data => { 
            resume = data.resume
            filterList = resume
            totalResume = filterList.length;
        })
        .then(() => displayResults());

let resumeDisplay = document.getElementById("resume");
let prev = document.getElementById('previous');
let next = document.getElementById('next');
let searchBox = document.getElementById("search-box");
let currentResume = document.getElementById('current-resume');

prev.addEventListener("click",() => navigator('prev'));
next.addEventListener("click",() => navigator('next'));
searchBox.addEventListener("input",search);


function checkIndex (){
    if(filterList.length === 0){
        prev.style.visibility="hidden"; 
        next.style.visibility="hidden"; 

        resumeDisplay.classList.add('error');
        resumeDisplay.classList.remove('resume');

        resumeDisplay.innerHTML = `
        <div class="error-image"></div>
        <div class="error-message">
            <p> <i class="fas fa-frown"></i> No such results found</p>
        </div>
        `;

        currentResume.innerHTML = ``
        return false;

    } else if(totalResume === 1){
        prev.style.visibility="hidden"; 
        next.style.visibility="hidden";
    } else if(index === 0){
        prev.style.visibility="hidden";
        next.style.visibility="visible";
    } 
        else if(index === 6){
            prev.style.visibility="visibility"
            next.style.visibility="hidden"
        }
    return true;
}

//Display the fetched data to browser.
function displayResults(){
    if(checkIndex()){

        resumeDisplay.classList.add('resume');
        resumeDisplay.classList.remove('error');

        resumeDisplay.innerHTML = `
        <div class="container">
            <div class="head">
            <div class="head-details">
                <h1 class="name">${filterList[index].basics.name}</h1>
                <h3 class="applied-for" id="applied-for">Applied For : ${filterList[index].basics.AppliedFor}</h3>
                <div class="icon">
                    <i class="fa fa-user"></i>
                </div>
            </div>
            </div>

            <div class="body-details">
                <div class="personal-details">
                    <table class="personal-info" id="personal-info">
                        <thead>
                            <tr><th>Personal Information</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>${filterList[index].basics.phone}</td></tr>
                            <tr><td>${filterList[index].basics.email}</td></tr>
                            <tr><td><a href="${filterList[index].basics.profiles.url}">${filterList[index].basics.profiles.network}</a></td></tr>
                        </tbody>
                    </table>
                    <table class="tech-skills" id="tech-skills">
                        <thead>
                            <tr><th>Technical Skills</th></tr>
                        </thead>
                        <tbody>
                            ${filterList[index].skills.keywords.map((keyword) => `<tr><td>${keyword}</td></tr>`).join("")}
                        </tbody>
                    </table>
                    <table class="hobbies" id="hobbies">
                        <thead>
                            <tr><th>Hobbies</th></tr>
                        </thead>
                        <tbody>
                            ${filterList[index].interests.hobbies.map((hobby) => `<tr><td>${hobby}</td></tr>`).join("")}
                        </tbody>
                    </table>
                </div>
            
                <div class="main-details">
                <section class="bio experience" id=""bio experience>
                    <h2>Work Experience in previous company</h2>
                    <p><b>Company Name :</b>${filterList[index].work["Company Name"]}</p>
                    <p><b>Position :</b>${filterList[index].work.Position}</p>
                    <p><b>Start Date :</b>${filterList[index].work["Start Date"]}</p>
                    <p><b>End Date :</b>${filterList[index].work["End Date"]}</p>
                    <p><b>Summary :</b>${filterList[index].work.Summary}</p>
                </section>
                <section class=" bio project id="bio project">
                    <h2>Project</h2>
                    <p>
                        <b>${filterList[index].projects.name} : </b> ${filterList[index].projects.description}
                    </p>    
                </section>
                <section class="bio education" id="bio education">
                    <h2>Education</h2>
                    <ul>
                        <li><b> UG : </b>
                            ${filterList[index].education.UG.institute},
                            ${filterList[index].education.UG.course}, 
                            ${filterList[index].education.UG["Start Date"]}, 
                            ${filterList[index].education.UG["End Date"]}, 
                            ${filterList[index].education.UG.cgpa}
                        </li>
                        <li> <b>PU: </b>
                            ${filterList[index].education["Senior Secondary"].institute}, 
                            ${filterList[index].education["Senior Secondary"].cgpa}
                        </li>
                        <li>
                            <b>High School: </b>
                            ${filterList[index].education["High School"].institute}, 
                            ${filterList[index].education["High School"].cgpa}
                        </li>
                    </ul>
                </section>
                <section class="bio internship" id=" bio internship">
                    <h2>Internship</h2>
                    <ul>
                        <li><b>Company Name :</b>${filterList[index].Internship["Company Name"]}</li>
                        <li><b>Position: </b>    ${filterList[index].Internship.Position}</li>
                        <li><b>Start Date: </b>  ${filterList[index].Internship["Start Date"]}</li>
                        <li><b>End Date: </b>    ${filterList[index].Internship["End Date"]}</li>
                        <li><b>Summary: </b>     ${filterList[index].Internship.Summary}</li>
                    </ul>
                </section>
                <section class="bio achievements" id=" bio achievements">
                    <h2>Achievements</h2>
                    <ul>
                        ${filterList[index].achievements.Summary.map((keyword) => `<li>${keyword}</li>`).join("")}
                    </ul>
                </section>
            </div>
        </div>`;
        currentResume.innerHTML =`Showing <b>${index + 1}</b> of <b>${totalResume}</b>`
}}

function search(){
    let searchInput = document.getElementById('search-box')
    .value.toUpperCase();
    filterList = resume.filter(
        item => (item.basics.AppliedFor.toUpperCase().indexOf(searchInput) > -1)
    );
    index = 0;
    // console.log(resume.filterList)


    displayResults();
}

        function navigator(param){

            if(param === 'next'){
                index = Math.min(index+1, totalResume-1);
                prev.style.visibility="visible";
                if(index === totalResume-1){
                    index = totalResume-1;
                    next.style.visibility="hidden";
                }
            }
            else{
                index = Math.max(index-1, 0);
                next.style.visibility="visible";
                if(index === 0){
                    prev.style.visibility="hidden";
                }
            }
            displayResults();
        }
