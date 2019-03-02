
export const pageActionTypes = {
  ADD_TAIL: '[Tail] add tail in flight',
}

export function addTail(tail, flightId) {
  return {
    type: pageActionTypes.ADD_TAIL,
    payload: { tail, flightId },
  };
}
