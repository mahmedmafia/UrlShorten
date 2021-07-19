import "./App.css";
import MakeShortPage from "./Pages/makeShort/makeShort";
import RedirectPage from "./Pages/redirectPage";
import NavBar from "./components/NavBar/navbar";
import UrlsList from './Pages/urlsList/urlsList';
import { BrowserRouter as Router, Route, Switch, Link ,Redirect} from "react-router-dom";
function App() {
  return (
    <Router>
     <NavBar></NavBar>
        <Switch>
          <Route path="/"  exact>
          <Redirect to="/shorten" />
          </Route>
          <Route path="/shorten">
            <MakeShortPage></MakeShortPage>
          </Route>
          <Route path="/shortlinks">
            <UrlsList></UrlsList>
          </Route>
          <Route path="/:slug" >
            <RedirectPage></RedirectPage>
          </Route>
         
          
        </Switch>
      
    </Router>
  );
}

export default App;
