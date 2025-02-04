import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

const ViewPaste = (props) => {

  const baseUrl = import.meta.env.VITE_PASTE_URL;

  const { id } = useParams();
  console.log(id);

  const [viewTitle, setViewTitle] = useState("");
  const [viewContent, setViewContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPaste = async () => {
    try {
      setLoading(true);
      const getPasteResponse = await fetch(`${baseUrl}/getPaste/${id}`);
      const getPaste = await getPasteResponse.json();
      console.log("get Paste-->", getPaste.data);
      setViewTitle(getPaste.data.title);
      setViewContent(getPaste.data.content);
      setLoading(false);

    } catch (error) {
      console.log("error in getting single paste-->", error);
    }
  }

  useEffect(() => {
    fetchPaste();
  }, [id]);



  return (

    <div>

      {loading ? <div className="flex flex-col items-center min-h-[80vh] justify-center gap-5 max-w-[1200px] mx-auto mt-5 screenMargin border rounded-md">
        <div className="dots"> </div>
      </div> : <div className="flex flex-col gap-5 max-w-[1200px] mx-auto mt-5 screenMargin ">

        <div className="flex gap-10 max-w-[1200px]">
          <input disabled type="text" placeholder="Enter title here" value={viewTitle} name="title" className="p-2 px-5 text-lg w-[100%] border rounded-md cursor-not-allowed" required />



        </div>

        <div className="flex flex-col border rounded-md">
          <div className="flex justify-between px-5 border-b py-2">
            <div className="flex items-center  gap-1">
              <div className="w-4 h-4 rounded-full bg-[#ff5f57]"></div>
              <div className="w-4 h-4 rounded-full bg-[#febc2e]"></div>
              <div className="w-4 h-4 rounded-full bg-[#2dc842]"></div>
            </div>
            <button onClick={() => {
              navigator.clipboard.writeText(pastes[index].content);
              toast.success("Copied successfully")
            }}>
              <MdContentCopy />

            </button>
          </div>
          <textarea disabled placeholder="Enter your content here..." value={viewContent} name="content" className="px-5 py-2 max-w-[1280px]  focus-visible:ring-0 cursor-not-allowed" rows={20} required></textarea>
        </div>

      </div>}
    </div>

  )
};

export default ViewPaste;
