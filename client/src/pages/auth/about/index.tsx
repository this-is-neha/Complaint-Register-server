import banner1 from "../../../assets/banner1.png"
import banner9 from "../../../assets/banner9.jpg"
import banner3 from "../../../assets/banner3.jpg"
import banner7 from "../../../assets/banner7.jpeg"


import { FooterComponent, HeaderComponent } from "../../../components/common";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

const Aboutus = () => {
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  
    return (
        <>
            <HeaderComponent />
            <div className="relative isolate min-h-screen">
  <div className="w-full h-full flex">
    <div className="w-1/2 h-full">
      <Slider {...settings}>
        <div>
          <img src={banner1} className="w-full h-[600px] object-cover"/>
        </div>
        <div>
          <img src={banner3} className="w-full h-[600px] object-cover"/>
        </div>
        <div>
          <img src={banner9} className="w-full h-[600px] object-cover"/>
        </div> 
        <div>
          <img src={banner7} className="w-full h-[600px] object-cover"/>
        </div> 
      </Slider>
    </div>
    <div className="w-1/2 h-[500px]  mt-2  p-10 bg-gray-400 text-black rounded-lg border-4 border-gray-800 shadow-lg flex items-center justify-center">
      <p className="text-2xl">
        Our website aims to serve as a valuable tool for data collection and analysis, enabling long-term planning and decision-making to tackle systemic issues. This is a great initiative for fostering community engagement and addressing local issues effectively. By using a Google map to pinpoint specific problems with different color codes, we are creating a visual representation that can help prioritize and address issues efficiently. This approach promotes transparency, accountability, and collaboration between citizens and local administration, fostering a sense of ownership and responsibility for community welfare. It's sustainable because it empowers citizens to actively participate in the improvement of their surroundings, leading to more efficient allocation of resources and a stronger sense of community cohesion.
      </p>
    </div>
  </div>


<br></br>
<br></br>

<div className="flex flex-col items-start pl-4 pr-4">
  <h1 className="text-4xl text-left shadow-lg mb-6">FAQ</h1>
  
  <p className="bg-purple-200 text-2xl shadow-lg border-gray-700 rounded-lg p-14 mt-4 text-left w-full hover:bg-gray-300">
    1. What does this website do?<br /><br />
    This website primarily focuses on mapping the locations where problems arise and making it reach the respective authority.
  </p>

  <p className="bg-purple-200 text-2xl shadow-lg border border-gray-200 rounded-lg p-14 mt-8 text-left w-full hover:bg-gray-300">
    2. Can everyone use this website?<br /><br />
    Yes, everyone can use this website. Prior to using this website, one needs to verify their account by submitting some documents.
  </p>

  <p className="bg-purple-200 text-2xl shadow-lg border border-gray-200 rounded-lg p-14 mt-8 text-left w-full hover:bg-gray-300">
    3. How can we use this website?<br /><br />
    First, the user needs to register, and then one can choose the category they want to complain about. Later, the user can map their location and write a complaint.
  </p>

  <p className="bg-purple-200 text-2xl shadow-lg border border-gray-200 rounded-lg p-14 mt-8 text-left w-full hover:bg-gray-300">
    4. How can we be sure if the work is done or not?<br /><br />
    There is a chatbox option where you can talk to the authority members directly.
  </p>

  <p className="bg-purple-200 text-2xl shadow-lg border border-gray-200 rounded-lg p-14 mt-8 text-left w-full hover:bg-gray-300">
    5. How can we verify that the government is active in solving issues or not?<br /><br />
    There is a feature of polling where people can vote and comment if their problems are solved or not.
  </p>

  <p className="bg-purple-200 text-2xl shadow-lg border border-gray-200 rounded-lg p-14 mt-8 text-left w-full hover:bg-gray-300">
    6. What if there occurs any problem using this website?<br /><br />
    You can send a message or feedback from the option below; we will try our best to solve your query or issue.
  </p>
</div>



</div>









<br></br>
<br></br>
<br>
</br>
            <FooterComponent />
        </>
    );
}


export default Aboutus
