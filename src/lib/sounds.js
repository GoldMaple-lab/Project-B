let correctSynth, incorrectSynth, completeSynth;

// ฟังก์ชันสำหรับ khởi tạo เสียง (จะถูกเรียกใน useEffect)
export const initializeSounds = () => {
  if (typeof window.Tone !== 'undefined' && !correctSynth) {
    correctSynth = new window.Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();

    incorrectSynth = new window.Tone.MonoSynth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
      filter: { type: 'lowpass', Q: 2 },
      filterEnvelope: { attack: 0.02, decay: 0.1, baseFrequency: 200, octaves: 2 }
    }).toDestination();
    
    completeSynth = new window.Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 }
    }).toDestination();
  }
};

export const playCorrectSound = () => {
  correctSynth?.triggerAttackRelease('C5', '8n', window.Tone.now());
  correctSynth?.triggerAttackRelease('E5', '8n', window.Tone.now() + 0.1);
};

export const playIncorrectSound = () => {
  incorrectSynth?.triggerAttackRelease('G2', '8n', window.Tone.now());
};

export const playCompleteSound = () => {
  completeSynth?.triggerAttackRelease('C4', '8n', window.Tone.now());
  completeSynth?.triggerAttackRelease('E4', '8n', window.Tone.now() + 0.1);
  completeSynth?.triggerAttackRelease('G4', '8n', window.Tone.now() + 0.2);
  completeSynth?.triggerAttackRelease('C5', '8n', window.Tone.now() + 0.3);
};