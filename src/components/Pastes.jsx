import React, {   useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";



const Pastes = (props) => {

  const [searchItem, setSearchItem] = useState("");
  const [pasteData, setPasteData] = useState([]);
  const [loading, setLoading] = useState(false);
      const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  
  const baseUrl = import.meta.env.VITE_PASTE_URL;
  // filtering data based on searchItem
  const filteredData = pasteData.filter((item) => (item.title.toLowerCase().includes(searchItem.toLowerCase())));

 const navigate=useNavigate();



  async function deleteHandler(id) {
    try {
      const deletePaste = await fetch(`${baseUrl}/deletePaste/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      setPasteData((prevData) => prevData.filter((paste) => paste._id !== id));
    } catch (error) {
      console.log("error in deleting paste", error);
      
    }


  }


  const fetchData = async () => {

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/getPastes`, {
        method: "GET",
        credentials: "include",
      });
      const Data = await response.json();
      console.log(Data);
      if(Data.success){
        setPasteData(Data.data);
      
      }else{
        toast.error(Data.message);
        setIsAuthenticated(false);
        navigate("/login");
      }
      setLoading(false);

    } catch (error) {
      console.log("error in fetching pastes");
      setLoading(false);
      navigate("/login");
    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="max-w-[1200px] mx-auto mt-20  flex flex-col gap-5 screenMargin">

      <input type="search" value={searchItem} name="searchItem" placeholder="search paste here..." className="px-5 py-2 w-full border rounded-md " onChange={(e) => setSearchItem(e.target.value)} />

      <div className="border rounded-md">
        <div className="border-b rounded-md" >
          <h1 className="text-4xl font-bold px-5 py-2 text-center" >All Pastes</h1>
        </div>
        <div className=" py-4 px-5">
          {
            loading ? <div className="flex w-full justify-center  items-center min-h-24 ">
              <div className="dots "></div>
            </div> : <div>
              {
                filteredData.length > 0 ? <div className="flex flex-col gap-4 ">
                  {filteredData.map((item) => {
                    return (
                      <div key={item._id} className="border rounded-md px-5 py-4 flex justify-between pastes-col">
                        <div className="flex flex-col gap-5 w-[50%] title-cont-res">
                          <div className="text-3xl font-semibold text-center-res">{item.title} </div>
                          <div className="text-[#707070] line-clamp-3 text-balance text-center-res"> {item.content} </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <div className="flex gap-2">
                            <button >
                              <NavLink to={`/?pasteId=${item._id}`}>
                                <LuPencilLine className="text-3xl border p-1 " />
                              </NavLink>
                            </button>
                            <button>
                              <NavLink to={`/pastes/${item._id}`}>
                                <MdOutlineRemoveRedEye className="text-3xl border p-1 " />
                              </NavLink>
                            </button>
                            <button onClick={() => { deleteHandler(item._id) }}>
                              <RiDeleteBin5Line className="text-3xl border p-1 " />
                            </button>
                            <button onClick={() => {
                              navigator.clipboard.writeText(item.content);
                              toast.success("Copied successfully")
                            }}>
                              <MdContentCopy className="text-3xl border p-1 " />

                            </button>
                            <RWebShare
                              data={{
                                text: "Web Share - vk",
                                url: `${window.location.origin}/pastes/${item._id}`,
                                title: "paste link",
                              }}
                              onClick={() => {
                                console.log("shared successfully!")
                              }
                              }
                            >
                              <button className="">
                                <FiShare className="text-3xl border p-1 " />

                              </button>
                            </RWebShare>
                          </div>
                          <div className="text-center-res">{item.createdAt}</div>
                        </div>
                      </div>
                    )
                  })
                  }
                </div> :
                  <div className="text-2xl text-center w-full text-chileanFire-500">
                    No data found
                  </div>
              }
            </div>
          }
        </div>
      </div>

    </div>
  )
};

export default Pastes;
