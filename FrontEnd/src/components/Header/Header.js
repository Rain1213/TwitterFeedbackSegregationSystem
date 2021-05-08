import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false }
    
    this["navLinks"] = React.createRef();
    this.refers = {};

    this.openMenu = this.openMenu.bind(this);

    this.props.menus.forEach((menu) => {
      this["refers"][menu.text] = React.createRef();
    });
  }

  openMenu(event) {
    this.setState({ clicked: !this.state.clicked})
    event.stopPropagation();
    this["navLinks"].current.classList.toggle("nav-links-active");
    for (const ref in this.refers) {
      if (this.refers.hasOwnProperty(ref)) {
        const element = this["refers"][ref];
        element.current.classList.toggle("li-fade");
      }
    }
  }

  render() {
    let activeElement;
    const liElements = this.props.menus.map((menu, index) => {
        if (window.location.pathname.slice(1) === menu.link || (window.location.pathname === '/' && index === 0)) {
        activeElement = menu.text;
        return (
          <li
            className={"active"}
            ref={this["refers"][menu.text]}
            id={menu.text}
            key={menu.text}
            // onClick={this.handleOnClickLi}
          >
            <Link to={menu.link} className="list-style">
              {/* <img className={"menu-img"} src={menu.img} alt={menu.alt}></img> */}
              <span className={"menu-text"}>{menu.text}</span>
            </Link>
          </li>
        );
      } else {
        return (
          <li
            ref={this["refers"][menu.text]}
            id={menu.text}
            key={menu.text}
            // onClick={this.handleOnClickLi}
          >
            <Link to={menu.link} className="list-style">
              {/* <img className={"menu-img"} src={menu.img} alt={menu.alt}></img> */}
              <span className={"menu-text"}>{menu.text}</span>
            </Link>
          </li>
        );
      }
    });
    this.activeMenu = this.refers[activeElement];

    return (
      <>
        <header>
          <svg
            className="bg-svg"
            viewBox="0 0 1920 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1931 98.3043C1054.5 250.5 909.714 12.3115 664 115.5C375.982 236.454 16.0398 197.67 -9.75102 100.709C-35.5418 3.7478 42.8948 -118.036 187.5 -156.5C332.105 -194.964 2098.12 -259.11 1931 98.3043Z"
              fill="#c2f0ea"
              fillOpacity="1"
            />
          </svg>
          <nav className={"nav-logo"}>
            <i className={"img"}></i>
            <h3 className="logo-name">Feedback Analysis</h3>
          </nav>
          <div id="menu-bar" onClick={this.openMenu}>
            {/* <div className="stick s1"></div>
            <div className="stick s2"></div>
            <div className="stick s3"></div> */}
            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <ul className={"nav-links"} ref={this["navLinks"]}>
            {liElements}
          </ul>
        </header>
      </>
    );
  }
}

export default Header;
