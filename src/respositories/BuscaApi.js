/**
 * Checks if the response is ok
 * @param {*} res response from the query
 */
function isOk(res) {
    if (res.ok) {
      return res;
    }
    throw new Error(`Something went wrong: ${res.statusText}`);
  }

/**
 * Fetches data from the API
 * @param {*} urlConfig URL
 */
function GetApi(urlConfig) {
    return fetch(urlConfig)
        .then(async (resposta) => {
        if (isOk(resposta)) {
            return resposta;
        }
        throw new Error('Something went wrong');
        })
        .then((res) => res.json());
}
  
export default GetApi