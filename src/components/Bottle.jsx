const Bottle = (isCountdownActive, countdown, isSpinning, rotationAngle, bottleIndex, startSpin) => {

    console.log('b inside',isSpinning, rotationAngle, bottleIndex, startSpin)

    return <>
    {isCountdownActive && <div className="countdown">{countdown}</div>}
    <div className="bottle-container">
        <div
          className="bottle"
          style={{
            // transform: `rotate(${isSpinning ? rotationAngle : 0}deg)`,
            // transform: `rotate(${isSpinning ? rotationAngle : bottleAngle}deg)`,
            transform: `rotate(${isSpinning ? rotationAngle : bottleIndex}deg)`,
            transition: isSpinning ? 'transform 4s ease-out' : 'none',
          }}
          onClick={startSpin}
        ></div>
      </div>
    </>
}

export default Bottle