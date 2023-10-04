import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";
import '../../../styles/OffreEmploi/offreEmploi.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../offreEmploi/components/DeleteModal';
import Pagination from './Pagination';
import BoutonPublish from './BoutonPublish';
import BoutonUnpublish from './BoutonUnpublish';
import logo from '../../../images/emploi_et_stage/offres/logo.png'
import { DownloadPDF } from '../../offreEmploi/pdfOffre/components/DownloadPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';


 const Dashboard = () => {


    const [allOffres, setAllOffres]=useState([]);
    const [offerDisplay, setOfferDisplay]=useState([]);
 
   
    const [searchInformation, setSearchInformation]=useState("");
    const [hideDeleteModal, setHideDeleteModal]= useState(false);
    const [offreId, setOffreId]=useState(0);


      //pagination
      const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const [offersPerPage] = useState(10);
  
     
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = allOffres.slice(indexOfFirstOffer, indexOfLastOffer);
  
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);




    useEffect(()=>{
        //GETTING ALL THE OFFERS
        axios.get('/api/job_offres/allOffers').then((response) => {
          // console.log(response.data);
            // setAllOffres(response.data['hydra:member']);
            // setOfferDisplay(response.data['hydra:member']);
            setAllOffres(response.data);
            setOfferDisplay(response.data);
            
            // console.log(response.data);
          });
          
        },[])

        //INCLUDE ALL THE OFFERS INSIDE THE DISPLAY
       useEffect(()=>{
           setOfferDisplay(allOffres);
          //  console.log(offerDisplay);
          //  console.log(allOffres);
        },[allOffres]) 

        //FUNCTION TO SEARCH THE OFFER ACCORDING TO WHAT THE USER TYPES
        const searchOffer =()=>{
          if(searchInformation !==""){
            const infoFound= allOffres.filter(e=>{
              return e.reference.toLowerCase().includes(searchInformation.toLowerCase())
            });
           
            setOfferDisplay(infoFound);
            
            // console.log(infoFound);
          }else{
            
            setOfferDisplay(allOffres);
            // console.log(offerDisplay);
          }
          
        } 

        //FUNCTION THAT IT IS GOING TO 
        useEffect(()=>{
          const timer = setTimeout(()=>{
           searchOffer();
           
          }, 500)

          return ()=>clearTimeout(timer);
        }, [searchInformation])

        const search = (e)=>{
          setSearchInformation(e.target.value);
          // console.log(searchInformation);
        }

        //FUNCTION TO HIDE THE DELETE MODAL

        const hide = (id) =>{
          if(hideDeleteModal){
            setHideDeleteModal(false);
          }else{
            setHideDeleteModal(true);
            setOffreId(id);
          }

         
        }
       
        const deleteOffre=()=>{
          // console.log(offreId);
          // console.log(allOffres);
          // console.log(offerDisplay);
          axios.delete(`/api/job_offres/${offreId}`).then((response) => {
           
            if(response.status===204){
              hide();
              location.reload();
            }
            
           
          });
        }

        const modify=(id)=>{
          // const loc = window.location;
          // const pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
          // const routeUrl= loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
         
          
          
          window.location.href = `/modificationoffre/${id}`;
        }

        const showPDF=(id)=>{
          
          
          window.open(`/offrepdf/${id}`,'_blank')
          //window.location.href = `/offrepdf/${id}`;
        }
        
  return (
    <div className='mx-5'>
    <img className='logo' src={logo} alt="" />
        <div className="input-group mb-3 w-25 mx-3">
             <div className="input-group-prepend">
            <span className="input-group-text fs-4 rounded-0 bg-transparent" ><FontAwesomeIcon icon={faSearch} /></span>
        </div>
            <input type="text" className="form-control border-start-0 rounded-0" placeholder="Rechercher par code de référence"  onChange={search}/>
        </div>

<table className="table table-striped">
  <thead className='thead'>
    <tr>
      {/* <th scope="col">ID</th> */}
      <th scope="col">Titre</th>
      <th scope="col">Département</th>
      <th scope="col">Code de référence</th>
      <th scope="col">Date de création</th>
      <th scope="col">Date de publication</th>
      <th scope="col">Etat de publication</th>
      <th scope="col" colSpan={2} className='text-center'>PDF</th>
      <th scope="col">Modifier</th>
      <th scope="col">Supprimer</th>
      
     
    </tr>
  </thead>
  <tbody>
  {
    searchInformation ==="" ?
    currentOffers.map(oneOffre=>(
                <tr key={oneOffre.id}>
              
                <td className='text-primary'>{oneOffre.title}</td>
                <td >{oneOffre.department.name}</td>
                <td >{oneOffre.reference}</td>
                
                <td>{new Date(oneOffre.createdAt).toLocaleDateString()}</td>
                <td>{oneOffre.isPublished == true ? new Date(oneOffre.publishedAt).toLocaleDateString():''}</td>
                <td>{oneOffre.isPublished == true  ? <BoutonUnpublish id={oneOffre.id}/>:<BoutonPublish id={oneOffre.id}/>}</td>
                
                <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => showPDF(oneOffre.id)}><FontAwesomeIcon icon={faFilePdf} /></button></td>
                {/* <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => showPDF(oneOffre.id)}><FontAwesomeIcon icon={faUpload } /></button></td> */}
                <td className='td-center'><button type='button' className='btn btn-link text-decoration-none'><DownloadPDF id={oneOffre.id} title={oneOffre.title} reference={oneOffre.reference}/></button></td>
                <td className='td-center'><button type='button' className='btn btn-link text-decoration-none' data-id = {oneOffre.id} onClick={() => modify(oneOffre.id)}><FontAwesomeIcon icon={faEdit}/></button></td>
                <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => hide(oneOffre.id)}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
          
                
               
              </tr>
            )) : 
            offerDisplay.map(oneOffre=>(
              <tr key={oneOffre.id}>
              {/* <th scope="row">{oneOffre.id}</th> */}
              <td className='text-primary'>{oneOffre.title}</td>
              <td >{oneOffre.department.name}</td>
              <td >{oneOffre.reference}</td>
              <td className='td-center'>{new Date(oneOffre.createdAt).toLocaleDateString()}</td>
              <td className='td-center'>{oneOffre.isPublished == true ? new Date(oneOffre.publishedAt).toLocaleDateString():''}</td>
              <td className='td-center'>{oneOffre.isPublished == true ? <BoutonUnpublish id={oneOffre.id}/>:<BoutonPublish id={oneOffre.id}/>}</td>
              {/* <td><FontAwesomeIcon icon={faUpload}/></td> */}
              <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => showPDF(oneOffre.id)}><FontAwesomeIcon icon={faFilePdf} /></button></td>
              {/* <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => showPDF(oneOffre.id)}><FontAwesomeIcon icon={faUpload } /></button></td> */}
              <td className='td-center'><button type='button' className='btn btn-link text-decoration-none'><DownloadPDF id={oneOffre.id} title={oneOffre.title} reference={oneOffre.reference}/></button></td>
              <td className='td-center'><button type='button' className='btn btn-link text-decoration-none' data-id = {oneOffre.id} onClick={() => modify(oneOffre.id)}><FontAwesomeIcon icon={faEdit}/></button></td>
              <td className='td-center'><button type='button' className='btn btn-link text-decoration-none text-danger' data-id = {oneOffre.id} onClick={() => hide(oneOffre.id)}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
              
             
            </tr>
          )) 
    }
  
    
  </tbody>
</table>

<Pagination offersPerPage={offersPerPage} totalOffers={allOffres.length} paginate={paginate}/>

{ hideDeleteModal && <DeleteModal
  hideModal = {hide}
  delete={deleteOffre}
/>}

    </div>
  )
}
export default Dashboard;