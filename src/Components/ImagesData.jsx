import React, { useEffect, useState } from 'react';
import { fetchImages } from '../images';

const ImagesData=()=> {
  
    const [imageData, setImageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);     //current page intialized with 1
    const [imagesPerPage,setImagesPerPage] = useState(5);  //number of images per page will be 5
   
    const [filteredImagesG,setFilteredImagesG]=useState([]);

    

    const handleFetchData = (e) => {
      e.preventDefault();
      /**Images data will be fetched on calling fetchImages.it will return a promise
       * on resolved promise return response is obtained from API and we we will use results property
       * in which is our array of images data
       */
      fetchImages()
          .then((response) => {
            /**isArray() is boolean check for array */
              if (response && response.data.results && Array.isArray(response.data.results)) {
                  console.log("images data",response.data.results);
                  setImageData(response.data.results);
              } else {
                  console.error('Invalid or empty data received:', response);
              }
          })
          .catch((error) => {
              console.error('Request Error:', error);
          });
  };

  /** useEffect will work for pagination based on states (currentPage, imagesPerPage, imageData) changings */
  useEffect(() => {
  
    // Calculate the indices and filtered images here for pagination
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;

    // Logic to display filtered images based on the filterId
    const filteredImages = imageData.slice(indexOfFirstImage, indexOfLastImage);

    // You can use filteredImages as needed, e.g., set it to another state variable
    setFilteredImagesG(filteredImages);
    console.log("Filtered images", filteredImages)
  }, [currentPage, imagesPerPage, imageData]);


   
   /* this event handler will handle  page number changing*/
   /**whenever handlePaginate will be called,currentPage state will change and resultantly 
    * component will be re-rendered,ultimately filteredImagesG on that page will be shown
    */
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    

  };

  /** handleFilter will filter out imageData array(state)*/

  const handleFilter = (filteredImage) => {
    
  
    // We will filter images using filteredImage  criteria , based on the button clicked
    switch (filteredImage) {
      case "brown-wooden-table":
        setFilteredImagesG(imageData.filter((image) => image.slug.includes(filteredImage)));
        break;
      case "black-floor-lamp || white-desk-lamp":
        setFilteredImagesG(imageData.filter((image) => image.slug.includes("black-floor-lamp") || image.slug.includes("white-desk-lamp")));
        break;
      case "people-sitting-on-chair":
        setFilteredImagesG(imageData.filter((image) => image.slug.includes(filteredImage)));
        break;
      case "black-and-brown-chairs || photo-of-dining-table-and-chairs":
        setFilteredImagesG(imageData.filter((image) => image.slug.includes("black-and-brown-chairs") || image.slug.includes("photo-of-dining-table-and-chairs")));
        break;
      case "macbook-pro-dIMJWLx1YbE || man-standing-in-front-of-people":
        setFilteredImagesG(imageData.filter((image) => image.slug.includes("macbook-pro-dIMJWLx1YbE") || image.slug.includes("man-standing-in-front-of-people")));
        break;
      
  
    }
  };
  

  return (
    <>


     <div className="container">
             <button className='btn btn-secondary' onClick={handleFetchData}>Fetch Data</button>

             <div className="grid-container">
               {/* map will ierate filteredImagesG array which we have stored in filteredImagesG state  */}
               {filteredImagesG.map((image, index) => (
                  <div key={index} className="grid-item">
                   <img src={image.urls.small} alt={`Image ${index}`} />
                 </div>
               ))}
             </div>

            {/* Pagination */}
           <ul className="pagination">

              {/*  Math.ceil will calculate total number of pages required to for total images and will
              store in length property*/}
              {/* ceil will round off if exact total pages are not calculated */}
              {/* Array.from({length}) will generate an undefined array of elements along with indexes
              of size length*/}
              {/* on that array map will iterate and use indexes to perform operation */}
                 {Array.from({ length: Math.ceil(imageData.length / imagesPerPage) }).map((_, index) => (
                 <li key={index} className="page-item">
                   <button onClick={() => handlePaginate(index + 1)} className="page-link"> {index + 1} </button>
                 </li>
                ))}
             </ul>
              
          

                {/* Add filtering buttons */}
                <div className="filter-buttons">
                  
                <button onClick={() => handleFilter("brown-wooden-table")} className="btn btn-1">
                 Filter {"brown-wooden-table"}
               </button>
               <button onClick={() => handleFilter("black-floor-lamp || white-desk-lamp")} className="btn btn-2">
                 Filter {"black-floor-lamp || white-desk-lamp"}
               </button>
               <button onClick={() => handleFilter("people-sitting-on-chair")} className="btn btn-3">
                 Filter {"people-sitting-on-chair"}
               </button>
               <button onClick={() => handleFilter("black-and-brown-chairs || photo-of-dining-table-and-chairs")} className="btn btn-4">
                 Filter {"black-and-brown-chairs || photo-of-dining-table-and-chairs"}
               </button>
               <button onClick={() => handleFilter("macbook-pro-dIMJWLx1YbE || man-standing-in-front-of-people")} className="btn btn-5">
                 Filter {"macbook-pro-dIMJWLx1YbE || man-standing-in-front-of-people"}
               </button>
                  
               </div>

       </div>
       {/* each time when paginate will be called in response to onClick,
       index obtained from map argument ,will be pass on to paginate ,inside that setCurrentPage
       will change CurrentPage state and then component will re render and then map will iterate currentImages  */}


    </>
  )
}

export default ImagesData;
