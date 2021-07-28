import { useState } from "react";
import "./style.css";
import SearchBox from "./components/SearchBox";
import data from "../../data/users.json";
import SearchResults from "./components/SearchResults";

export default function Search() {
    const [isAtTop,setIsAtTop] = useState(false);
    const [usersData,setUsersData] = useState(data);
    const [results, setResults] = useState([]);
    const handleSearchClick = (searchText) => {
        const searchTextLower = searchText.toLowerCase();
        setIsAtTop(true);
        if(usersData?.length){
            const filteredData = usersData.filter((value)=>( 
               value.name.toLowerCase().includes(searchTextLower) ||
               value.email.toLowerCase().includes(searchTextLower)||
               value.phone.toLowerCase().includes(searchTextLower)||
               value.username.toLowerCase().includes(searchTextLower)) 
            );
            setResults(filteredData);
        }
    };
   
    const handleCloseClick = () => {
        setIsAtTop(false);
        setResults([]);
    };
    return (
        <div className={`search ${isAtTop? "search--top" : "search--center"}`}>
           <SearchBox 
           onSearch={handleSearchClick} 
           onClose={handleCloseClick}
           isSearching={isAtTop}/>
           <SearchResults results={results} isSearching={isAtTop}/>
        </div>
    );
}