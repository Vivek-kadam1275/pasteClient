import React, { useState } from "react"
import { data, useSearchParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Home = (props) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, updateSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const baseUrl = import.meta.env.VITE_PASTE_URL;
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);


  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated]);  // ✅ Redirect if auth state changes
  
  useEffect(() => {
    if (!pasteId) {
      return;
    }
    // console.log(pasteId);
    const fetchPaste = async () => {
      try {
        setLoading(true);
        const getPasteResponse = await fetch(`${baseUrl}/getPaste/${pasteId}`, {
          method: "GET",
          credentials: "include",
        });
        const getPaste = await getPasteResponse.json();
        console.log("get Paste-->", getPaste.data);
        setTitle(getPaste.data.title);
        setContent(getPaste.data.content);
        setLoading(false);
      } catch (error) {
        console.log("error in getting single paste-->", error);
      }
    }

    fetchPaste();

  }, [pasteId])

  async function handleSubmit(e) {
    e.preventDefault();
    const paste = {
      title: title,
      content: content,
    }

    if (pasteId) {
      //update paste

      try {
        const updatePaste = await fetch(`${baseUrl}/updatePaste/${pasteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(paste),
        })
        const data = await updatePaste.json();
        console.log(data);
        if (data.success) {

          toast.success("updated successfully...")
        } else {
          toast.error(data.message);
          setIsAuthenticated(false);
          navigate("/login");
        }

      } catch (error) {
        console.log("error in update", error);
        toast.error("error occured..")
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
    else {

      // console.log(baseUrl);
      try {
        const createPaste = await fetch(`${baseUrl}/addPaste`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(paste),
        });
        const data = await createPaste.json();
        console.log(data);
        if (data.success) {

          toast.success("created successfully...")
        } else {
          toast.error(data.message);
          setIsAuthenticated(false);
          navigate("/login");
        }

      } catch (error) {
        console.log("error in post", error);
        toast.error("error occured")
        setIsAuthenticated(false);
        navigate("/login");
      }



    }
    setTitle("");
    setContent("");
    updateSearchParams({});



  }


  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[1200px] mx-auto mt-5 screenMargin">

      <div className="flex gap-10 max-w-[1200px]">
        <input type="text" placeholder="Title" value={title} name="title" onChange={(e) => {
          setTitle(e.target.value);
          // console.log(title);
        }} className="p-2 px-5  w-[80%] border rounded-md" required />

        <button className="  text-white rounded-md w-[20%] min-w-fit bg-[#1d4ed8] font-semibold px-2" type="submit">
          {pasteId ? "update my paste" : "create my paste"}
        </button>

      </div>

      <div className="flex flex-col border rounded-md">
        <div className="flex justify-between px-5 border-b py-2">
          <div className="flex items-center  gap-1">
            <div className="w-4 h-4 rounded-full bg-[#ff5f57]"></div>
            <div className="w-4 h-4 rounded-full bg-[#febc2e]"></div>
            <div className="w-4 h-4 rounded-full bg-[#2dc842]"></div>
          </div>
          <div onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Copied successfully")
          }}>
            <MdContentCopy />

          </div>
        </div>
        {
          loading ? <div className="flex flex-col items-center min-h-[80vh] justify-center gap-5 max-w-[1200px] mx-auto mt-5 screenMargin "> <div className="dots"></div></div> :
            <textarea placeholder="Enter your content here..." value={content} name="content" onChange={(e) => setContent(e.target.value)} className="px-5 py-2 max-w-[1200px]  focus-visible:ring-0" rows={20} required></textarea>
        }
      </div>

    </form>


  )
};

export default Home;
