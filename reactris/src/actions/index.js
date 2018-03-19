export const INCREMENT_FRAME_COUNT = 'INCREMENT_FRAME_COUNT';
export const RESET_FRAME_COUNT = 'RESET_FRAME_COUNT';
export const UPDATE_PLAYING_FIELD = 'UPDATE_PLAYING_FIELD';

export function incrementFrameCount(frameCount) {
  return {
    type: INCREMENT_FRAME_COUNT
  }
}

export function resetFrameCount(frameCount) {
  return {
    type: RESET_FRAME_COUNT,
    payload: { frameCount }
  }
}

export function updateField(field) {
  return {
    type: UPDATE_PLAYING_FIELD,
    payload: { field }
  }
}
