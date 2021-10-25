import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/userAction";
import { UidContext } from "./context/appContext";
import Home from "./Home";
import { socketContext } from "./context/socketContext";
import io from "socket.io-client";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      })
        .then((res) => {
          setUid(res.data);
          const newSocket = io(`${process.env.REACT_APP_API_URL}`);
          setSocket(newSocket);
        })
        .catch((err) => {
          console.log("no toke" + err);
        });
    };
    fetchToken();
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);
  

  return (
    <Router>
      <Switch>
        <socketContext.Provider value={socket}>
          <UidContext.Provider value={uid}>
            <Route exact path="/" component={Home} />
          </UidContext.Provider>
        </socketContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
