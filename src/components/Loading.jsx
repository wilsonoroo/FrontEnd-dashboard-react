export default function Loading() {
  // Loader bootstrap
  return (
    <div className="d-flex w-100 justify-content-center">
      {/* <img src={'../assets/loading.gif'} width={"10%"}/> */}
      <div className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
