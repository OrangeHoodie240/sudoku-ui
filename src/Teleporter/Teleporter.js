import react, { useEffect } from 'react'; 
import './Teleporter.css';
import portal from './platform.png';


import TeleporterEffects from '../TeleporterEffects/TeleporterEffects';

const Teleporter = (props)=>{
    const [rect, setRect] = react.useState(null);   
    
    const turnOffTime = 5000; 


    useEffect(()=>{
        if(rect){
            setTimeout(()=>{
                const teleporterObject = document.querySelector('.teleporter-object');
                teleporterObject.style.opacity = '.99';
            }, 500); 
        }   
    }, [rect]);


    useEffect(()=>{
        if(rect === null){
            let teleporterObject = document.querySelector('.teleporter-object')?.children[0];

            function setSizes(){
                const rectData = teleporterObject.getBoundingClientRect(); 
                teleporterObject.parentElement.style.width = rectData.width + 'px';
                teleporterObject.parentElement.style.height = rectData.heigth + 'px';
                if(!props.recursive){
                    const teleporterImg = document.querySelector('.teleporter-img');
                    teleporterImg.style.opacity = '1';
                    teleporterImg.style.width = (rectData.width * 2) + 'px';
                    teleporterImg.style.top =  (.6 * rectData.height) + 'px';
                    teleporterImg.style.left = (-rectData.width * .40) + 'px';
                    setTimeout(()=>{
                        teleporterImg.remove();
                    }, turnOffTime + 550);
                }



                setRect(rectData); 
            }
            if(teleporterObject){
                setSizes();
            }
            else{
                setTimeout(()=>{
                    teleporterObject = document.querySelector('.teleporter-object')?.children[0];
                    setSizes();
                }, 100);
            }

        }
    },[]);

    return (
        <div className='teleporter'>
            {props.recursive ? null : <img className='teleporter-img' style={{position: 'absolute', 'top': '0', left: '0', zIndex: '-1', opacity: '0'}} src={portal} />}
            <div>
                {rect ? 
                    <TeleporterEffects turnOffTime={turnOffTime} bigRect={rect} recursive={props.recusrive}></TeleporterEffects>
                :   null }
                <div className='teleporter-object'>
                    {props.children}
                </div>
            </div>

        </div>
    )

}; 



export default Teleporter; 