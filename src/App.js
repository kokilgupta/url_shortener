import React from 'react';
import HomePage from './Homepage/homepage';
import {Switch,Route, BrowserRouter} from 'react-router-dom';
import Page from '../src/Page/page';

const App=()=>{
 return(
   <BrowserRouter>
       <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/:id" component={Page}/>
       </Switch>
     </BrowserRouter>
  )
}
export default App;