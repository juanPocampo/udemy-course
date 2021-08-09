import { useState, useEffect } from "react";
import "./style.css";
import SearchBox from "./components/SearchBox";
import axios from "axios";
import SearchResults from "./components/SearchResults";

export default function Search() {
    const [isAtTop,setIsAtTop] = useState(false);
    const [usersData,setUsersData] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(()=>
    {
        const getUsers = async () =>
            { 
                try {
                    //Request API con Fetch 
                    //const response = await fetch("https://jsonplaceholder.typicode.com/users");
                    //const data = await response.json();
                    //Request API con axios
                    const data = await axios.get("https://jsonplaceholder.typicode.com/users");
                    
                    
                    setUsersData(data);
                } catch (error) {
                    console.error(error);
            }
                            
            };
        getUsers().catch(null);
    },[]);

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