import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import classes from './urlsList.module.css';
export default function UrlsList() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetch('/shortlinks', { method: 'GET' }).then(res => res.json()).then(data => setUrls(data)).catch(err => console.log(err));;
  }, [])
  let urlsList;
  if (urls != null) {
    
    urlsList = urls.map(url => {
      return(
      <tr key={url.id}>
        <td>{url.slug}</td>
        <td>{url.original_url}</td>
        <td><Link to={'/' + url.slug}>{window.location.hostname}/{url.slug}</Link></td>
      </tr>
      )
    })
  }


  return (
    <div>
      {urls &&
        <table>
          <thead>
            <tr>
              <th>slug</th>
              <th>original_url</th>
              <th>short Link</th>
            </tr>
          </thead>
        <tbody>
          {urlsList}
          {urls.length==0&&<td className={classes.spanned}  colSpan="3" rowSpan="3">No ShortLinks Found</td>}
          </tbody>
        </table>
      }
    </div>
  )
}

