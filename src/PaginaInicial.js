import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./index.css";

const PaginaInicial = () => {
  const [itemData, setItemData] = useState([]);
  const [carregar, setCarregar] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(0);

  const fetchData = async (page = 0) => {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&api_key=y0PUGwJ6cEmX2PDEEtjV3NzAUN2O5zEe9MaapzU7`
    );
    setItemData(response.data.near_earth_objects);
    setCarregar(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPaginaAtual(selectedPage);
    fetchData(selectedPage);
  };

  const formataData = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="App">
      <div className="container py-5">
        <div className="row mb-4 align-items-center">
          <div className="col-md-10">
            <h1>Objetos Próximos à Terra</h1>
            <p>Informações sobre asteróides que estão próximos à Terra.</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {itemData.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Tamanho estimado do asteróide:{" "}
                    {item.estimated_diameter.kilometers.estimated_diameter_min}{" "}
                    km -{" "}
                    {item.estimated_diameter.kilometers.estimated_diameter_max}{" "}
                    km
                  </p>
                  <p className="card-text">
                    Data de observação:{" "}
                    {formataData(item.orbital_data.first_observation_date)} até{" "}
                    {formataData(item.orbital_data.last_observation_date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          pageCount={itemData.length}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default PaginaInicial;
