import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/icons-material/Search';
import AddUserIcon from '@mui/icons-material/PersonAdd';
import AscendingIcon from '@mui/icons-material/ArrowUpward';
import DescendingIcon from '@mui/icons-material/ArrowDownward';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import ContentContainer from '../ContentContainer/ContentContainer';
import './dashboardStyles.css';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredItems, setFilteredData] = useState([]);
  const [isAsce, setIsAsce] = useState(true);
  const [btnName, setBtnName] = useState('Sort');
  const [editedUserData, setEditedUserData] = useState(null); 

  useEffect(() => {
    const userDetailsData = localStorage.getItem('userDetails');
    console.log("check userDetailsData", userDetailsData);
    const storedData = JSON.parse(userDetailsData) || [];
    setFilteredData(storedData);
  }, []);

  const handleSearch = () => {
    const userDetailsData = JSON.parse(localStorage.getItem('userDetails'));
    console.log("check userDetailsData", userDetailsData);
    const filteredData = userDetailsData.filter((user) =>
      user.username.toLowerCase().includes(searchVal.toLowerCase())
    );
    console.log("check searchedItems index", filteredData);
    setFilteredData(filteredData);
  };

  const handleSort = () =>{
    setBtnName(isAsce ? 'Sort Asc' : 'Sort Dec');
    setIsAsce(!isAsce);
    const userDetailsData = JSON.parse(localStorage.getItem('userDetails'));
    console.log("check userDetailsData", userDetailsData);

    const sortedItems = userDetailsData.slice().sort((a, b) => {
      const nameA = a.username.toUpperCase();
      const nameB = b.username.toUpperCase();

      if (isAsce) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    console.log("check sortedItems index", sortedItems);
    // Update the state to trigger a re-render with filtered data
    setFilteredData(sortedItems);
  }
  const handleOpen = () => {
    setEditedUserData(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (userData) => {
    // Open the modal with the user data
    setEditedUserData(userData);
    setIsModalOpen(true);
  };

  console.log("check sortedItems index", filteredItems);
  return (
    <div className="main_container">
      <div className="top_container">
        <div className="left-section">
          <Button
            className="showUserModalBtn"
            onClick={handleOpen}
            startIcon={<AddUserIcon />}
            sx={{
              backgroundColor: "slatewhite",
              color: "slateblue",
              marginLeft: "10px",
            }}
          >
            Add User
          </Button>
          <Button
            className="showUserModalBtn"
            onClick={handleSort}
            startIcon={btnName === 'Sort Asc' ? <AscendingIcon /> : <DescendingIcon />}
            sx={{ backgroundColor: "slateWhite" }}
          >
            {btnName}
          </Button>
        </div>
        <div className="right-section">
          <TextField
            type="search"
            className="searchbar"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search By Name"
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            className="showUserModalBtn"
            onClick={handleSearch}
            sx={{ backgroundColor: "slateWhite" }}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="content_container">
        <ContentContainer
          searchItems={filteredItems}
          handleEditUser={handleEditUser}
        />
      </div>
      <CreateUserModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        editedUserData={editedUserData}
      />
    </div>
  );
};

export default Dashboard;
