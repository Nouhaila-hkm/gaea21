import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import HiddenSection from "./HiddenSection";
import Response from "./Response";
import Section from "./Section";
import "/assets/styles/form/formBuild.scss";

//TODO Refactor Function and Children
export default function Form() {
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  const formID = document.querySelector("#showForm").dataset.id;
  const formTitle = document.querySelector("#showForm").dataset.title;
  const [formulaire, setformulaire] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    register,
    getFieldState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    async function getAPIForm() {
      try {
        const res = await axios.post(`/form/api/info/`, { id: formID });
        setformulaire(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response);
      }
    }
    getAPIForm();
  }, []);

  function showSection(section, index) {
    if (section.section.is_active)
      return (
        <Section
          section={section}
          key={index}
          register={register}
          state={errors}
          fieldState={getFieldState}
        />
      );
    else {
      return <HiddenSection section={section} register={register} />;
    }
  }

  const onSubmit = async (submitData) => {
    if (confirm("Confirmer la soumission ?")) {
      setLoading(true);
      const res = await axios.post("/form/reader/readForm", {
        data: submitData,
        formID: formulaire.id,
      });
      setFormData(res.data);
      setLoading(false);
    }
  };

  if (formulaire == null) return <Loading />;

  if (formData != null)
    return (
      <>
        <div className="row text-center">
          {formulaire.show_label ? (
            <div className="formulaireHeader mt-4">{formTitle}</div>
          ) : (
            <></>
          )}
          {formulaire.show_description ? (
            <pre>
              <div className="formulaireDescription mt-3">
                {formulaire.description}
              </div>
            </pre>
          ) : (
            <></>
          )}
        </div>
        <div className="col-10 m-auto positiveForm">
          <Response formData={formData} />
        </div>
      </>
    );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row text-center">
            {formulaire.show_label ? (
              <div className="formulaireHeader mt-4">{formTitle}</div>
            ) : (
              <></>
            )}
            {formulaire.show_description ? (
              <pre>
                <div className="formulaireDescription mt-3">
                  {formulaire.description}
                </div>
              </pre>
            ) : (
              <></>
            )}
          </div>
          <form
            className="col-10 m-auto"
            id="mainForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formulaire.mappedSections.map((section, index) =>
              showSection(section, index)
            )}

            <div className="row mt-5">
              <div className="col-3 m-auto">
                <Button type="submit">Envoyer</Button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
