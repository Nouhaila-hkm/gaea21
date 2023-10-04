import React from 'react'

const Validation = () => {
  return (
    <>
    <div className='validation'>
      <img className='envelope' src='/Image/forgotPassword/forgotpop.png'></img>
      <div className='inscriptionvalidate'>
        <h2 className='reset'>Votre inscription a été validée avec succès !</h2>
        <p className='validationtext'>Découvrez l’univers gaea et complétez votre profil!</p>
      </div>
    </div>

    <div className='boxbutton'>
    <a className='button log' href='/login'>Se connecter</a>
    </div>
    </>
  )
}

export default Validation