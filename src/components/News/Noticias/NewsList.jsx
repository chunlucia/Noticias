import React, { useEffect, useState, useRef } from "react";
import NewsCard from "./NewsCard";
import { useAuth } from "../../../contexts/AuthContext";

function NewsList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com//infosphere/articles/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las noticias.</p>;
    if (!data) return <p>No hay noticias disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Noticias</h2>
                <ul>
                    {data.map((news) => (
                        <div key={news.id} className="column is-two-third">
                            <NewsCard news={news} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NewsList;