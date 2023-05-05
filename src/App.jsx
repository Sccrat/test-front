import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import agua from './assets/agua.png';
import soda from './assets/soda.png';
import jugo from './assets/jugo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';



function App() {
  const [count, setCount] = useState(0)
  const [shop, setShop] = useState({ producto: "", price: 0 })
  const [showI, setInfo] = useState(false)
  const [showAlert, setAlert] = useState(true)
  const [datos, setDatos] = useState();
  const disabledI = true;
  const url = "http://127.0.0.1:8000/api/getProducts";
  const fetchApi = async () => {
    const response = await fetch(url);
    // console.log(response);
    const responseJSON = await response.json();
    setDatos(responseJSON);
    console.log(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  console.log(shop);

  function buyProduct(e) {
    e.preventDefault();

    setInfo(true);
    setAlert(false);
    fetch("http://127.0.0.1:8000/api/createP", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(shop), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }



  function buyOtherProduct(e) {
    e.preventDefault();
    setInfo(false);
    setShop({});
    setCount(0);
    setAlert(true);
  }



  return (

    <div className="row">
      <div className="col-md-6" >
        <table className="table table-bordered">
          <thead style={{
            backgroundColor: "#333",
            color: "#fff"
          }}>
            <tr>
              <th colSpan="2" style={{ textAlign: "center" }}>Vending Machine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width={"1%"} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShop({ product: "water", price: 0.65 })}> <div><img src={agua} alt="Water" />

              </div> <div><span> <strong>0.65</strong></span></div> </td>
              <td width={"1%"} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShop({ product: "soda", price: 1.50 })}> <div><img src={soda} alt="Soda" />

              </div> <div><span> <strong>1.50</strong> </span></div> </td>

            </tr>
            <tr>
              <td width={"1%"} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShop({ product: "Juice", price: 1.00 })}> <div><img src={jugo} alt="Juice" />

              </div> <div><span> <strong>1.00</strong> </span></div> </td>
              <td width={"1%"} style={{ textAlign: "center" }}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        {shop.product !== undefined ? <Alert key="dark" style={{ marginTop: "5%" }} show={showI} variant="dark">
          your purchase was:{' ' + shop.product + ' ,'}your cash back is:{((count) - (shop.price)) < 0 ? ((count) - (shop.price)) * -1 : ((count) - (shop.price))} <Button variant="warning" style={{ width: "20%" }} onClick={buyOtherProduct}>Buy again</Button>
        </Alert> : <Alert key="dark" style={{ marginTop: "5%" }} show={showI} variant="dark">
          Select a product first
        </Alert>}

        <table style={{ position: "absolute", top: "20%" }}>

          <thead>
            <tr>
              <th colSpan="2" style={{
                textAlign: "center", backgroundColor: "#333",
                color: "#fff"
              }}>Insert Coin</th>
            </tr>
            <tr ><textarea className="form-control" style={{ marginLeft: "40%", fontSize: "20px", textAlign: "center" }} id="exampleFormControlTextarea1" disabled value={count} ></textarea></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "black", width: "10px" }}><Button variant="info" onClick={() => setCount(count + 0.05)}>0.05</Button></td>
              <td style={{ color: "black" }}><Button variant="info" onClick={() => setCount(count + 0.10)}>0.10</Button></td>
            </tr>
            <tr>
              <td style={{ color: "black" }}><Button variant="info" onClick={() => setCount(count + 0.25)}>0.25</Button></td>
              <td style={{ color: "black" }}><Button variant="info" onClick={() => setCount(count + 1)}>1</Button></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ color: "black" }}><Button variant="primary" disabled={!showAlert} style={{ width: "100%" }} onClick={buyProduct}>Buy</Button></td>
            </tr>
          </tbody>
          <tfoot> <td colSpan="2"><Button variant="danger" disabled={!showAlert} onClick={() => setCount(0)}>return coins</Button></td> </tfoot>
        </table>
      </div>
    </div >


  )
}

export default App
