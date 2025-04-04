import React from "react";

const Stories = () => {
  return (
    <>
      <h1 id="stories" className="text-5xl font-bold  text-center mb-2">
        Stories
      </h1>
      <h1 id="stories" className=" text-center mb-8">
        Dive into our success stories, when Communities Rise, the World Listens.
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
              <h2 id="address" className="text-sm text-gray-500">
                07/12/2024 - Tamilnadu , India{" "}
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

          <div className="card bg-white w-96 h-max shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://res.cloudinary.com/dpxoco8xb/image/upload/v1743748234/women_empowerment_fqb85v.png"
                alt="child"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Empowering Women with Employment </h2>
              <h2 id="address" className="text-sm text-gray-500">
                16/02/2025 - Bihar, India{" "}
              </h2>
              <p>
                In a small town in Bihar, women had limited job opportunities.
                Spurti facilitated a challenge post by a local women’s group,
                which caught the attention of an international NGO and a
                sustainable fashion brand. Together, they launched a stitching
                and handicraft training center. Over 60 women are now skilled
                and earning, bringing pride and income to their families.
              </p>
            </div>
          </div>
          <div className="divider divider-horizontal divider-neutral">I</div>

          <div className="card bg-white w-96 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://res.cloudinary.com/dpxoco8xb/image/upload/v1743748235/mountain_school_hey6uq.png"
                alt="child"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Bringing Classrooms to the Mountains{" "}
              </h2>
              <h2 id="address" className="text-sm text-gray-500">
                27/03/2022 - Himachal, India
              </h2>
              <p>
                In a remote village nestled in the hills of Himachal, children
                walked 5 km daily to attend school. After the issue was
                submitted, Spurti’s network brought in educational NGOs and
                local volunteers. Within months, a digital classroom was set up
                with internet-powered lessons, trained teachers, and community
                support—transforming the village into a learning hub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
