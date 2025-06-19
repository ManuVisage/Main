import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./style.css";
import Glass from "./views/glass";
import MainHomePageFinal from "./views/main-home-page-final";
import Blank from "./views/blank";
import Background from './views/background'
import ExamEnded from "./views/exam-ended";
import QuestionPaper from "./views/question-paper";
import NotFound from "./views/not-found";
import CaptureImage from "./views/capture-image-page";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Glass} exact path="/glass" />
        <Route component={MainHomePageFinal} exact path="/" />
        <Route component={Blank} exact path="/blank" />
        <Route component={CaptureImage} exact path="/capture-image" />
        <Route component={ExamEnded} exact path="/exam-ended" />
        <Route component={QuestionPaper} exact path="/question-paper" />
        <Route component={Background} exact path="/background" />

        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
