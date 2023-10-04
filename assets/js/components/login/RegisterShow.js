import React, { useState } from 'react';
import HoverRegister from './HoverRegister';

export default function RegisterShow() {

  const [buttonOne, setButtonOne] = useState(false);
  const [buttonTwo, setButtonTwo] = useState(false);
  const [buttonThree, setButtonThree] = useState(false);
  const [buttonFour, setButtonFour] = useState(false);
  

  const individu =
  {
    items: [
      {
        title: "S'inscrire",
        link: '/register',
        class: 'imgbutton individu',

      },
    ],
  }

  const entreprise =
  {
    items: [
      {
        title: "S'inscrire",
        link: '/register',
        class: 'imgbutton entreprise',

      },
    ],
  }

  const administration =
  {
    items: [
      {
        title: "S'inscrire",
        link: '/register',
        class: 'imgbutton administration',

      },
    ],
  }

  const ecole =
  {
    items: [
      {
        title: "S'inscrire",
        link: '/register',
        class: 'imgbutton ecole',

      },
    ],
  }

  return (
    <>
    <p className='logintext'>Je crée un compte<br/>Choisissez votre catégorie:</p>
     <div className='bubble-row'>
        <div>
          { buttonOne 
            ? <img onMouseEnter={() => setButtonOne(!buttonOne)} class="bubble" src="/Image/login/individu-filter.png" />
            : <img onMouseEnter={() => setButtonOne(!buttonOne)} class="bubble" src="/Image/login/individu.png" />
          }          
          {buttonOne && <HoverRegister content={individu} />}
        </div>

        <div>
          { buttonTwo
            ? <img onMouseEnter={() => setButtonTwo(!buttonTwo)} class="bubble" src="/Image/login/entreprise-filter.png" />
            : <img onMouseEnter={() => setButtonTwo(!buttonTwo)} class="bubble" src="/Image/login/entreprise.png" />
          }          
          {buttonTwo && <HoverRegister content={entreprise} />}
        </div>

        <div>
          { buttonThree 
            ? <img onMouseEnter={() => setButtonThree(!buttonThree)} class="bubble" src="/Image/login/administrations-filter.png" />
            : <img onMouseEnter={() => setButtonThree(!buttonThree)} class="bubble" src="/Image/login/administrations.png" />
          }          
          {buttonThree && <HoverRegister content={administration} />}
        </div>

        <div>
          { buttonFour 
            ? <img onMouseEnter={() => setButtonFour(!buttonFour)} class="bubble" src="/Image/login/Ecoles-filter.png" />
            : <img onMouseEnter={() => setButtonFour(!buttonFour)} class="bubble" src="/Image/login/Ecoles.png" />
          }          
          {buttonFour && <HoverRegister content={ecole} />}
        </div>
    </div>
      </>
  )
}
