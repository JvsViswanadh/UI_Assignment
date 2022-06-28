import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import date from "date-and-time";
import "./Dashboard.css";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [view, setView] = useState("table");
  const [refresh, setRefresh] = useState(false);
  const [Timestamp, setTimestamp] =useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://randomuser.me/api?results=50")
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        setResults(result.results);
        const now = new Date();
        setTimestamp(date.format(now,'YYYY/MM/DD HH:mm:ss'));
      });
  }, [refresh]);

  const handleAlignment = (event, newView) => {
    setView(newView);
  };

  return (
  
    <div className="dashboard-page">
      <div className="dashboard-container">        
        <div className="dashboard-title">
        
        <h2> DASHBOARD</h2>
        <div>
        <h3>WELCOME Admin
         <Button
          className="log"
          variant="text"
          type="primary"
          onClick={() => (window.location.href = "/")}
        >LOGOUT
        <LogoutIcon/>
        </Button>
        </h3>
        </div>
        </div>
        <div className="view-header">
          <h4>{view === "table" ? "Table View" : "Tile view"}</h4>
          <ToggleButtonGroup
            className="toggle-cotainer"
            value={view}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="small"
          >
            <ToggleButton value="table" size="small">
              <TableRowsIcon/>
            </ToggleButton>
            <ToggleButton value="tile" size="small">
              <GridViewIcon/>
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outlined" onClick={() => setRefresh(!refresh)}>
            <span>{Timestamp}</span>
            <RefreshIcon/>
          </Button>
        </div>
        {isLoading && <h4>Loading....</h4>}
        {!isLoading && view === "table" && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th> Name </th>
                  <th> Gender </th>
                  <th> Age </th>
                  <th> DOB </th>
                  <th> Cell </th>
                  <th> Email </th>
                  <th> Phone </th>
                  <th> Nationality </th>
                </tr>
              </thead>
              <tbody>
                {results?.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        <img src={row?.picture?.thumbnail}></img>{" "}
                      </td>
                      <td>
                        {" "}
                        {row?.name?.title +
                          " " +
                          row?.name?.first +
                          " " +
                          row?.name?.last}{" "}
                      </td>
                      <td> {row?.gender} </td>
                      <td> {row?.dob?.age} </td>
                      <td> {row?.dob?.date} </td>
                      <td> {row?.cell} </td>
                      <td> {row?.email} </td>
                      <td> {row?.phone} </td>
                      <td> {row?.nat} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
          </div>
        )}
        {!isLoading & (view === "tile") && (
          <div className="tile-container">
            <Grid container spacing={2}>
              {results?.map((person) => {
                return (
                  <Grid item xs={4}>
                    <Card variant="outlined" raised className="card-actual">
                      <div className="card-each">
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <img src={person?.picture?.thumbnail} />
                          </Grid>
                          <Grid item xs={10}>
                            <span>Name:
                              {person?.name?.title +
                                " " +
                                person?.name?.first +
                                " " +
                                person?.name?.last}{" "}
                            </span>
                            <br></br>
                            <span> Gender: {person?.gender} </span>
                            <br></br>
                            <span> Age: {person?.dob?.age} </span>
                            <div> DOB: {person?.dob?.date} </div>
                        <div> Cel: {person?.cell} </div>
                        <div>Email: {person?.email} </div>
                        <div>Phone: {person?.phone} </div>
                        <div>Nationality: {person?.nat} </div>
                          </Grid>
                        </Grid>
                        
                      </div>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
