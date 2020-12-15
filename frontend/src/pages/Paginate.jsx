import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Paginate() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get(`http://localhost:8000/api/v1/restaurants/`);
    const data = res.data.restaurants;
    console.log(data);
    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((pd) => (
      <div key={pd.id}>
        <li>
          <p>{pd.name}</p>
          <p>{pd.address}</p>
        </li>

        {/* <img src={pd.picture} alt="" /> */}
      </div>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className="test">
      <ol>{data}</ol>

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Paginate;
