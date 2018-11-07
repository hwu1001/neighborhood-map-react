  /**
  * @description Fetches venues from Foursquare API
  * @param {string} apiUrl - URL string used to fetch data from API
  * @returns {Promise} - On success returns an object with venue data, on failure the error message
  */
export function fetchVenues(apiUrl) {
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then(response => {
        response.json()
          .then(json => {
            resolve(json.response.venues);
          })
      })
      .catch(error => {
          reject(error);
      })
  });
}

// Some code for the image API, currently not in use because only one picture per venue per day is allowed
// let imgApiUrl = `https://api.foursquare.com/v2/venues/${venue.id}/photos?client_id=U1E3HY25OEO1J3WQFC4QZBA4NZNR44W1ELUPUJOC34DISYQI&client_secret=C4ADDKI4L2RP0AHEBV3YZNAXCGWOY4QYTBJTQQ4Y2EPFARLY&v=20180323`
// fetch(imgApiUrl)
//   .then(res => {
//     res.json()
//       .then(imgJson => {
//         // Loop over the images until a suitable one is found, then stop (we're only using one picture for now)
//         if (Object.keys(imgJson.response).length > 0) {
//           let found = false;
//           for (const imgData of imgJson.response.photos.items) {
//             if (imgData && imgData.prefix && imgData.suffix) {
//               imgDataCopy[venue.id] = imgData;
//               found = true;
//               break;
//             }
//           }
//           if (!found) {
//             imgDataCopy[venue.id] = 'https://via.placeholder.com/300x300';                          
//           }
//         }

//       });
//   })
//   .catch(error => {
//     console.log(error);
//   });