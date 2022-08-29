import Paypal from './paypal'
import React, { useState } from 'react';

function Checkout() {

  const [checkout, setCheckOut ] = useState(false);

  return (
    <div>
      

  

      {checkout ? (<Paypal />) : (
<button onClick={() => { setCheckOut(true);}}> Checkout
</button>
)} 


    </div>
  );
}

export default Checkout;
