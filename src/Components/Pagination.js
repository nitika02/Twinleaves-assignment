import Button from '@mui/material/Button';
  function Pagination({total, currentPage, handlePage, handlePagePrev}) {
    return (
      <div style={{display: "flex", justifyContent: "center", gap: "30px", marginTop: "40px"}}>
        <Button variant="contained" size="small" onClick={handlePagePrev} disabled={currentPage === 1}>Prev</Button>
        <p>{currentPage}</p>
        <Button variant="contained" size="small" onClick={handlePage} disabled={currentPage === total}>Next</Button>
      </div>
    )
  }
  
  export default Pagination;
