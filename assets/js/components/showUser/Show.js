import React from 'react'

export default function Show() {

  $(() => {
    $('span').click(function () {
      $('span').removeClass('select')

      $(this).addClass('select')
    })
  })

  const handleClick = (hidden) => {

    const updateAccount = document.getElementById('updateAccountForm');
    const changePassword = document.getElementById('updatePasswordForm');

    if (hidden) {
      updateAccount.setAttribute("class", 'form');
      changePassword.setAttribute("class", 'form hidden');
    }
    else {
      updateAccount.setAttribute("class", 'form hidden');
      changePassword.setAttribute("class", 'form');
    }
  }
  return (
    <>
      <li><span className='select' onClick={() => handleClick(true)}>Modifier le compte</span></li>
      <li><span onClick={() => handleClick(false)}>Modifier le mot de passe</span></li>
    </>
  )
}
