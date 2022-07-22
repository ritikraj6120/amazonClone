import React from 'react'
import "./styles/Home.css"
const Carousel = () => {
  return (
    <div class="home__image">
    <div id="carouselExampleIndicators" class="carousel slide " >
    <div class="carousel-indicators">
      <button
        type="button"
        data-mdb-target="#carouselExampleIndicators"
        data-mdb-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-mdb-target="#carouselExampleIndicators"
        data-mdb-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-mdb-target="#carouselExampleIndicators"
        data-mdb-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD22/GW/ACQ/PC_Hero_3000x1200_ho._CB631612836_.jpg"class="d-block w-100" alt="Wild Landscape"/>
      </div>
      <div class="carousel-item">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/laptop/pd/heros/CEPC_Electronics_GW_Graphics_PD22_3000x1200._CB631565460_.jpg" class="d-block w-100" alt="Camera"/>
      </div>
      <div class="carousel-item">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" class="d-block w-100" alt="Exotic Fruits"/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
  )
}

export default Carousel