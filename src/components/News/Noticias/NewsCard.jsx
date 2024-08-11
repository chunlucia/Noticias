import useFetchet from "../../../hooks/useFetch";
import DeleteNewsModal from "./DeleteNewsModal";
import { useState } from "react";

function NewsCard({ news, user_ID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();

    return (
        <div className={`card has-background-dark columns my-1 mx-2`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {news.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="has-text-white">
                        {news.summary}
                    </p>
                </div>
            </div>
            {news.owner == user_ID ? (
                <div className="column" onClick={() => setIsModalOpen(true)}>
                    <button className="button is-danger">Eliminar</button>
                </div>
            ) : null}
            {isModalOpen ? (
                <DeleteNewsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    news_id={news.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            ) : null}
        </div>
    );
}

export default NewsCard;