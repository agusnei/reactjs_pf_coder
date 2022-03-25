import {Link} from "react-router-dom";
import './NavBar.css'

const NavBar = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navBack">
            <div className="container-fluid">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{scrollHeight: "100px"}}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                            </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><Link className="nav-link" to="/category/men">Men's clothing</Link></li>
                            <li><Link className="nav-link" to="/category/women">Women's clothing</Link></li>
                        </ul>
                        </li>
                    </ul>
            </div>
        </nav>
    );
};
export default NavBar;