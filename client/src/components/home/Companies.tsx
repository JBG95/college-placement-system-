import airtel from "../../assets/airtel-removebg-preview.png";
import mtn from "../../assets/mtn-removebg-preview.png";
import zamtel from "../../assets/zamtel-removebg-preview.png";
import zesco from "../../assets/zesco-removebg-preview.png";
import dice from "../../assets/Mask_group-removebg-preview.png";
import fqm from "../../assets/fqm-removebg-preview.png";
import shoprite from "../../assets/shoprite.png";
import stanchart from "../../assets/stanchart-removebg-preview.png";
import Marquee from "react-fast-marquee";

const companyLogos = [
  zesco,
  airtel,
  mtn,
  dice,
  fqm,
  stanchart,
  shoprite,
  zamtel,
];

const Companies = () => {
  return (
    <div className="overflow-hidden py-8">
      <Marquee className="w-full">
        <div className="flex justify-around items-center w-full space-x-20">
          {companyLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="h-20 w-20"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Companies;
