import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Home.css';

const ALTERNATIVE_IMAGE_URL = '/img/found404.png';

// URL de las API
const CATEGORIES_API_URL = 'https://sandbox.academiadevelopers.com/infosphere/categories/';


const Home = () => {
    const [newsAcademia, setNewsAcademia] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingAcademia, setLoadingAcademia] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorAcademia, setErrorAcademia] = useState(false);
    const [errorCategories, setErrorCategories] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch de la API de Academia
                const responseAcademia = await fetch('https://sandbox.academiadevelopers.com/infosphere/articles/');
                if (!responseAcademia.ok) throw new Error('Error en la solicitud de Academia');
                const dataAcademia = await responseAcademia.json();
                setNewsAcademia(dataAcademia.results || []);
            } catch (error) {
                setErrorAcademia(true);
            } finally {
                setLoadingAcademia(false);
            }


            try {
                // Fetch de la API de Categorías
                const responseCategories = await fetch(CATEGORIES_API_URL);
                if (!responseCategories.ok) throw new Error('Error en la solicitud de Categorías');
                const dataCategories = await responseCategories.json();
                setCategories(dataCategories.results || []);
            } catch (error) {
                setErrorCategories(true);
            } finally {
                setLoadingCategories(false);
            }
            
        };

        fetchNews();
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search');
        setSearchQuery(query || '');
    }, [location.search]);

    const filteredNews = (news) => 
        news.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="home-container">

            <div className="home-title">Últimas Noticias de Academia</div>
            {loadingAcademia && <div className="loading-message">Cargando noticias de Academia...</div>}
            {errorAcademia && <div className="error-message">Hubo un error al cargar las noticias de Academia.</div>}
            {!loadingAcademia && !errorAcademia && filteredNews(newsAcademia).length === 0 && <div className="no-news-message">No hay noticias de Academia disponibles.</div>}
            <div className="news-grid">
                {filteredNews(newsAcademia).map((item) => (
                    <div key={item.id} className="news-card">
                        <img
                            src={item.image || ALTERNATIVE_IMAGE_URL}
                            alt={item.title}
                            className="news-image"
                        />
                        <div className="news-content">
                            <h2 className="news-title">{item.title}</h2>
                            <p className="news-excerpt">{item.abstract || 'Resumen no disponible'}</p>
                            <a href={`/noticia/${item.id}`} className="news-link">Leer más</a>
                        </div>
                    </div>
                ))}
            </div>


            <div className="home-title">Categorías de Noticias</div>
            {loadingCategories && <div className="loading-message">Cargando categorías...</div>}
            {errorCategories && <div className="error-message">Hubo un error al cargar las categorías.</div>}
            {!loadingCategories && !errorCategories && categories.length === 0 && <div className="no-news-message">No hay categorías disponibles.</div>}
            <div className="news-grid">
                {categories.map((category) => (
                    <div key={category.id} className="news-card">
                        <div className="news-content">
                            <h2 className="news-title">{category.name}</h2>
                            <p className="news-excerpt">{category.description || 'Descripción no disponible'}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="view-more-link">
                <a href="/noticias">Ver más noticias</a>
            </div>
        </div>
    );
};

export default Home;
