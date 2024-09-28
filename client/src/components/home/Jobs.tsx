import dice from "../../assets/Mask_group-removebg-preview.png";

const Jobs = () => {
  return (
    <section className="py-8 px-8 w-full min-h-screen flex flex-col">
      <p className="text-slate-900 text-[65px] font-extrabold text-center">
        Choose From Available <br />
        Jobs Listings
      </p>
      <div className="justify-between w-full flex">
        <p className="text-slate-800 text-lg">
          Find a job that suits you and apply
        </p>
        <div className="flex gap-4">
          <button className="py-2 px-3 text-center bg-slate-800 shadow text-white rounded-full">
            Recent
          </button>
          <button className="py-2 px-3 text-center bg-slate-100 text-slate-800 shadow rounded-full">
            Popular
          </button>
        </div>
      </div>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-2">
        <div className="p-4 shadow shadow-slate-600 rounded-xl">
          <div className="w-full flex gap-3 items-center">
            <img
              src={dice}
              alt="dice"
              loading="lazy"
              className="h-14 w-14 rounded-full shadow shadow-slate-400"
            />
            <div className="flex flex-col">
              <p className="font-bold">DiCE Labs</p>
              <p className="text-sm">9 Miles, Lusaka</p>
            </div>
          </div>
          <div className="bg-slate-400 h-[1px] w-full flex mt-4"></div>
          <div className="mt-4 flex flex-col">
            <p></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
