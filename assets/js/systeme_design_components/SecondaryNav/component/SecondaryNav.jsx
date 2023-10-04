import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

import 'react-alice-carousel/lib/alice-carousel.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import AliceCarousel from 'react-alice-carousel';

import '../../../../styles/système_design_components/genericSecondaryNav/genericSecondaryNav.scss';
import arrow from '/assets/images/prev.png';


function SecondaryNav({ filename }) {
  const [navItems, setNavItems] = useState([]);
  const [itemContent, setItemContent] = useState([]);
  // var HTMLParser = require('node-html-parser');
  let elements = [];
  let newArray = [];


  const pathName = window.location.pathname.split('/');
  const lastParam = pathName[pathName.length - 1];
  const subParam = pathName[pathName.length - 2];

  console.log(filename);

  useEffect(() => {
    fetch(`/js/${filename}`) // Va chercher le fichier dans le dossier public
      .then((body) => {
        return body.json();
      })
      .then((response) => {
        setNavItems(response);
      });

    const currentPage = document.querySelectorAll(
      '.navigation-item_container .navigation-item p '
    );

    currentPage.forEach((el) => {
      if (el.getAttribute('data-id') === lastParam) {
        el.classList.add('current');
      }
      if (el.getAttribute('data-id') === subParam) {
        el.classList.add('current');
      }
    });
  }, []);

  useEffect(() => {
    navItems.map((el) => {
      elements.push(Object.values(el));
    });
    // console.log(elements);

    elements = elements.flat();

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      // console.log(element);
      element = ReactHtmlParser(element);
      // console.log(element);
      newArray.push(element);
    }

    setItemContent(newArray);
  }, [navItems]);

  return (
    <>
      {itemContent !== null ? (
        <div className="secondary-nav">
          <AliceCarousel autoWidth items={itemContent} />{' '}
          <div className="prev">
            <img src={arrow} alt="précédent"></img>
          </div>
          <div className="next">
            <img src={arrow} alt="suivant"></img>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default SecondaryNav;
