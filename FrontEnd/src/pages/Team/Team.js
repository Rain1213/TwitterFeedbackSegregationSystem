import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import './Team.css'
import imgAli from '../../assets/Profile/Ali.jpg'
import imgNikunj from '../../assets/Profile/Nikunj.jpg'
import imgVaspar from '../../assets/Profile/Vaspar.jpg'
import imgRishabh from '../../assets/Profile/Rishabh.jpg'
import imgVidit from '../../assets/Profile/Vidit.jpg'
import Profileurl from '../../assets/Profile/profile-bg.jpg'
import Card from '../../components/Card/Card';

const menus = [{text: 'Home', link: 'home'}, {text: 'Search', link: 'search'}, {text: 'Team', link: 'team'}];

 class Team extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           profile : [
              { id: 1, Name: 'Aliabbas', Role: 'Backend Developer', Imgurl: imgAli, Giturl: "https://github.com/Aliabbas78692", LinkedInurl:"https://www.linkedin.com/in/aliabbas-attarwala-71b010176/", About: "Aliabbas Attarwala is pursing his BTech in Computer Engineering from CHARUSAT university.He is having good knowledge in the field s of web development and cloud computing." },
              { id: 2, Name: 'Nikunj', Role: 'Frontend Developer', Imgurl: imgNikunj, Giturl: "https://github.com/Nikunj018", LinkedInurl:"https://www.linkedin.com/in/nikunj-delavadiya-4544b518b/", About: "Nikunj Delavadiya is pursing his BTech in Computer Engineering from CHARUSAT university. UI/UX design and Animation attracts him a lot. To know about his project work, check out his Github profile." },
              { id: 3, Name: 'Vaspar', Role: 'Full stack Developer', Imgurl: imgVaspar, Giturl: "https://github.com/Vaspar-a", LinkedInurl:"https://www.linkedin.com/in/vaspar-a-9a189a121/", About: "Vaspar Ambapardiwala is pursing his BTech in Computer Engineering from CHARUSAT university.As an aspiring Full Stack Developer he wishes to develop applications that can be useful." },
              { id: 4, Name: 'Rishabh', Role: 'Frontend Developer', Imgurl: imgRishabh, Giturl: "https://github.com/Rain1213", LinkedInurl:"https://www.linkedin.com/in/rishabh-balse-ab5018207/", About: "Rishabh Balse is pursuing his BTech in Computer Engineering from CHARUSAT university. As an aspiring Android developer, Rishabh wishes to take on projects that helps the community in one way or another." },
              { id: 5, Name: 'Vidit', Role: 'Backend Developer', Imgurl: imgVidit, Giturl: "https://github.com/Vidit631", LinkedInurl:"https://www.linkedin.com/in/vidit-dave-733862172/", About: "Vidit Dave is pursing his BTech in Computer Engineering from CHARUSAT university.As an aspiring Android developer, Vidit wishes to opt for industrial projects for gaining more experience of the real world."}
           ]
        }
     }

    render() {
        return (
            <>
                <Header menus={menus} />
                <section>
                    <div className = "container">
                        <h1 className="heading">Meet The Team</h1>
                        <div className = "card-wrapper">
                        {this.state.profile.map((item,index)=>{
                            return <Card key={`card-${index}`} item={item} bgImg={Profileurl} />
                        })}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default Team;