import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom/client";
import FilterDiv from "./FilterDiv";
import "/assets/styles/form/formData.scss";

export default function FormData() {
  const [formDataList, setFormDataList] = useState(null);
  const [formTypes, setFormTypes] = useState(null);
  const [filter, setFilter] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAPIFormList() {
      try {
        const response = await axios.post("/form/api/data/filter", {
          options: { formType: "-1", project: "-1", sort: "2", search: "" },
        });
        setFormDataList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getAPIFormTypes() {
      try {
        const response = await axios.get("/form/api/list");
        setFormTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getAPIProjectList() {
      try {
        const response = await axios.get("/form/api/project");
        setProjectList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    function filter() {
      setFilter({ formType: "-1", project: "-1", sort: "2", search: "" });
    }
    getAPIFormList();
    getAPIFormTypes();
    getAPIProjectList();
    filter();
  }, []);

  function filterData() {
    let filterOptions = getSelectFilters();
    filterOptions = getSearchFilter(filterOptions);
    postFilter(filterOptions);
  }

  async function postFilter(options) {
    setLoading(true);
    try {
      const res = await axios.post(`/form/api/data/filter`, {
        options: options,
      });
      setFormDataList(res.data);
      setFilter(options);
      setLoading(false);
    } catch (error) {
      console.error(error.response);
    }
  }

  function getSelectFilters() {
    const filterDIV = document.getElementById("filter");
    const filterSelect = filterDIV.getElementsByTagName("select");
    const filterOptions = {
      formType: "-1",
      project: "-1",
      sort: "2",
      search: "",
    };
    for (let i = 0; i < filterSelect.length; i++) {
      switch (i) {
        case 0:
          if (filterSelect[i].value != -1)
            filterOptions["formType"] = filterSelect[i].value;
          break;
        case 1:
          if (filterSelect[i].value != -1)
            filterOptions["project"] = filterSelect[i].value;
          break;
        case 2:
          if (filterSelect[i].value != 2)
            filterOptions["sort"] = filterSelect[i].value;
        default:
          break;
      }
    }
    return filterOptions;
  }

  function getSearchFilter(filterOptions) {
    const filterInput = document.getElementById("filter-search").value;
    if (filterInput.length != 0) {
      filterOptions["search"] = filterInput;
    }
    return filterOptions;
  }

  if (!formDataList || !formTypes || !projectList || loading) {
    return (
      <div className="row text-center pt-5 gaea-full-height">
        <Spinner
          className="m-auto"
          animation="border"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <FilterDiv
        filterData={filterData}
        formTypes={formTypes}
        formDataList={formDataList}
        projectList={projectList}
        filter={filter}
      />
      {formDataList == 0 ? (
        <p>Pas de résultat trouvé</p>
      ) : (
        <div className="container mt-3 form-data">
          {formDataList.map((data, index) => (
            <div className="form" key={index}>
              <div className="row">
                <h3 className="py-3">
                  {data.form.formName} -&nbsp;
                  {data.linkedProject ? data.linkedProject.projectName : <></>}
                  <span className="float-end text-size-normal">
                    {data.cleanDate}
                  </span>
                </h3>
              </div>
              <div className="response my-3 pt-3 px-4">
                <ResponseData data={data.mappedFormData} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ResponseData({ data }) {
  return (
    <>
      {data.map((info, index) => (
        <div className="row" key={index}>
          <p className="col-4">{info.field.label}</p>
          <p className="col-8">{info.answer}</p>
        </div>
      ))}
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("FormDatas"));
root.render(<FormData />);
