import {React,Component} from 'react';
import { Link,withRouter } from 'react-router-dom';  
class Sidebar extends Component{
  render(){
    return(
        <>    
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
              <a href="#!" class="brand-link">
              {/* <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
              style={{opacity: .8}}/> */}
              </a>
              <div class="sidebar">
                  <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    {/* <div class="image">
                      <img src="../dist/img/logo.png" class="img-circle elevation-2" alt="User" />
                    </div> */}
                    <div class="info" style={{color:'white'}}>Survey Component</div>
                  </div>
                  <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li name="dashboard" class="nav-item has-treeview" title="Dashboard">
                          <Link to="/dashboard">
                            <a name="dashboard" href="#!" class="nav-link">
                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </a>
                            </Link>
                        </li>
                    </ul>
                  </nav>
              </div>
            </aside>

        </>
      );
    }
  }

export default withRouter(Sidebar)