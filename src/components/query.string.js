export default function queryString (){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let  q = urlParams.get("q");
  if(q === null || q === undefined){
    return q = 1
  }
  return q
}
