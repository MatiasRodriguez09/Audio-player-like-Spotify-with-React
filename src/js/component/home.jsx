import React, {useState, useEffect, useRef} from "react";


const Home = () => {
    //USE.STATE
	
    const [lista, setLista] =useState([]);
	let [position, setPosition]= useState(0);
	let play = useRef(0);

	//USE.EFFECT
    useEffect(()=>{
        //codigo a ejecutar
    fetch('https://assets.breatheco.de/apis/sound/songs')
    .then((response)=>response.json())
    .then((data)=>setLista(data))
    },[])

	function playMusic(url, index){
		if(play.current.paused){
			play.current.src= `https://assets.breatheco.de/apis/sound/${url}`
			play.current.play()

		} else {
			play.current.pause
		}
		setPosition(index)
	}

	function playNext(){
		setPosition(position ++)
		play.current.src=`https://assets.breatheco.de/apis/sound/${lista[position].url}`
		play.current.play()
	}
	function playBack(){
		setPosition(position --)
		play.current.src=`https://assets.breatheco.de/apis/sound/${lista[position].url}`
		play.current.play()
	}

	return (
         <>
			<div className="container w-50 m-3 p-3">
				<div className="list-group bg-dark rounded-0">
					{lista.map((item,index)=><button className="btn btn-dark text-start rounded-0" onClick={() => playMusic(item.url,index)} type="button" key={index}>{index} {item.name}</button>)}
				</div>
				<div className="d-flex justify-content-center bg-dark border-top">
					<button onClick={playBack}><i className="fa fa-backward"></i></button>
					<audio ref={play} controls/>
					<button onClick={playNext}><i className="fa fa-forward"></i></button>
				</div>
			</div>
        </>
    );
};   export default Home;
