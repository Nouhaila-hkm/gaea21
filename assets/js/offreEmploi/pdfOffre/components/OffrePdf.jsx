import React, {useEffect, useState} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from "axios";

const OffrePdf = (props) => {

    const [offre, setOffre]=useState([]);

    useEffect(()=>{
        let offreId;
        if(props.id){
          offreId=props.id
        }else{
          const url = window.location.href;
          offreId= parseInt(url.slice(url.lastIndexOf('/')+1), 10);
        }
        
   
        
        axios.get(`/api/job_offres/${offreId}`).then((response) => {
      
            setOffre(response.data);
           
            console.log(response.data);
            
           
            
          });
    
        
        
          },[]);
  return (
    <Document>
    <Page size="A4">
      <View>
        <Text>Titre</Text>
        {offre.title && <Text>{offre.title}</Text>}
      </View>
      <View>
        <Text>Code de référence</Text>
        {offre.reference && <Text>{offre.reference}</Text>}
      </View>
      <View>
        <Text>Département</Text>
        {offre.department && <Text>{offre.department.name}</Text>}
      </View>
      <View>
        <Text>Niveau d'études</Text>
        {offre.schoolLevel && <Text>{offre.schoolLevel.level}</Text>}
      </View>
      <View>
        <Text>Expérience</Text>
        {offre.experience && <Text>{offre.experience.experience}</Text>}
      </View>
      <View>
        <Text>Modalité de travail</Text>
        {offre.jobType && <Text>{offre.jobType.name}</Text>}
      </View>

      { offre.offerSection &&
        offre.offerSection.map(section=>{
          
          return (
            <View key={section.id}>
                <Text>{section.offerSectionTitle.title}</Text>
                {section.contentSections.map(content=>{
                  if(content.description !==""){
                    return(
                      <View key={content.contentOrder}>
                        <Text>{content.description}</Text>
                      </View>
                    )
                  }else{
                    let allLists="";
                    content.listItems.map(item=>{
                      allLists=  allLists + `${item.description}\n\n`
                     
                      // return(
                      //   <View key={item.listItemOrder}>
                      //     <Text>{item.description}</Text>
                      //   </View>
                      // )
                    })
                     return(
                         <View key={content.contentOrder}>
                          <Text>{allLists}</Text>
                       </View>
                      )
                    
                    console.log(allLists)

                  }
              
            })}
            </View>
           

          )
        })
      }






    </Page>
  </Document>
  )
}

export default OffrePdf;