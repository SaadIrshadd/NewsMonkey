import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';

export default class App extends Component {
  pagesize=5;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="home" pageSize={this.pagesize} category="general" />} />
            <Route exact path="/general" element={<News key="general" pageSize={this.pagesize} category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pagesize} category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pagesize} category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pagesize} category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pagesize} category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pagesize} category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pagesize} category="technology" />} />
          </Routes>
        </Router> 
      </div>
    );
  }
}
