import clippy from 'clippyjs';

import * as actions from 'src/actions';

import './clippy.css'

let shown = false;
function clippyStuff(agent, action) {
  if (action.type === actions.fetchSearchResults.START && !shown) {
    agent.show();
    shown = true;
  }
  if (action.type === actions.fetchNextSearchResults.COMPLETE) {
    const { nextResult } = action.payload;

    if (nextResult.page === 5) {
      window.setTimeout(() => agent.speak('Still I wonder, why do we have so much data?'));
    }
  }
}

const clippyMiddleware = store => {
  let agent;

  try {
    clippy.load(
      'Clippy',
      _agent => { agent = _agent; },
      undefined,
      `${process.env.PUBLIC_URL}/clippy/agents/`
    );
  } catch (err) {
    // no clippy for us, bummer.
  }

  return next => action => {
    const newState = next(action);

    try {
      if (agent) {
        clippyStuff(agent, action)
      }
    } catch (err) {
      // no tricks today, bummer.
    }

    return newState;
  };
};

export default clippyMiddleware;
