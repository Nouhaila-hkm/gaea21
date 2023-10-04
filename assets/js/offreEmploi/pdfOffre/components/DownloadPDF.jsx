import React from 'react';
import OffrePdf from './OffrePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DownloadPDF = (props) => {
  return (
    <div>
    <PDFDownloadLink document={<OffrePdf id={props.id} />} fileName={`${props.title}_${props.reference}.pdf`}>
      {({  loading }) =>
        (loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faFileArrowDown} />)
      }
    </PDFDownloadLink>
    
  </div>
  )
}
