import { Audio } from "expo-av";
import pestAudioMap from "./audioUtils";

export const playPestSignal = (pestName) => {
  const audioPath = pestAudioMap[pestName];

  if (audioPath) {
    const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("Error loading sound:", error);
        return;
      }
      sound.play((success) => {
        if (!success) {
          console.error("Playback failed due to audio decoding errors.");
        }
        sound.release(); // Release memory after playback
      });
    });
  } else {
    console.error("Audio file not found for pest:", pestName);
  }
};
