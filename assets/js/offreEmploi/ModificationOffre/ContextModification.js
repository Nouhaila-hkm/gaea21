import React, {createContext, useState} from 'react';


export const OfferEdit = createContext({
    offre:{}, 
    
    addObject:()=>{},
    addNewSection:()=>{},
   

    
});

export default function Editer({children}){
    const [offerEdit, setOfferEdit]= useState({
        offre:{
            title:"",
            reference:"",
            department:"",
            diploma:"",
            schoolLevel:"",
            experience:"",
            jobType:"",
            isPublished:false,
            offerSection:[]
        },
        addObject:(object)=>{
            setOfferEdit((state)=>{
                return {...state, offre:object}
            })
        },
        addNewSection:(section)=>{
            setOfferEdit((state)=>{
                const copy = {...state.offre}
                copy.offerSection.push(section)
                return {...state, offre:copy}
            })
        },
        
        
        
       
    });

    return(
        <OfferEdit.Provider value={offerEdit}>
            {children}

        </OfferEdit.Provider>
    )
}