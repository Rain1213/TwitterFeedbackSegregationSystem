import React from "react";
import './Card.css';

export default function Card({item, bgImg}) {
    return (
      <div className="card">
        <img src={bgImg} className="card-img" alt="card-img"></img>
        <img src={item.Imgurl} className="profile-img" alt="profile-img"></img>
        <h1>{item.Name}</h1>
        <p className="role">{item.Role}</p>
        <p className="about">{item.About}</p>
        {/* <a href={item.Giturl} className="btn">contact</a> */}
        <ul className="social-media">
          {/* <li><a href=""><i class="fab fa-twitter-square"></i></a></li> */}
          <li>
            <a href={item.Giturl} target="_blank" rel="noreferrer">
              <i className="fab fa-github-square"></i>
            </a>
          </li>
          <li>
            <a href={item.LinkedInurl} target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    );
}
