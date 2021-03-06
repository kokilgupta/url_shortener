import React from 'react';
import HomePage from './Homepage/homepage';
import {Switch,Route, BrowserRouter} from 'react-router-dom';
import Page from '../src/Page/page';
import 'antd/dist/antd.css';

const App=()=>{
 return(
   <BrowserRouter>
       <Switch>
          <Route path="/:id" component={Page} exact />
          <Route path="/" component={HomePage} exact/>
       </Switch>
     </BrowserRouter>
  )
}
export default App;