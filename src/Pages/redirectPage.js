import React, { useEffect,useState } from "react";
import { useRouteMatch, useParams, Redirect,Link } from "react-router-dom";

export default function RedirectPage() {
  const slug = useParams().slug;
  let match = useRouteMatch();
  const [redirectedLink,setRedirectedLink]=useState()
  useEffect(() => {
    fetch("/shortlinks/" + slug)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.statusText;
        }
      })
      .then((data) =>{
          const redirectUrl=data.url.original_url;
          setRedirectedLink(redirectUrl)
        window.location.replace(redirectUrl)
    } )
      .catch((err) => console.log(err));
  }, []);
  return <>
     {redirectedLink && <h1>Redirecting</h1>}
  </>;
}
