import React, {Component} from 'react';

class About extends Component {

  render() {
    return(

      <div className="container">

        <div align = "center">

          <br />
          <br />

          <h1 className="my-4">About Us</h1>

          <p>Our goal is to allow users to browse a database that ranks charities

             aiming to fight poverty in cities around the United States. Easily find charities and organizations in your city or county you would like to help out! Our intended users are those who want to help others in need and make an impact not only in their community, but those across the U.S.
          </p>

        </div>
        <div className="row">


          <div className="col-lg-12" align="center">

            <h1 className="my-4">Our Team</h1>

          <br />

          </div>

          <div className="col-lg-4 col-sm-6 text-center mb-4">

            <img className = "aboutPic" src="https://jbermancs373.files.wordpress.com/2018/06/img_e2540-1.jpg?w=600&h=712" alt="" />

            <h3>Justin Berman
</h3>

            <p><i>Backend Developer</i></p>

            <p>Originally from LA (very chill). Currently a 5th and a half year senior studying CS and Finance. In addition to traffic and the beach, I'm also very into Bitcoin, Ethereum, and the cryptocurrency space.</p>

            <p>No. of Commits: <span id="justin_commits"></span></p>

            <p>No. of Issues: <span id="justin_issues"></span></p>

            <p>No. of Unit Tests: 0</p>


          </div>

          <div className="col-lg-4 col-sm-6 text-center mb-4">

            <img className = "aboutPic" src="https://image.ibb.co/bvMyc8/blog_picture.jpg" alt="" />

            <h3>Chris Amini
</h3>

            <p><i>Frontend Developer</i></p>

            <p>Junior Computer Science major. Big Mavericks and Cowboys fan.</p>

            <p>No. of Commits: <span id="chris_commits"></span></p>

            <p>No. of Issues: <span id="chris_issues"></span></p>

            <p>No. of Unit Tests: 0 </p>

          </div>


          <div className="col-lg-4 col-sm-6 text-center mb-4">

            <img className = "aboutPic" src="https://charliematar.files.wordpress.com/2018/06/1528682464316165-e1528682569990.jpg" alt="" />

            <h3>Charlie Matar
</h3>

            <p><i>Frontend Developer</i></p>

            <p>I am a senior at the University of Texas at Austin studying Computer Science. I am an avid Basketball, Football, and Baseball fan.</p>

            <p>No. of Commits: <span id="charles_commits"></span></p>

            <p>No. of Issues: <span id="charles_issues"></span></p>

            <p>No. of Unit Tests: 0</p>

          </div>


          <div className="col-lg-6 col-sm-6 text-center mb-4" align="center">

            <img className = "aboutPic" src="https://cdn-images-1.medium.com/max/1600/1*Is7SvqGQjHFkRVfM7w0odg.jpeg" alt="" />

            <h3>Yijie Tang
</h3>

            <p><i>Frontend Developer</i></p>

            <p>I am a student at the University of Texas in Austin studying computer science.</p>

            <p>No. of Commits: <span id="yijie_commits"></span></p>

            <p>No. of Issues: <span id="yijie_issues"></span></p>

            <p>No. of Unit Tests: 0</p>

          </div>


          <div className="col-lg-6 col-sm-6 text-center mb-4">

            <img className = "aboutPic" src="https://image.ibb.co/gNvJc8/kevin.jpg" alt="" />

            <h3>Kevin Singh
</h3>

            <p><i>Backend Developer</i></p>

            <p>I'm a Computer Science student at the University of Texas at Austin. I like to build things, break things, fix things and so on...</p>

            <p>No. of Commits: <span id="kevin_commits"></span></p>

            <p>No. of Issues: <span id="kevin_issues"></span></p>

            <p>No. of Unit Tests: 0</p>

          </div>

        </div>


        <div align="center">

          <h2 className="my-4">Stats</h2>

          <p>Total no. of Commits: <span id="total_commits"></span></p>

          <p>Total no. of Issues: <span id="total_issues"></span></p>

          <p>Total no. of Unit Tests: 0</p>

          <h2 className="my-4">Data</h2>

          <a href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397">Charity Navigator</a>
          <br />
          <br />

          <span>

            How data was scraped: First requested a key from the Charity Navigator website.
            Then used <a href="https://gitlab.com/chris.amini/FightingPoverty/blob/master/datasets/Python%20Modules/json_scraper.py">this python module </a>
            to scrape data from the api into a json file. See <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/Charities">this folder </a> 
             to see which queries were used.
          </span>

          <br />
          <br />

          <a href="https://www.census.gov/developers/">Census Poverty Statistics and Geography Info</a>
          <br />
          <br />

          <span>

            How data was scraped: Used <a href="https://gitlab.com/chris.amini/FightingPoverty/blob/master/datasets/Python%20Modules/json_scraper.py">this python module </a>
            to scrape data from the api into a json file. See the
            <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/Cities"> cities folder</a>,
            <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/Counties"> counties folder</a>,
            <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/States"> states folder</a>, and
            <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/Zip%20Codes"> zip code folder </a>
            to see exact queries used.

          </span>
          <br />
          <br />


          <a href="https://www.unitedstateszipcodes.org/zip-code-database/">United States Zip Codes</a>
          <br />
          <br />

          <span>
            How data was scraped: Downloaded csv file from the United States Zip Codes website for free.
            Then used <a href="https://gitlab.com/chris.amini/FightingPoverty/blob/master/datasets/Python%20Modules/csv_to_json.py">this python module </a>

            to convert the downloaded csv into <a href="https://gitlab.com/chris.amini/FightingPoverty/tree/master/datasets/Zip%20Codes/zip_codes_detailed.json">this json file</a>.

            This dataset will enable us to link all scraped zip codes, cities, states, and counties.

          </span>
          <br />

          <h2 className="my-4">Tools</h2>

          <p>Amazon Web Services (AWS): To host our website</p>

          <p>GitLab: For collaboration and code storage</p>

          <p>Bootstrap: To obtain our site design</p>

          <p>Postman: For testing REST API</p>

          <p>Namescheap: To obtain a free domain name (.online)</p>

          <p>Google Docs: For collaborative writing</p>

          <p>S3: For hosting our front-end</p>


          <h2 className="my-4">Links</h2>

          <a href="http://gitlab.com/chris.amini/FightingPoverty">GitLab Repo</a>
          <br />
          <br />



          <a href="http://documenter.getpostman.com/view/4703596/RWEjqJFb#2d325e10-686c-461b-a279-1167bfcc206b">Postman API</a>
           <br />
          <br />

      


          <h2>Gitlab Stats</h2>

          <p>Project name: <b><span>FightPoverty</span></b></p>

          <p>Description: <b><span id="description"></span></b></p>

          <p>Created on: <b><span id="time_created"></span></b></p>

          <p>Last updated on: <b><span id="time_last_update"></span></b></p>

          <p>Starred: <b><span id="num_stars"></span></b> times</p>

          <p>Forked: <b><span id="num_forks"></span></b> times</p>

        </div>

      </div>

    );
  }
}

export default About;
