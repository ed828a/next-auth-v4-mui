import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default class SimpleSlider extends Component {



  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    const { items } = this.props;
    return (
      <div>
        <Slider {...settings}>
          {items}
        </Slider>
      </div>
    );
  }
}