import {React,Component} from 'react';

class Footer extends Component{
  render(){
    return(
        <>
   
            <footer class="main-footer">
                <strong>Copyright &copy; {(new Date().getFullYear())}</strong> All rights reserved.
            </footer>

        </>
      );
    }
  }

export default Footer;