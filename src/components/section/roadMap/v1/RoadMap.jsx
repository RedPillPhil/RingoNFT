import { Slider, SliderItem } from "../../../../common/slider/Slider";

import SectionTitle from "../../../../common/sectionTitle";
import dividerImgShape from "../../../../assets/images/nft/v1_roadmap_divider_shape.png";
import roadMapBgGrand from "../../../../assets/images/bg/bithu_roadmap_mash_Grad.png";

import data from "../../../../assets/data/roadMap/roadMapV1";
import RoadMapStyleWrapper from "./RoadMap.style";

const RoadMap = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <RoadMapStyleWrapper id="roadmap">
      <div className="container">
        <SectionTitle title="Roadmap" subtitle="Our Goals" />
        <div className="RoadMapStyleWrapper_div1">Our Ringo journey has been carefully crafted to ensure that we deliver an exciting and engaging experience for our community. Here are the six phases of our roadmap:</div>
        <div className="v1_roadmap_divider">
          <img src={dividerImgShape} alt="bithu nft section divider" />
        </div>
        <div className="v1_roadmap_contents_inner">
          <div className="v1_roadmap_contents">
            <Slider {...settings}>
              {data?.map((item, i) => (
                <SliderItem key={i}>
                  <div className="v1_roadmap_contents_text">
                    <div className="roadmap_step">
                      <h3> {item.title} </h3>{" "}
                      <img src={item.icon} alt="bithu road map icon" />
                    </div>
                    <h4>{item.subtitle}</h4>
                    <p>{item.text}</p>
                  </div>
                </SliderItem>
              ))}
            </Slider>
            <div></div>
            <div className="RoadMapStyleWrapper_div1">We are thrilled to be embarking on this journey with our community, and we look forward to bringing you along every step of the way. Stay tuned for more exciting updates and announcements.</div>
          </div>
        </div>
      </div>
      <div className="bithu_roadmap_mass_gard">
        <img src={roadMapBgGrand} alt="bithu nft road map bg" />
      </div>

    </RoadMapStyleWrapper>
  );
};

export default RoadMap;
