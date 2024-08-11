import React, { useState } from 'react';


const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]); // Array de IDs de categorías seleccionadas
  const [tags, setTags] = useState([]); // Array de IDs de etiquetas seleccionadas
  const [error, setError] = useState('');

  const handleCreateArticle = async () => {
    try {
      // Paso 1: Crear el artículo
      const articleResponse = await axios.post('/api/articles', { title, content });
      const articleId = articleResponse.data.id;

      // Paso 2: Asociar categorías con el artículo
      for (const categoryId of categories) {
        await axios.post(`/api/articles/${articleId}/categories`, { categoryId });
      }

      // Paso 3: Asociar etiquetas con el artículo
      for (const tagId of tags) {
        await axios.post(`/api/articles/${articleId}/tags`, { tagId });
      }

      console.log('Article created successfully with categories and tags');
    } catch (error) {
      setError(`Failed to create article: ${error.response ? error.response.data.message : 'Unknown error'}`);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={(e) => { e.preventDefault(); handleCreateArticle(); }}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label>Categories:</label>
          {/* Aquí podrías implementar un selector de categorías */}
        </div>
        <div>
          <label>Tags:</label>
          {/* Aquí podrías implementar un selector de etiquetas */}
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
