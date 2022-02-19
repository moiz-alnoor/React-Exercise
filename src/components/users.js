import { useEffect, useState, createContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";
import Modal from "react-modal";
import axios from "axios";
import UserDetails from "./user.details";
import History from "./History";
import dateFormat, { masks } from "dateformat";
import queryString from './query.string'
import { BallTriangle } from  'react-loader-spinner'


export const UserContext = createContext();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Users() {


  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isNumber, setIsnumber] = useState(false);
  const [pageNumber, setPageNumber] = useState(queryString());
  const [users, setUser] = useState([]);
  const [userDetail, setUserDetails] = useState([]);
  const [findUser, setFindUser] = useState([]);
  const [isImg, setIsImg] = useState(false);
  const [imgPath, setImgPath] = useState(false);
  const [isObj, setIsObj] = useState(false);

  useEffect(() => {
 
  }, []);

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?page=${pageNumber}&results=10&seed=abc`)
      .then((res) => {
        const users = res.data;
        setUser(users.results);
        setLoading(false)
      }).catch(err => err)
  }, [pageNumber]);

  useEffect(() => {
    setFindUser(findUser);
  }, [findUser]);
//pagination next
  const next = (pageNumber) => {
    pageNumber++;
    setPageNumber(pageNumber);
    History.push("/search?q=" + pageNumber);
  };
//pagination previous
  const previous = (pageNumber) => {
    pageNumber--;
    if (pageNumber > 0) {
      setPageNumber(pageNumber);
      History.push("/search?q=" + pageNumber);
    }
  };
//search by user name 
  const onSearch = (val) => {
    if (!isNaN(+val.target.value) && val.target.value !== "") {
      setIsnumber(true);
    } else {
      setIsnumber(false);
    }
    const findUser = users.filter(
      (name) => name.login.username == val.target.value
    );
    setFindUser(findUser);
  };
// click anywhere will close the modal
  function closeModal() {
    setIsOpen(false);
  }

//open modal for user details 
  const userDetails = (val) => {
    setIsOpen(true);

    if (typeof val == "string") {
      setIsObj(true);
      setIsImg(false);
      setImgPath(val);
    } else {
      setIsImg(true);
      setIsObj(false);
      setUserDetails(val);
    }
  };

  return (
    <>
      <div>

  
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AiFillCloseCircle  onClick={closeModal} className="hover:cursor-pointer mb-3"/>

          {isImg === true ? (
            <UserContext.Provider value={userDetail}>
              <UserDetails />
            </UserContext.Provider>
          ) : (
            <img width="400" height="400" src={imgPath} />
          )}
        </Modal>
      </div>


      <div className="flex justify-center my-10">
        <input
        className=" w-6/6"
          type="text"
          name="name"
          placeholder="Search by username ..."
          onChange={onSearch}
          className=" w-2/5 py-2 border-b-4 border-green-400 outline-none focus:border-green-400"
        />
        {isNumber ? (
          <span className="text-red-300">Please text only </span>
        ) : (
          false
        )}
      </div>


      <div className="flex justify-center">
  {loading?
  <div className="mt-56">
  <BallTriangle
    height="100"
    width="100"
    color=' rgb(74 222 128)'
    ariaLabel='loading'
  /> </div>:
  <section className="container mx-auto p-6 font-mono">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">fullname</th>
            <th className="px-4 py-3">username</th>
            <th className="px-4 py-3">email</th>
            <th className="px-4 py-3">DOB</th>
            <th className="px-4 py-3">street</th>
            <th className="px-4 py-3">city</th>
            <th className="px-4 py-3">country</th>
            <th className="px-4 py-3">postcode</th>
            <th className="px-4 py-3">phone number</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users && findUser.length == 0
            ? users.map((user, index) => (
                  <tr key={index} className="text-gray-700">
                    <td  className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <button
                            onClick={() =>
                              userDetails(user.picture.large)
                            }
                          >
                            <img
                              src={user.picture.thumbnail}
                              className="object-cover w-full h-full rounded-full"
                            />
                          </button>
                        </div>
                        <div>
                          <p
                            onClick={() => userDetails(user)}
                            className=" hover:cursor-pointer font-semibold text-black"
                          >
                            {user.name.first} {user.name.last}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.login.username}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {" "}
                        {user.email}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {dateFormat(user.dob.date, "fullDate")}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.street.name}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.city}
                    </td>

                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.country}
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {user.location.postcode}
                    </td>
                    <td className="px-4 py-3 text-sm border ">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{user.phone.replace(/-/g, "")} </span>
                    </td>
                  </tr>
             
              ))
            : findUser.map((user, index) => (
        
                  <tr key={index} className="text-gray-700">
                    <td  className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <button
                            onClick={() =>
                              userDetails(user.picture.large)
                            }
                          >
                            <img
                              src={user.picture.thumbnail}
                              className="object-cover w-full h-full rounded-full"
                            />
                          </button>
                        </div>
                        <div>
                          <p
                            onClick={() => userDetails(user)}
                            className=" hover:cursor-pointer font-semibold text-black"
                          >
                            {user.name.first} {user.name.last}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.login.username}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {" "}
                        {user.email}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {dateFormat(user.dob.date, "fullDate")}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.street.name}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.city}
                    </td>

                    <td className="px-4 py-3 text-ms font-semibold border">
                      {user.location.country}
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {user.location.postcode}
                    </td>
                    <td className="px-4 py-3 text-sm border">
                      {user.phone.replace(/-/g, "")}
                    </td>
                  </tr>
              ))}
        </tbody>
      </table>
    </div>
  </div>
  <div className="flex justify-center my-10">
    <button
      className=" border-4 border-b-green-400  border-white p-8 w-60 m-3"
      onClick={() => previous(pageNumber)}
    >
      previous
    </button>
    <button
      className=" border-4 border-b-green-400  border-white p-8 w-60 m-3"
      onClick={() => next(pageNumber)}
    >
      Next{" "}
    </button>
  </div>
</section>
}

</div>
       </>
  );
}

export default Users;
