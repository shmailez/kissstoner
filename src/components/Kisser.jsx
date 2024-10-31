/* eslint-disable react/prop-types */
import img from '../assets/Kiss.png'
import kissSound from '../assets/kiss-sound.mp3'

const Kisser = (props) => {

    let kissAudio = new Audio(kissSound)
    
    const startKiss = () => {
        kissAudio.play()
    }

    if(props.isKissing) {
        startKiss()
    }

    return <>
        <div className="kiss-counter">Поцелуев: {props.kissCounter}</div>
        <div><img className={`kiss-image ${props.isKissing && 'kiss-visible'}`} src={img} alt="" /></div>
    </>
}

export default Kisser