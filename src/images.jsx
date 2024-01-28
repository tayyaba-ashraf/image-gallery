/**axios is javascript library that is used to interact with API to
 * hit API endpoints using HTTP protocols.
 * We will send HTTP requests to jsonplaceholder API
 */
import axios from "axios";

/** Axios instance named as post*/
const imageInstance = axios.create();

// Function to show loader
const showLoader = () => {
 document.getElementById('loader').style.display = 'block';
};
              
// Function to hide loader
const hideLoader = () => {
 document.getElementById('loader').style.display = 'none';
};


/**Interceptors can be used for  modifying requests before they are sent to API
 *  or responses before they are handled by your code. */

/**modifying request before sending to API */
imageInstance.interceptors.request.use(
  (config) => 
  {
     showLoader(); // Show loader before request sent
     /**Check if the 'Authorization' and 'Content-Type' header exist in the request headers*/
     if (config.headers['Authorization'] && config.headers['Content-Type'])
      {
     /** * If the 'Authorization' and 'Content-Type' headers are present, set the 'authorizationHeader' and 
      * contentTypeHeader key to true*/
       config.headers['authorizationHeader'] = 'true';
       console.log('authorizationHeader key',config.headers['authorizationHeader']);
       config.headers['contentTypeHeader'] = 'true';
      }

      /* Regardless of the header's presence, always set the 'header' key to true*/
      config.headers['header'] = 'true';
      console.log('header key ',config.headers['header']);
      

      return config;
   },

  (error) => {
     // Handle request errors
     hideLoader(); // Hide loader on request error
     return Promise.reject(error);
    }
);

/**modifying request after getting response from API */
imageInstance.interceptors.response.use(
 (response) => {
      hideLoader(); // Hide loader when response is received
      return response;
     },
 (error) => {
      hideLoader(); // Hide loader on response error
      return Promise.reject(error);
     }
);

/**GET request using the postInstance of axios*/
export const fetchImages = () => {
   /**We will send headers along with our request that is actually meta data(additional information) about our request
    * so we will send headers Content-Type & Authorization
    */
   return imageInstance.get('https://api.unsplash.com/search/photos?page=1&query=office&client_id=6IKfMRLMKUke_a_nuqlEfDtN3DQ-lNq-rT8Mz5lw4qc',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer vxbasx?/~~9(sajhx677!@>>jk788ZOP90>:"/'

      }
      });
                           
};
export default imageInstance;          