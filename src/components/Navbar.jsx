import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiCameraMovie, BiSearchAlt2 } 
from "react-icons/bi";
import "./styles/navbar.sass";

const Navbar = () => {

  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }


  return (
    <header>
      <nav id="navbar">
        <h1>
          <Link to="/"><BiCameraMovie />MovieLib</Link>               
        </h1>
        <form className="search" onSubmit={handleSubmit}>
          <input type="text" placeholder="Cherchez un film" onChange={(e) =>setSearch(e.target.value)} value={search}/>
          <button type="submit">
            <BiSearchAlt2  className="icon"/>
          </button>
        </form>
      </nav>
    </header>
  );
};



export default Navbar;
