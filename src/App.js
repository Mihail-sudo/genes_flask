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

function App() {
  

const [nodes, setNodes] = useState([])

  const getData = () => {
    fetch('nodes.json').then(response => response.json()).then(data => setNodes(data.data.map((node, index) => ({posX: node[1], posY: node[0], group: node[2], id: index}))))
  }

  useEffect(()=>{
    getData()
  },[])

  const selectNode = (id) => {
    setNodes(
      nodes.map(node => 
      node.id === id? {...node, selected: true} : {...node, selected: false}
    ))
  }

  const current_user = {
    is_authenticated: true
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
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/search/answer" element={<Answer nodes={nodes} selectNode={selectNode} selectedNode={selectedNode}  />}/>
                      </Routes>
                    </div>
                {/* </div> */}
                {/* <div className="col-md-4">
                    <div className="content-section">
                        <h3>Our Sidebar</h3>
                        <p className="text-muted">You can put any info here</p>
                        <ul>
                            <li>Latest posts</li>
                            <li>Announcements</li>
                            <li>Calendars</li>
                            <li>etc</li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </main>
        <Footer/>
      </>
    );
  }

export default App;



