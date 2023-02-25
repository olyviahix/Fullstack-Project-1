
function getTracks(){
    fetch("http://localhost:3000/tracks")
    .then((r)=>r.json())
    .then((response)=>{
        showTrackData(response)
        console.log(response)
    }).catch(err=>console.error(err));
}

function showTrackData(jsonFormatResponse){
    const dropdown=document.createElement("select");
    const dropdown2=document.createElement("select")
    dropdown.id="select1";
    dropdown2.id="select2"
    const trackContainer=document.getElementById("trackContainer");
    
    
    for(let i in jsonFormatResponse){
    const trackOption=document.createElement("option");
    const trackOption2=document.createElement("option")
    const trackInfo=jsonFormatResponse[i];
        trackOption.innerText=trackInfo.trackName;
        trackOption2.innerText=trackInfo.trackName
        trackOption.value=trackInfo.trackId;
        trackOption2.value=trackInfo.trackId
        dropdown.appendChild(trackOption);
        dropdown2.appendChild(trackOption2)
    }
    trackContainer.appendChild(dropdown);
    lapContainer.appendChild(dropdown2)
    
}

getTracks()



function getLapTimes(){
    fetch("http://localhost:3000/UserTimes")
    .then((r)=>r.json())
    .then((response)=>{
        showLapTimeData(response)
        console.log(response)
    }).catch(err=>console.error(err));
}

function showLapTimeData(jsonFormatResponse){
    const lapTimeContainer=document.createElement("div")
    lapTimeContainer.id=("lapTimeContainer")
    lapTimeContainer.className=("lapTimeContainer")
    lapTimeContainer.style.backgroundColor="rgb(139, 136, 136)"
    const id=document.getElementById('select2').value

    
    console.log(id)
    
    for(let i in jsonFormatResponse){
        const trackInfo=jsonFormatResponse[i]
        if(jsonFormatResponse[i].trackId==id){
            const trackRow=document.createElement('div')
            trackRow.innerText=trackInfo.firstName + " " + trackInfo.lastName + " " + trackInfo.lapTime
            lapTimeContainer.appendChild(trackRow)
        }
    }
    let ltc=document.getElementById('ltc')
    ltc.appendChild(lapTimeContainer)
    let getLapTime=document.getElementById("getLapTime")
    getLapTime.addEventListener('click', ()=>{
        lapTimeContainer.style.display="none"

    })
}


function submitLapForm(){
    const trackId=document.getElementById('select1').value
    const firstName=document.getElementById('firstName').value
    const lastName=document.getElementById('lastName').value
    const lapTime=document.getElementById('lapTime').value
    
    fetch("http://localhost:3000/UserTimes",{
        method:'post',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            trackId:trackId,
            firstName:firstName,
            lastName:lastName,
            lapTime:lapTime
        })
    })
    .then(response=>{
        if(response.ok){
            console.log("Lap Time Submitted")
        }
        else{
            console.log("Failed To Submit Lap Time")
        }
    })
    .catch(error=>{
        console.log("Error Saving Lap Time", error)
    })
}






