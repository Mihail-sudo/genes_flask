import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom"
import ScatterChart from './components/ScatterChart';
import Info from './components/Info';
import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Answer from './components/Answer';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  

const [nodes, setNodes] = useState([])
const [graphStatus, setGraphStatus] = useState('')

  const getData = (data) => {
    setGraphStatus('Loading... Please Wait')
    fetch(`http://127.0.0.1:8000/api/search?proteins=${data}`, {method: 'POST'}).then(response => response.json()).then(data => (
      data.error ? setGraphStatus(`Error: ${data.error}`) : (
        setGraphStatus('valid'),
        setNodes(data.coords.data
      .map((node, index) => (
        {
          posX: node[0],
          posY: node[1],
          group: node[2],
          id: index,
          name: data.genes[index].Name,
          function: data.genes[index].Function
        }
    ))))))
  }
    
    // fetch('nodes.json').then(response => response.json()).then(data => (
    //   data.error ? setGraphStatus(data.error) : (
    //     setGraphStatus('valid'),
    //     setNodes(data.coords.data
    //   .map((node, index) => (
    //     {
    //       posX: node[0],
    //       posY: node[1],
    //       group: node[2],
    //       id: index,
    //       name: data.genes[index].Name,
    //       function: data.genes[index].Function
    //     }
    // ))))))  }

  const getGenes = (data) => {
    getData(data)
  }

  const onSignUp = (data, action) =>{
    fetch(`http://127.0.0.1:8000/api/${action}`,{mode:'no-cors'}, {method: 'POST', body: data}).then(response => console.log(response.json()))
  }

  const selectNode = (id) => {
    setNodes(
      nodes.map(node => 
      node.id === id? {...node, selected: true} : {...node, selected: false}
    ))
  }

  const current_user = {
    is_authenticated: false
  }

  const selectedNode = nodes.find(node => node.selected)

     return (
      <>
      <Header current_user={current_user}/>
        <main role="main" className="container">
            <div className="row">
                {/* <div className="col-md-8"> */}
                    {/* {% with messages = get_flashed_messages(with_categories=true) %}
                        {% if messages %} 
                            {% for category, message in messages %}
                                <div class="alert alert-{{ category }}">
                                    {{ message }}
                                </div>
                            {% endfor %}
                        {% endif %}
                    {% endwith %} */}
                    <div className="content-section">
                      <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/search" element={<Search getGenes={getGenes} />}/>
                        <Route path="/search/answer" element={<Answer nodes={nodes} selectNode={selectNode} selectedNode={selectedNode}  graphStatus={graphStatus} />}/>
                        <Route path="/signUp" element={<SignUp onSignUp={onSignUp}/>}/>
                        <Route path="/login" element={<Login onSignUp={onSignUp}/>}/>
                      </Routes>
                    </div>
            </div>
        </main>
        <Footer/>
      </>
    );
  }

export default App;

