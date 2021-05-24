const container= document.querySelector('.grille');
const affichage= document.querySelector('h3');
let resultats =0;
let toutesLesDiv;
let alienInvaders=[];
let tireurPosition=229;
let direction = 1;
let width =20;
function creationGrilleEtAliens (){
    let indexAttr =0;
    for(i=0; i<240; i++){
        if (indexAttr === 0){
            const bloc=document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        }
        else if (indexAttr === 19){
            const bloc=document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr= 0;

            }
        else{
            const bloc=document.createElement('div');
            container.appendChild(bloc);
            indexAttr++
        }    
        }
        for(i=1; i<53; i++){
            if(i===13){
                i=21;
                alienInvaders.push(i);
            }else if (i ===33){
                i= 41;
                alienInvaders.push(i);
            }
            else{
                alienInvaders.push(i);
            }
        }
       console.log(alienInvaders);

        toutesLesDiv=document.querySelectorAll('.grille div');
        alienInvaders.forEach(invader =>{
            toutesLesDiv[invader].classList.add('alien');
        })
        toutesLesDiv[tireurPosition].classList.add('tireur');
    }
    creationGrilleEtAliens ();
    function deplacerLeTireur(e){
        toutesLesDiv[tireurPosition].classList.remove('tireur');
        if (e.keyCode === 37){
            if(tireurPosition >227){
                tireurPosition -= 1;
            }
        }
        if (e.keyCode === 39){
            if(tireurPosition < 239){
                tireurPosition += 1;
            }
        }
        toutesLesDiv[tireurPosition].classList.add('tireur');
    }
    document.addEventListener('keydown',  deplacerLeTireur);

    //bouger les alien

    let descendreRight =true;
    let descendreLeft = true;

    function bougerLesAliens(){
        for(let i=0; i<alienInvaders.length; i++){
           if (toutesLesDiv[alienInvaders[i]].getAttribute('data-right') ==='true'){
               if (descendreRight){
                   direction=20;
                   setTimeout(()=> {
                       descendreRight=false;
                   } , 50)
               }
               else if (descendreRight === false){
                   direction =-1;
               }
               descendreLeft=true;
           } else if(toutesLesDiv[alienInvaders[i]].getAttribute('data-left') === 'true'){
            if (descendreLeft){
                direction=20;
                setTimeout(()=> {
                    descendreLeft=false;
                } , 50)
            }
            else if (descendreLeft === false){
                direction = 1;
            } 
            descendreRight=true; 
           }
        
        }
        for(let i=0; i<alienInvaders.length; i++){
            toutesLesDiv[alienInvaders[i]].classList.remove('alien');
        }
        for(let i=0; i<alienInvaders.length; i++){
            alienInvaders[i] += direction;
        }
        for(let i=0; i<alienInvaders.length; i++){
            toutesLesDiv[alienInvaders[i]].classList.add('alien');
            
    }
        if(toutesLesDiv[tireurPosition].classList.contains('alien' , 'tireur')){
            affichage.textContent = "Gameover";
            toutesLesDiv[tireurPosition].classList.add('boom');
            clearInterval(invaderId);
        }
        for(let i =0; i< alienInvaders.length; i++){
            if(alienInvaders[i] > toutesLesDiv.length -width){
            affichage.textContent =" Game Over";
            clearInterval(invaderId);
        }

}}
    invaderId = setInterval(bougerLesAliens, 500);

    //le laser
    function tirer(e){
        let laserId;
        let laserEnCours = tireurPosition;
        function deplacementLaser(){
            toutesLesDiv[laserEnCours].classList.remove("laser");
            laserEnCours -= Width;
            toutesLesDiv[laserEnCours].classList.add('laser');
       
         if(toutesLesDiv[laserEnCours].classList.contains('alien')){
             toutesLesDiv[laserEnCours].classList.remove('laser');
             toutesLesDiv[laserEnCours].classList.remove('alien');
             toutesLesDiv[laserEnCours].classList.add('boom');

             alienInvaders = alienInvaders.filter (el =>el !== laserEnCours)

             setTimeout(() => toutesLesDiv[laserEnCours].classList.remove('boom'), 250)
             clearInterval(laserId);

             resultats++;
             if (resultats ===36){
                 affichage.textContent= "bravo c'est gagné";
                 clearInterval (invaderId);
             }
             else{
                 affichage.textContent= `Score : ${resultats}`;
             }
         }   


        if (laserEnCours < width){
            clearInterval(laserId);
            setTimeout(() => {
                toutesLesDiv[laserEnCours].classList.remove('laser')
            } , 100 )
        }

        }
        if (e.keycode === 32){
            laserId = setInterval(()=> {
                deplacementLaser();
            } , 100)
        }
    }

    document.addEventListener('keyup' , tirer);
