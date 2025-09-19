// src/redux/thunks/titleThunks.ts
import type { AppDispatch } from "../store";
import { setCountdown } from "../slices/titleSlice";

const COUNTDOWN_STORAGE_KEY = "countdownState";

// Save the countdown start time and total duration
export const saveCountdownToSessionStorage = (countdown: number) => () => {
  try {
    const stateToSave = {
      startTime: Date.now(), // Capture the exact moment the timer starts
      duration: countdown, // Total timer duration in seconds
    };
    sessionStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (e) {
    console.error("Could not save countdown to session storage", e);
  }
};

// Load and calculate remaining countdown time if user comes from other page during countdown time
export const loadCountdownFromSessionStorage =
  () => (dispatch: AppDispatch) => {
    try {
      const storedState = sessionStorage.getItem(COUNTDOWN_STORAGE_KEY);
      if (storedState) {
        const { startTime, duration } = JSON.parse(storedState);
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
        const remainingCountdown = Math.max(0, duration - timeElapsed);

        if (remainingCountdown > 0) {
          dispatch(setCountdown(remainingCountdown));
        } else {
          // Timer has expired, clean up
          sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY);
          dispatch(setCountdown(0));
        }
      }
    } catch (e) {
      console.error("Could not load countdown from session storage", e);
      sessionStorage.removeItem(COUNTDOWN_STORAGE_KEY);
      dispatch(setCountdown(0));
    }
  };
