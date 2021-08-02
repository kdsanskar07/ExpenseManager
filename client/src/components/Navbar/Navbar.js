import React from 'react';
import styles from './Navbar.module.css';
import { AiFillHome, AiOutlineTransaction } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

    const getMenuButtons = () => {
        return (
            <MenuButton className={styles.MenuButtons}>
                <FaUserCircle />
            </MenuButton>
        );
    }

    return (
        <div className={styles.Navbar}>
            <div>
                <NavLink exact activeClassName={styles.ActiveLink} to='/'>
                    <AiFillHome />
                </NavLink>
            </div>
            <div>
                <NavLink exact activeClassName={styles.ActiveLink} to='/report'>
                    <GoGraph />
                </NavLink>
            </div>
            <div>
                <NavLink exact activeClassName={styles.ActiveLink} to='/addtransaction'>
                    <BiAddToQueue />
                </NavLink>
            </div>
            <div>
                <NavLink exact activeClassName={styles.ActiveLink} to='/mytransactions'>
                    <AiOutlineTransaction />
                </NavLink>
            </div>
            <div>
                <Menu direction="left" menuButton={getMenuButtons()}>
                    <MenuItem className={styles.MenuItems}>
                        Sign Out
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
