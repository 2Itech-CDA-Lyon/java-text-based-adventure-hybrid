const apiFetcher = (uri: string) =>
  fetch(`http://localhost:8080/api${uri}`)
  .then( response => response.json() )

export default apiFetcher;
