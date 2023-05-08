let timeLabel=document.querySelector("#time");
let rightBtn=document.querySelector("#rightbtn");
let leftBtn=document.querySelector("#leftbtn");

let init=true;
let rightPressed=true;
let leftReset=false;
let paused=false;
let totalLaps=0;

function resetLeft(){
    leftReset=false;
    leftBtn.classList.remove("btn-danger","button-outline-danger");
    leftBtn.classList.add("btn-secondary","button-outline-gray");
    leftBtn.children[0].classList.remove("fa-trash-can");
    leftBtn.children[0].classList.add("fa-clipboard");      
    leftBtn.title="Record a lap";  
}

function swap(){
    if(rightPressed){
        rightPressed=false;

        rightBtn.classList.remove('button-outline-green','btn-success');
        rightBtn.children[0].classList.remove('fa-play');
        
        rightBtn.classList.add('button-outline-danger','btn-danger');
        rightBtn.children[0].classList.add('fa-pause');
        rightBtn.title="Pause";
        
        resetLeft();
        paused=false;
        init=false;
    }
    else{
        rightPressed=true;
        rightBtn.classList.remove('button-outline-danger','btn-danger');
        rightBtn.children[0].classList.remove('fa-pause');        

        rightBtn.classList.add('button-outline-green','btn-success');
        rightBtn.children[0].classList.add("fa-play"); 
        rightBtn.title="Start";       

        leftReset=true;
        leftBtn.classList.remove("btn-secondary","button-outline-gray");
        leftBtn.classList.add("btn-danger","button-outline-danger");
        leftBtn.children[0].classList.remove("fa-clipboard");   
        leftBtn.children[0].classList.add("fa-trash-can");
        leftBtn.title="Reset Stop-Watch";
        paused=true;
    }
}

let h=0,m=0,s=0,ml=0;
let timeKeeper;
let timeText="00:00:00:0.00";
rightBtn.addEventListener('click',function(){
    swap();
    if(!paused){
        timeKeeper = setInterval(function(){        
            ml+=10;
            if(ml==1000){                
                ml=0;
                s++;
            }
            if(s==60){
                s=0;
                m++;
            }
            if(m==60){
                m=0;
                h++;
            }
            timeText=`${(h<10)?'0'+h:h}:${(m<10)?'0'+m:m}:${(s<10)?'0'+s:s}:${(ml/1000).toFixed(2)}`;
            timeLabel.innerText=timeText;
        },10);
    }
    else{
        clearInterval(timeKeeper);
    }
});

leftBtn.addEventListener('click',function(){    
    let laps=document.querySelector("#laps");
    if(!paused){ 
        if(!init){       
            let div_row = document.createElement("div");
            div_row.classList.add("row","p-3","justify-content-around","h-centered","w-50","border-bottom","hover-big","border-secondary");
                let div_col1 = document.createElement("div");
                div_col1.classList.add("col-6", "text-left");
                div_col1.innerText=`Lap ${++totalLaps}`;

                let div_col2 = document.createElement("div-4");
                div_col2.classList.add("col-6","text-right");
                div_col2.innerText=`${timeText}`;

            div_row.appendChild(div_col1);
            div_row.appendChild(div_col2);

            laps.appendChild(div_row);
        }
    }
    else{
        clearInterval(timeKeeper);
        totalLaps=0;
        ml=s=m=h=0;
        laps.innerHTML='';
        timeLabel.innerText="00:00:00:0.00";         
        resetLeft();
        init=true; 
    }
});