import React from "react";
// import logo from '../../../images/emploi_et_stage/offres/logo.png';
// import iconAlert from '../../../images/emploi_et_stage/offres/alert.svg';
import loupe from "../../../images/emploi_et_stage/icon-loupe.svg";

// import iconIT from '../../../images/emploi_et_stage/offres/icon-IT.svg'

import { useEffect, useState } from "react";
// import DataJson from "../data/offres.json";
import axios from "axios";
import { useRef } from "react";
import Offer from "./Offer";
import Pagination from "./Pagination";

const OffresGaea21 = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const inputDep = useRef(null);
  const inputTitle = useRef(null);
  const inputExp = useRef(null);
  const inputLevel = useRef(null);
  const inputSelectFilter = useRef(null);
  const [schoolLevels, setSchoolLevels] = useState([]);
  const [experiences, setExperiences] = useState([]);

  //pagination
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(10);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  // const currentOffers = data.slice(indexOfFirstOffer, indexOfLastOffer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const loadBaseOffers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/apiTest/job_offres/filteredByPublishedDate");
      setData(data);
    } catch(e) {
      // console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBaseOffers();
  }, []);

  useEffect(() => {
    axios.get("/apiTest/departments").then((response) => {
      // console.log(response.data);
      setDepartments(response.data["hydra:member"]);
    });

    axios.get("/apiTest/school_levels").then((response) => {
      // console.log(response.data);
      setSchoolLevels(response.data["hydra:member"]);
    });

    axios.get("/apiTest/experiences").then((response) => {
      // console.log(response.data);
      setExperiences(response.data["hydra:member"]);
    });
  }, []);

  const handleOffersFilter = () => {
    if (inputSelectFilter.current.value === "date") {
        setData(
          [...data.sort((b, a) => 
                new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime()
          )]
        );
    }
    if (inputSelectFilter.current.value === "alphabet") {
        setData(
          [...data.sort((a, b) => a.title.localeCompare(b.title))]
        );
    }
    if (inputSelectFilter.current.value === "alphabetReverse") {
        setData(
          [...data.sort((a, b) => b.title.localeCompare(a.title))]
        );
    }
    if (inputSelectFilter.current.value === "schoolLevel") {
        setData(
          [...data.sort((a, b) =>
            a.schoolLevel.level.localeCompare(b.schoolLevel.level))]
          
        );
    }
    if (inputSelectFilter.current.value === "experience") {
        setData(
          [...data.sort((a, b) =>
            a.experience.experience.localeCompare(b.experience.experience)
          )]
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let carac={"title":inputTitle.current.value,
      "department.name":inputDep.current.value,
      "experience.experience":inputExp.current.value,
      "schoolLevel.level":inputLevel.current.value}
    let url=[]
    Object.entries(carac).map(([key, value]) =>
      {(value=="")? "": url.push(key+"="+value)}
    )
    url=url.join("&")
    let keep=[]
    
    axios.get(`/apiTest/job_offres?${url}`)
     .then((response) => {
      
      response.data['hydra:member'].map(element=>
        (element["isPublished"])  ? keep.push(element)
        :""
      )
      setData(keep)
        // console.log(data);
     })
     .catch(err => {
        // console.log(err)
     }) 
  }

  function resetValue() {
    loadBaseOffers();
  }

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                ref={inputTitle}
                type="text"
                name="title"
                placeholder="Métier recherché/Mot clé"
              />

              <select ref={inputDep} name="department.name" id="department">
                <option value="">Domaine d'activité</option>
                {departments.map((department) => (
                  <>
                    <option key={department?.id}>{department?.name}</option>
                  </>
                ))}
              </select>
              <select
                ref={inputExp}
                name="experience.experience"
                id="experience"
              >
                <option value="">Expérience</option>
                {experiences.map((yearsOfExperience) => (
                  <>
                    <option key={yearsOfExperience?.id}>
                      {yearsOfExperience?.experience}
                    </option>
                  </>
                ))}
              </select>
              <select ref={inputLevel} name="schoolLevel.level" id="level">
                <option value="">Niveau d'études</option>
                {schoolLevels.map((level) => (
                  <>
                    <option key={level?.id}>{level?.level}</option>
                  </>
                ))}
              </select>
            </div>
            {/* <button className="alert-button"> <img src={iconAlert} alt="alert"/> M'alerter sur les offres</button> */}
            <button className="search-button offre">
              Rechercher <img src={loupe} alt="loupe" />
            </button>
            <button type="reset" onClick={resetValue} className="reset-button">
              Effacer
            </button>
          </form>

          <select
            className="filter"
            name="filter"
            id="filter"
            ref={inputSelectFilter}
            onChange={handleOffersFilter}
          >
            <option value="">Trier par:</option>
            <option value="date">Date de publication</option>
            <option value="alphabet">A-z</option>
            <option value="alphabetReverse">Z-a</option>
            <option value="schoolLevel">Niveau d'études</option>
            <option value="experience">Expérience réquise</option>
          </select>
        </div>
      </section>

      <section className="offres-container">
        <h3>{data.length} offre(s) d'emploi trouvée(s)</h3>

        <Offer data={data} loading={loading} doc='offres' page='offre' />

        <Pagination
          offersPerPage={offersPerPage}
          totalOffers={data.length}
          paginate={paginate}
        />
      </section>
    </>
  );
};

export default OffresGaea21;
