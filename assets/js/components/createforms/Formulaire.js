import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionForm from "./SectionForm";

export default function Formulaire() {

        let { id } = useParams();
        const [formulaire, setFormulaire] = useState([]);
        const [mappedSections, setMappedSections] = useState([]);


        useEffect(() => {
                axios
                .get(`/api/formulaire/21`)
                //.get(`https://localhost:8000/api/formulaire/${ id }`)
                .then((resp) => {
                setFormulaire(resp.data);
                setMappedSections(resp.data.mappedSections);
                });
         }, []);

        return( <>
                { mappedSections.map((mappedSection, index) =>
                        <SectionForm key={ index } section={ mappedSection.section } formulaire={ formulaire } onChange={handleChange}/>
                )}
        </>
        )
}
