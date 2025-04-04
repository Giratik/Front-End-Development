import React, { useState, useEffect, useRef } from 'react';
import './drum_machine_style.css';

const heaterSounds = [
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const pianoSounds = [
  {
    keyCode: 65,
    key: 'A',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    keyCode: 81,
    key: 'Q',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];

const soundsName = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit',
};

const soundsGroup = {
  heaterKit: heaterSounds,
  smoothPianoKit: pianoSounds,
};

const KeyboardKey = ({ play, sound: { id, key, url, keyCode }, power }) => {
  const buttonRef = useRef(null);

  const handleKeydown = (e) => {
    if (keyCode === e.keyCode) {
      play(key, id);
      flicker();
    }
  };

  const handleClick = () => {
    play(key, id);
    flicker();
  };

  const flicker = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = '#f7804e';
      buttonRef.current.style.color = 'black';
      setTimeout(() => {
        buttonRef.current.style.backgroundColor = ''; // Revert to original
        buttonRef.current.style.color = ''; // Revert to original
      }, 50); // Super short flicker
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [play, keyCode]);

  return (
    <button
      value="test"
      id={keyCode}
      className="drum-pad"
      onClick={handleClick}
      ref={buttonRef}
      disabled={!power}
      style={{ color: !power ? 'gray' : '' }} // Add this line
    >
      <audio className="clip" src={url} id={key} />
      {key}
    </button>
  );
};

const Keyboard = ({ sounds, play, power }) => (
  <div className="keyboard">
    {sounds.map((sound) => (
      <KeyboardKey key={sound.id} sound={sound} play={play} power={power} />
    ))}
  </div>
);

const DrumControls = ({
  stop,
  name,
  power,
  volume,
  handleVolumeChange,
  changeSoundGroup,
}) => {
  return (
    <div className="controller">
      <div>
        <button onClick={stop}>Press to turn {power ? 'OFF' : 'ON'}</button>
      </div>

      <h2>Volume: %{Math.round(volume * 100)}</h2>
      <input
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h2 id="display">{name}</h2>

      <div>
      <button onClick={changeSoundGroup}>Change Instrument</button>
      </div>
    </div>
  );
};

const Drum_Machine = () => {
    const [power, setPower] = React.useState(true);
    const [volume, setVolume] = React.useState(1);
    const [soundName, setSoundName] = React.useState("");
    const [soundType, setSoundType] = React.useState("heaterKit");
    const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

  useEffect(() => {
    setSounds(soundsGroup[soundType]); // Update sounds when soundType changes
  }, [soundType]);

  const play = (key, sound) => {
    if (!power) return; // Don't play if power is off
    setSoundName(sound);
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
    }
  };

  const stop = () => {
    setPower((prevPower) => !prevPower);
  };

  const changeSoundGroup = () => {
    setSoundName("")
    if (soundType === "heaterKit") {
        setSoundType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
}

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(() => {
    const audioElements = document.querySelectorAll('.clip');
    audioElements.forEach((audio) => {
      audio.volume = volume;
    });
  }, [volume]);


  return (
    <div id="drum-machine">
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} />
        <DrumControls
          stop={stop}
          power={power}
          volume={volume}
          name={soundName || soundsName[soundType]}
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange}

        />
      </div>
    </div>
  );
};

export default Drum_Machine;