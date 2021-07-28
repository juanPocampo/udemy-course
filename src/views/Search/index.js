import { useDebugValue, useState } from "react";
import "./style.css";
import SearchBox from "./components/SearchBox";
import data from "../../data/users.json";

export default function Search() {
    const [isAtTop,setIsAtTop] = useState(false);
    const [usersData,setUsersData] = useState(data);
    const handleSearchClick = (searchText) => {
        if(usersData?.length){
            const filteredData = usersData.filter((value)=>{
               return( 
               value.name.includes(searchText) ||
               value.email.includes(searchText)||
               value.phone.includes(searchText)||
               value.username.includes(searchText)) 
            });
            console.log(filteredData);
        }
        setIsAtTop(true);
    };
   
    const handleCloseClick = () => {
        setIsAtTop(false);
    };
    return (
        <div className={`search ${isAtTop? "search--top" : "search--center"}`}>
           <SearchBox 
           onSearch={handleSearchClick} 
           onClose={handleCloseClick}/>
        </div>
    );
}