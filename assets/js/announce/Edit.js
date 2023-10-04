import '../../styles/user/form.scss';
import '../../styles/topbar.scss';
import '../../styles/user/announce.scss';
import '../../styles/user/announcePdf.scss';
import Main from './Main';

import React from 'react';
import ReactDOM from 'react-dom';

const editAnnounceContainer = document.getElementById('editAnnounceTemplate');
const collaboratorsData = editAnnounceContainer.dataset.collaborators;
const sectionsData = editAnnounceContainer.dataset.sections;
const titleData = editAnnounceContainer.dataset.title;
const announceId = editAnnounceContainer.dataset.announceId;

console.log(collaboratorsData);
console.log(sectionsData);

ReactDOM.render(<Main announceId={announceId} titleData={titleData} collaboratorsData={collaboratorsData} sectionsData={sectionsData} />, editAnnounceContainer);