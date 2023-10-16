import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
    csvFile: null,
    mappingFile: null,
    ontologyFile: null,
    csvEncode: "",
    csvSeparator: "",
    rdfFormat: "",
    rdfEncode: "",
    ontologyFormat: "",
    idExec: uuidv4(),
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("csv-file", formData.csvFile);
    formDataToSend.append("mapping-file", formData.mappingFile);
    formDataToSend.append("ontology-file", formData.ontologyFile);

    formDataToSend.append("csvEncode", formData.csvEncode);
    formDataToSend.append("csvSeparator", formData.csvSeparator);
    formDataToSend.append("rdfFormat", formData.rdfFormat);
    formDataToSend.append("rdfEncode", formData.rdfEncode);
    formDataToSend.append("ontologyFormat", formData.ontologyFormat);
    formDataToSend.append("id-exec", formData.idExec);

    try {
      const response = await axios.post(
        "http://localhost:5000/get_rdf_file",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="App">
      <h1>Formulário de Requisição POST</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Arquivo CSV: </label>
          <input
            type="file"
            name="csv-file"
            onChange={(e) =>
              setFormData({ ...formData, csvFile: e.target.files[0] })
            }
          />
        </div>
        <br></br>
        <div>
          <label>Arquivo de Mapeamento:</label>
          <input
            type="file"
            name="mapping-file"
            onChange={(e) =>
              setFormData({ ...formData, mappingFile: e.target.files[0] })
            }
          />
        </div>
        {/* Adicione os outros campos de seleção de arquivos aqui */}
        <div>
          <label>CSV Encode:</label>
          <input
            type="text"
            name="csvEncode"
            value={formData.csvEncode}
            onChange={(e) =>
              setFormData({ ...formData, csvEncode: e.target.value })
            }
          />
        </div>
        <div>
          <label>CSV Separator:</label>
          <input
            type="text"
            name="csvSeparator"
            value={formData.csvSeparator}
            onChange={(e) =>
              setFormData({ ...formData, csvSeparator: e.target.value })
            }
          />
        </div>
        {/* Adicione os outros campos de escrita aqui */}
        <div>
          <label>ID Exec:</label>
          <input
            type="text"
            name="id-exec"
            value={formData.idExec}
            onChange={(e) =>
              setFormData({ ...formData, idExec: e.target.value })
            }
          />
        </div>
        <button type="submit">Enviar Requisição</button>
      </form>
      {response && (
        <div>
          <h2>Resposta da API:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
