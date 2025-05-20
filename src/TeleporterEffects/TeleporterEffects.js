import react, { useEffect, useMemo, useState } from 'react';
import './TeleporterEffects.css';

const divideFactor = 9;
const multiplyFactor = 4; 
const TeleporterEffects = ({turnOffTime, bigRect, recursive=false})=>{

    const effectWidth = bigRect.width / divideFactor;
    const effectHeight = bigRect.height / divideFactor;
    const effectsExist = react.useRef(false); 


   
    const fadeTime = 250; 

    const [running, setRunning] = react.useState(true); 

    useMemo(()=>{
        setTimeout(()=>{
            setRunning(false);
        }, turnOffTime)
    }, []);

    function getTopLeft(row, col, order){
        order++; 
        order = order > 4  ? order % 4 === 0 ? 4 : order % 4 : order; 



        const startX = (row * effectWidth); 
        const startY = (col * effectHeight) - effectHeight / 2;
        
        
        let x, y = 0; 
        switch(order){
            case 1:
                x = startX + effectWidth / 4; 
                y = startY + effectHeight / 4; 
                break;
            case 2: 
                x = startX + effectWidth * .75; 
                y = startY + effectHeight / 4; 
                break;
            case 3: 
                x = startX + effectWidth * .75; 
                y = startY + effectWidth * .75; 
                break;
            case 4: 
                x = startX + effectWidth / 4; 
                y = startY + effectWidth * .75; 
        }

        return {x, y, row, col, startX, startY}; 
    }

    const effects = react.useRef([]);
    const effectsData = react.useRef([]);
    if(!effectsExist.current){
        for(let i = 0; i < divideFactor; i++){
            for(let j = 0; j < divideFactor; j++){
                for(let k = 0; k < multiplyFactor; k++){
                    const topLeft = getTopLeft(i,j, k);
                    effects.current.push(<div className={recursive ? 'teleporter-effect-recusrive' : 'teleporter-effect'} id={`effect-${i}-${j}-${k}`} style={{opacity: '0', top: topLeft.y + "px", left: topLeft.x + 'px', width: effectWidth, height: effectHeight}} ></div>);
                    effectsData.current.push({row: i, col: j, order: k, id: `effect-${i}-${j}-${k}`, delay: k % 2 === 0 ? 0 : 250});
                }
            }
        }
        effectsExist.current = true; 
    }

    const noDelayEffects = react.useRef([]);
    const delayEffects = react.useRef([]);


    useEffect(()=>{
        if(delayEffects.current.length === 0){
            for(let data of effectsData.current){
                if(data.delay){
                    delayEffects.current.push(document.getElementById(data.id)); 
                }
                else{
                    noDelayEffects.current.push(document.getElementById(data.id)); 
                }
            }
            function renderEffect(effects){
                setTimeout(()=>{
                    for(let effect of effects){
                        effect.style.transition = `opacity ${fadeTime}ms, transform ${fadeTime}ms`;
                        effect.style.opacity ='0'; 
                        const maxX = effectWidth * (recursive ? 3 : 1); 
                        const maxY = effectHeight * (recursive ? 3 : 1);
                        const xRate = Math.random(); 
                        const yRate = 1 - xRate; 
                        let flipX = Math.random() > .5 ? 1 : -1; 
                        let flipY = Math.random() > .5 ? 1 : -1; 
                        const translate = `translate(${flipX * maxX * xRate}px, ${flipY * maxY * yRate}px)`;
                        effect.style.transform = translate;
                    }

                    setTimeout(()=>{
                        for(let effect of effects){
                            effect.style.transition = 'none';
                            effect.style.transform = 'translate(0px,0px)'; 
                            effect.style.opacity = '.6'; 
                        }
                        renderEffect(effects); 
                    }, fadeTime);
                }, 0);
            }
            
            for(let el of noDelayEffects.current){
                el.style.opacity = '.6';                    
            }
            renderEffect(noDelayEffects.current); 

            setTimeout(()=>{
                for(let el of delayEffects.current){
                    el.style.opacity = '.6';                    
                }
                renderEffect(delayEffects.current); 
            }, 250);
        }
    }, []);

    const result = running ? effects.current : null;
    return result;

};

export default TeleporterEffects; 