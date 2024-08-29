const cell_item=document.querySelectorAll('.cell');
const cell_grid=document.getElementById('cell-grid');
const restart=document.getElementById('restart');
const show_winner=document.getElementById('show-winner');
let check=0,level=1,winner=false;
const winCondition=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

cell_item.forEach((cell)=>{
    cell.content=false;
    cell.addEventListener('mouseout',(e)=>cellMouseout(e));
    cell.addEventListener('mouseover',(e)=>cellMouseover(e));
    cell.addEventListener('click',(e)=>cellClick(e));
})

restart.addEventListener('click',Restart);

function Restart(){
    restart.classList.add('hide');
    show_winner.classList.add('hide');
    level=1;check=0;winner=false;
    cell_item.forEach((cell)=>{
        cell.content=false;
        cell.style.cursor='pointer'
        cell.innerText='';
    })
}

function cellMouseover(e){
    let cell=e.target;
        if(!cell.content){
            if(level%2){
                cell.innerText='o';
                cell.classList.add('cell-content')
            }
            else{
                cell.innerText='x';
                cell.classList.add('cell-content')
            }
        }
    }

function cellMouseout(e){
    let cell=e.target;
    if(cell.content&&cell.content!=='none'){
            cell.innerText=cell.content;
    }
        else
            cell.innerText='';
}


function cellClick(e){
    let cell=e.target;
    if(!cell.content){
        cell.classList.remove('cell-content');
        cell.style.cursor='default';
        if(level%2){
            cell.innerText='o';
            cell.content='o';
        }
        else{
            cell.innerText='x';
            cell.content='x';
        }
    }
    if(level>=3)
        judgeWinner();
    level++;
}



function judgeWinner(){
    winCondition.forEach(w=>{
            let check=3;
            for(let i=0;i<3;i++){
                if(!cell_item[w[i]].content||cell_item[w[i]].content=='none')
                    check--;
            }
            //滿線了
            if(check==3){
                if((cell_item[w[0]].content===cell_item[w[1]].content)&&(cell_item[w[1]].content===cell_item[w[2]].content)){
                    winner=cell_item[w[0]].content;
                    show_winner.innerText=`${winner} win !`;
                    stopPlay();
                }
            }
    });
    if(winner){
        restart.classList.remove('hide');
        show_winner.classList.remove('hide');
    }
    else{
        if(level==9){
            show_winner.innerText=`Draw`;
            restart.classList.remove('hide');
            show_winner.classList.remove('hide');
        }
    }

}

function stopPlay(){
    cell_item.forEach(cell=>{
        if(!cell.content){
            cell.content='none';
            cell.style.cursor='default';
        }
    })
}