import React, { useState, useEffect, useRef } from "react";
import "./DashboardScreen.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import Modal from "./Modal";
import { getCookie } from "./global";
import { useNavigate, useParams } from "react-router-dom";

const DashboardScreen = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [keyData, setKeyData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  var uid = getCookie("id");
  var username = getCookie("username");

  const generateUUID = () => {
    var d = new Date().getTime();

    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now();
    }

    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : r && 0x3 | 0x8).toString(16);
    });

    // return uuid;
    setApiKey(uuid);
  };

  const handleAddAPIKey = async () => {
    if (apiKey === "") {
      setErrorMessage("Generate API key first");
    } else {
      await fetch(
        `http://192.168.20.32:5000/apikey/add/${uid}&${apiKey}`
      ).catch((err) => {
        console.log(err);
      });
      // .then((response) => response.text())
      // .then((data) => console.log(data));
      window.location.reload(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/");
  };

  useEffect(() => {
    const getkeys = async (uid) => {
      await fetch(`http://192.168.20.32:5000/apikey/get/${uid}`)
        .catch((err) => {
          console.log(err);
        })
        .then((response) => response.json())
        .then((data) => {
          setKeyData(data);
        });
    };

    if (uid === null || username === null) {
      uid = 0;
      username = "nobody";
      setModalStatus(true);
    }
    getkeys(uid);
  }, []);

  return (
    <div className="dashboardScreen">
      <Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        navigate={navigate}
      />
      <div className="headerContainer">
        <h1>DashboardScreen</h1>
        <div className="logoutContainer">
          <p>{username}</p>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <p className="errorMessage">{errorMessage}</p>

      <div className="keyContainer">
        <TextField
          value={apiKey}
          variant="filled"
          sx={{ input: { color: "white" } }}
          InputLabelProps={{ className: "textFieldClass" }}
          label="API Key"
          disabled
        />
        <div className="buttonContainer">
          <Button variant="contained" color="warning" onClick={generateUUID}>
            Generate API Key
          </Button>
          <Button variant="contained" color="success" onClick={handleAddAPIKey}>
            Add API Key
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Key ID</TableCell>
              <TableCell align="right">API Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keyData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.api_key}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashboardScreen;
