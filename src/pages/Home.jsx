import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";



function Home() {
    const { user } = useContext(AuthContext);
    const news = ["Noticia 1", "Noticia 2", "Noticia 3"];

    return (
        <div className="home">
            <h1>Noticias</h1>
            {user ? (
                <ul>
                    {news.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Por favor, inicia sección para ver las noticias.</p>
            )}
        </div>
    );
}

export default Home;