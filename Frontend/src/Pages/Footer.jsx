import React from "react";
import { FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

export const Footer = () => (
  <footer className="footer footer-horizontal footer-center bg-base-100 px-2 py-5">
    <div>
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dpxoco8xb/image/upload/v1743749459/Simple_Swan21_r4zzlz.png"
          alt="Smiling child"
          className="w-12"
        />
        <p className="text-xl font-bold">स्फूर्ती</p>
      </div>
      <p>
        “A world where helping hands, collaboration, and compassion drive
        impact.”
      </p>
      <div className="flex gap-4">
        <FaYoutube className="text-3xl cursor-pointer" />
        <IoMdMail className="text-3xl cursor-pointer" />
        <FaGithub className="text-3xl cursor-pointer" />
      </div>
    </div>

    <p>Copyright © {new Date().getFullYear()} स्फूर्ती - All right reserved</p>
  </footer>
);

export default Footer;
