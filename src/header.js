import {React,Component} from 'react';
import {Link,Redirect} from 'react-router-dom';

class Header extends Component{
  state={
    logout_flag:false
  }

  logout = () => {
    localStorage.clear();
    this.setState({logout_flag:true})
  };

  render(){
    return(
        <>
        {this.state.logout_flag ? (
          <Redirect to="/" />
        ) : (
          <div class="wrapper">
              <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                  <ul class="navbar-nav">
                    <li class="nav-item d-none d-sm-inline-block">
                      <Link to="#!"><a href="#!" onClick={this.logout} class="nav-link logoutBtn"><i class="fa fa-sign-out-alt"></i> Logout</a></Link>
                    </li>
                  </ul>
              </nav>
            </div>)}
        </>
      );
    }
  }

export default Header;