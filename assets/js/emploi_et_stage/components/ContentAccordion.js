import React, {useState} from 'react'

const ContentAccordion = (section) => {

    //   const [isActive, setIsActive] = useState(false);


  return (
    <>

    
    {<div className="accordion-content">
    {section?.contentSections?.map((contentSection) => (
        <div><p className='text'>{contentSection.description}</p>
        {contentSection.listItems.map((listItem) => (
          <p><img src={bulletpoint} alt="" />{listItem.description}</p>
        ))}
        </div>
       
    ))}
        
        </div>}
        </>
  )
}

export default ContentAccordion