/* eslint-disable react/prop-types */

import bottleSound from '../assets/spinning-sound.mp3'
const Bottle = (props) => {

    console.log('b inside',props)

    let bottleAudio = new Audio(bottleSound)
    const startBottle = () => {
      bottleAudio.play()
    }

    if (props.isSpinning) {
      startBottle()
    }

    return <>
    {props.isCountdownActive && <div className="countdown">{props.countdown}</div>}
    <div className="bottle-container">
        <div
          className="bottle"
          style={{
            transform: `rotate(${props.isSpinning ? props.rotationAngle : props.bottleIndex}deg)`,
            transition: props.isSpinning ? 'transform 4s ease-out' : 'none',
          }}
          onClick={props.startSpin}
        ></div>
      </div>
    </>
}

export default Bottle