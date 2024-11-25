import { useSelector, useDispatch } from "react-redux";


function Owner() {
  const spots = useSelector((state) => state.spots);



  return (
    <div>
      <h1>In the owner/ current spots owned page</h1>
    </div>
  )

}

export default Owner