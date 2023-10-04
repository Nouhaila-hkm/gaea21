import React, { useEffect, useState } from 'react';

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../images/chevron-droit.png';
import actif from '../../../../images/active-arrow.png';

// IMPORT CSS
import '../../../../styles/système_design_components/VignetteSmall/smallCard.scss';

const SmallCard = ({ title, source, activecard, link }) => {
  const [active, setActive] = useState(true);

  const [smallCard, setSmallCard] = useState(null);
  const [activeSmallCard, setActiveSmallCard] = useState(null);
  const [activeCardBtn, setActiveCardBtn] = useState(null);
  const [activeCardImg, setActiveCardImg] = useState(null);

  let lienDeBase;

  const lienPage = window.location.pathname;
  if (window.location.pathname !== link) {
    lienDeBase = window.location.pathname.split('/');
    lienDeBase.pop();
    lienDeBase = lienDeBase.join('/');
  }

  function addHover(e) {
    const currentCard = e.currentTarget;

    const overlay = currentCard.querySelector(
      '.smallCard ._small-card ._overlay'
    );
    overlay.style.height = '100%';
  }

  function removeHover(e) {
    const currentCard = e.currentTarget;
    const overlay = currentCard.querySelector(
      '.smallCard ._small-card ._overlay'
    );
    overlay.style.height = '72.5%';
  }

  useEffect(() => {
    setSmallCard(document.querySelectorAll('.smallCard'));

    if (activecard === 'false') {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (smallCard !== null) {
      smallCard.forEach((smallCard) => {
        smallCard.addEventListener('mouseover', addHover);
        smallCard.addEventListener('mouseout', removeHover);

        if (
          smallCard.getAttribute('data-link') === lienPage ||
          smallCard.getAttribute('data-link') === lienDeBase
        ) {
          setActiveSmallCard(smallCard);
        }
      });
    }
  }, [smallCard]);

  useEffect(() => {
    if (activeSmallCard !== null) {
      setActiveCardBtn(activeSmallCard.childNodes[0].childNodes[1]);
      console.log(activeSmallCard);
      activeSmallCard.addEventListener('mouseover', removeHover);

      setActiveCardImg(
        activeSmallCard.childNodes[0].childNodes[0].childNodes[0]
      );
    }
  }, [activeSmallCard]);

  useEffect(() => {
    if (activeCardBtn !== null) {
      const activeSmallCardOverlay =
        activeSmallCard.childNodes[0].childNodes[0];

      activeSmallCardOverlay.classList.add('active-card');
      activeCardBtn.style.display = 'none';
      activeCardImg.style.display = 'block';
    }
  }, [activeCardBtn]);

  // AFFICHAGE CONDITIONNELLE
  return (
    <>
      {active ? (
        <div className="_small-card">
          <div className="_overlay">
            <img className="active-arrow" src={actif} />
            <div className="_card-header">
              <h2>{title}</h2>
            </div>
          </div>
          <a href={link} className="_large-btn-small-card">
            Découvrir
            <img className="chevron-btn" src={chevron} />
          </a>
          <img className="_img" src={source} alt="Lorem" />
        </div>
      ) : (
        <div className="_small-card">
          <div className="_disabled-small-card "></div>
          <img className="_img" src={source} alt="Lorem" />
        </div>
      )}
    </>
  );
};

export default SmallCard;
