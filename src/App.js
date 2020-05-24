import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadRepositories = async () => {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    };

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = { title: `teste-${new Date().getMilliseconds()}` };

    const response = await api.post("/repositories", newRepository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepos = repositories.filter((repo) => repo.id !== id);

    setRepositories(filteredRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
