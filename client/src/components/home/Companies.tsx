import airtel from "../../assets/airtel-removebg-preview.png";
import mtn from "../../assets/mtn-removebg-preview.png";
import zamtel from "../../assets/zamtel-removebg-preview.png";
import zesco from "../../assets/zesco-removebg-preview.png";
import dice from "../../assets/Mask_group-removebg-preview.png";

const companyLogos = [zesco, airtel, mtn, dice, zamtel];

const Companies = () => {
  return (
    <div className="overflow-hidden py-8">
      <div className="flex justify-center gap-6 w-full">
        {companyLogos.map((logo, index) => (
          <div key={index} className="mx-8">
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="h-20 w-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
