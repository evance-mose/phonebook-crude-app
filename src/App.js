
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import AddContactPage from "./Pages/AddContactPage";
import EditContactPage from "./Pages/EditContactPage";

export default function App() {
   return(
       <Router>
        <Routes>
            <Route exact path='/' element={< HomePage />}/>
            <Route exact path='/create' element={< AddContactPage />}/>
            <Route exact path='/edit/:id' element={< EditContactPage />}></Route>
        </Routes>
       </Router>
   )
}
