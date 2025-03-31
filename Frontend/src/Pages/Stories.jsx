import React from "react";

const Stories = () => {
  return (
    <>
      <h1 id="stories" className="text-2xl ml-4 font-semibold text-zinc-600">
        Stories...
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="card bg-white w-96 shadow-lg">
            <figure className="px-5 pt-5">
              <img
                src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072089/gnon1srxjnexnua9mpzj.jpg"
                alt="child"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Fighting Child Labor with Vocational Training
              </h2>
              <p>
                Due to poverty, many children were forced into hazardous labor
                instead of attending school. Spurti initiated a comprehensive
                vocational training program providing tailoring, carpentry, and
                computer skills. Over 150 children have transitioned from labor
                to education and skill-based employment.
              </p>
            </div>
          </div>

          <div className="divider divider-horizontal divider-neutral">I</div>

          <div className="card bg-white w-96 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072089/gnon1srxjnexnua9mpzj.jpg"
                alt="child"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Fighting Child Labor with Vocational Training
              </h2>
              <p>
                Due to poverty, many children were forced into hazardous labor
                instead of attending school. Spurti initiated a comprehensive
                vocational training program providing tailoring, carpentry, and
                computer skills. Over 150 children have transitioned from labor
                to education and skill-based employment.
              </p>
            </div>
          </div>
          <div className="divider divider-horizontal divider-neutral">I</div>

          <div className="card bg-white w-96 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072089/gnon1srxjnexnua9mpzj.jpg"
                alt="child"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Fighting Child Labor with Vocational Training
              </h2>
              <p>
                Due to poverty, many children were forced into hazardous labor
                instead of attending school. Spurti initiated a comprehensive
                vocational training program providing tailoring, carpentry, and
                computer skills. Over 150 children have transitioned from labor
                to education and skill-based employment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
