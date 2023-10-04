import React, {createContext, useState} from 'react';


export const OfferContext = createContext({
    offre:{}, 
    addSection:false,
    changeAddSection:()=>{},
    addProperty:()=>{},
    addOneSection:()=>{},
    updateSection:()=>{},
    deleteSection:()=>{},
    makeSectionCopy:()=>{},
    section:[]
});

export default function Information({children}){
    const [offerInfo, setOfferInfo]= useState({
        offre:{
            title:"",
            reference:"",
            diploma:"",
            isPublished:false,
            schoolLevel:"",
            experience:"",
            jobType:"",
            createdAt:new Date(),
            //publishedAt:"",
            department:"",
            //updatedAt:"",
            offerSection:[]
        },
        addProperty:(property, value)=>{
            setOfferInfo((state)=>{
                //make a copy of old object
                const oldObject = {...state.offre}
                //adding the new property or editing the existing one
                oldObject[property]=value;
                //updating the property
                return {...state, offre:oldObject}
            })
        },
        addSection:false,
        changeAddSection:()=>{
            setOfferInfo((state)=>{
                if(state.addSection===false){
                    return {...state, addSection:true}
                }else{
                    return {...state, addSection:false}
                }
               
            })
        },

        addOneSection:(section)=>{
            setOfferInfo((state)=>{
                const copyOffer = {...state.offre};
                copyOffer.offerSection.push(section);
                return{...state, offre:copyOffer}
            })
        },

        updateSection:(order, content, title)=>{
           
            setOfferInfo((state)=>{
                const copy = {...state.offre};
             
                const indexSection = copy.offerSection.findIndex(e=>{
                    return e.sectionOrder === order
                })
                
                copy.offerSection[indexSection].contentSections = content;
                copy.offerSection[indexSection].offerSectionTitle = title;
                // console.log(copy.offerSection[indexSection].contentSections);
                return{...state, offre:copy};
            })
          
        },
        deleteSection:(order)=>{
           
            setOfferInfo((state)=>{
                // console.log(order);
                const copy = {...state.offre};
                const indexSection = copy.offerSection.findIndex(e=>{
                    return e.sectionOrder === order
                })

                copy.offerSection.splice(indexSection, 1)
                return{...state, offre:copy};

            })
        },section:[],
        makeSectionCopy:(copySection)=>{
            setOfferInfo((state)=>{
                return {...state, section:copySection}
            })
        }
    });

    return(
        <OfferContext.Provider value={offerInfo}>
            {children}

        </OfferContext.Provider>
    )
}