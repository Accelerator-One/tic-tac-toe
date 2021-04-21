import React, { useState, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Box component
function Box({ uid, markBox, turn }) {

  const myRef = useRef();
  const [state, setState] = useState(0);
  const style = { 'fontSize': '4em' };

  // returns box layout as per state
  function markup() {

    if (state === 1)
      return <RadioButtonUncheckedIcon style={style} />;
    if (state === 2)
      return <CloseIcon style={style} />;

    return "";
  }

  // click event handler for box
  async function handler() {

    // invalid move indicator
    if (state !== 0) {

      myRef.current.style.backgroundColor = 'red';

      await setTimeout(() => {
        myRef.current.style.backgroundColor = 'white';
      }, 1200);

      return;
    }

    // set new layout for box
    if (turn === true)
      setState(1);
    else
      setState(2);

    // pass update back to client
    markBox(uid);

  }

  return (
    <div ref={myRef} id={"box:" + uid} className='box' onClick={handler}>
      { markup()}
    </div>
  );
}

export default Box;