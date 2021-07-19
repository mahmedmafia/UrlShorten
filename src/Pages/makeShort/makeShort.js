import React, { useState, useRef } from "react";
import {Link,useRouteMatch} from 'react-router-dom';
import classes from './makeShort.module.css'
export default function MakeShortPage() {
  const [shortUrl,setShortUrl]=useState(null)
  const inputRef = useRef();
  let match = useRouteMatch();
  const submitHandler = (e) => {
    console.log(match, window.location.href);
    e.preventDefault();
    const url = inputRef.current.value;
    fetch("/shortlinks", { method: "POST", body: JSON.stringify({ url }) })
      .then((res) => res.json())
      
      .then((data) => setShortUrl(data.url.slug))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.formContainer}>
      <form onSubmit={submitHandler} className={classes.form} >
        <div className={classes.formGroup}>
          <label htmlFor="url">Enter Url</label>
          <input type="url" name="url" required ref={inputRef} className={classes.formControl}></input>
        </div>
        <input type="submit" value="get Shorten" className={classes.formButton}></input>
      </form>
      {shortUrl && <Link to={'/'+shortUrl} className={classes.shortUrl}>{shortUrl}</Link>}
    </div>
  );
}
