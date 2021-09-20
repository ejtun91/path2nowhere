import { useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import ReactPaginate from "react-paginate";

const Posts = ({ posts }) => {
  const [perPage, setPerPage] = useState(posts.slice(0, 6));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayPosts = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((p) => {
      return <Post post={p} />;
    });

  const pageCount = Math.ceil(posts.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="posts">
      {displayPosts}
      <div className="pagButtons">
        <ReactPaginate
          previousLabel={"PREVIOUS"}
          nextLabel={"NEXT"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default Posts;
