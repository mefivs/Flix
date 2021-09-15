import React from 'react'
import './Header.scss';

export default function Header({black}:any) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                </a>
            </div>
            <div className="user">
                <a href="/">
                    <img src="https://avatars.githubusercontent.com/u/54649440?v=4" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}