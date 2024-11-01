import { useEffect, useState } from 'react';
import './App.css';

import Bottle from './components/Bottle';
import { playersArray } from './data/players';
import Kisser from './components/Kisser';

const App = () => {
  const [players] = useState(playersArray);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [kissCounter, setKissCounter] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetPlayerIndex, setTargetPlayerIndex] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isKissing, setIsKissing] = useState(false);
  const [bottleIndex, setBottleIndex] = useState(0)
  const [circleRadius, setCircleRadius] = useState(200);

  useEffect(() => {
    const updateRadius = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setCircleRadius((minDimension * 0.6) / 2); 
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const startSpin = () => {
    setIsCountdownActive(true);
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          spinBottle();
          setIsCountdownActive(false);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
  };

const getRandomPlayerIndex = (excludeIndex, maxPlayers) => {
  let index;
  do {
    index = Math.floor(Math.random() * maxPlayers);
  } while (index === excludeIndex);
  return index;
};

  const spinBottle = () => {
    setIsSpinning(true);
    const nextPlayerIndex = getRandomPlayerIndex(activePlayerIndex, players.length);
    const anglePerPlayer = 360 / players.length;
    const targetAngle = nextPlayerIndex * anglePerPlayer;

    const spins = 4 * 360;
    setBottleIndex(nextPlayerIndex * 36 + 90)
    setRotationAngle(spins + targetAngle + 90);
    
    setTimeout(() => {
      setIsSpinning(false);
     
      setKissCounter(prev => prev + 1);
      
      setIsKissing(true);
      setTargetPlayerIndex(nextPlayerIndex);
      
      const spins = 4 * 360;
      setRotationAngle(spins + bottleIndex);
      
      setTimeout(() => {
        setActivePlayerIndex(nextPlayerIndex);
        setIsKissing(false);
      }, 2000);
    }, 4000);
  };

  

  return (
    <div className="game-field">

      <Kisser
      isKissing={isKissing}
      kissCounter={kissCounter}/>

      <div className="players-circle">
          {players.map((player, index) => {
            const angle = (360 / players.length) * index;
            const x = circleRadius * Math.cos((angle * Math.PI) / 180) - 40;
            const y = circleRadius * Math.sin((angle * Math.PI) / 180) - 40;
            return (   
              <div
                key={player.id}
                className={`player-circle ${index === activePlayerIndex ? 'active' : ''} ${index === targetPlayerIndex ? 'target' : ''} ${isKissing && (index === activePlayerIndex || index === targetPlayerIndex) ? 'kissing' : ''}`}
                style={{transform: `translate(${isKissing && (index === activePlayerIndex || index === targetPlayerIndex) ? 0: x}px, ${isKissing && (index === activePlayerIndex || index === targetPlayerIndex) ? 0: y}px)` }}
              >
                <img src={`../kissstoner/public/image/${player.id}.png`} alt={player.id} />
              </div>
            );
          })}
      </div>

      <Bottle
      isCountdownActive={isCountdownActive}
      countdown={countdown}
      isSpinning={isSpinning}
      rotationAngle={rotationAngle}
      bottleIndex={bottleIndex}
      startSpin={startSpin}
      />
    </div>
  );
};

export default App;

