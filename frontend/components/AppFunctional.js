import React from "react";
import { useState } from "react";
import axios from "axios";
// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [konum, setKonum] = useState([2, 2]);
  const [message, setMessage] = useState("");
  const [adim, setAdim] = useState(0);
  const [input, setInput] = useState("");

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setKonum([2, 2]);
    setMessage("");
    setAdim(0);
    setInput("");
    //console.log(konum);
  }

  function yukari() {
    if (konum[1] > 1) {
      setKonum([konum[0], konum[1] - 1]);
      setAdim(adim + 1);
    } else {
      setMessage("Yukarıya gidemezsiniz");
    }
    //console.log(konum);
    //console.log(adim);
  }
  function assagi() {
    if (konum[1] < 3) {
      setKonum([konum[0], konum[1] + 1]);
      setAdim(adim + 1);
    } else {
      setMessage("Aşağıya gidemezsiniz");
    }
    //console.log(konum);
    //console.log(adim);
  }
  function sag() {
    if (konum[0] < 3) {
      setKonum([konum[0] + 1, konum[1]]);
      setAdim(adim + 1);
    } else {
      setMessage("Sağa gidemezsiniz");
    }
    console.log(konum);
  }
  function sol() {
    if (konum[0] > 1) {
      setKonum([konum[0] - 1, konum[1]]);
      setAdim(adim + 1);
    } else {
      setMessage("Sola gidemezsiniz");
    }
    console.log(konum);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setInput(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();

    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    axios
      .post("http://localhost:9000/api/result", {
        x: konum[0],
        y: konum[1],
        steps: adim,
        email: input,
      })
      .then(function (response) {
        setMessage(response.data.message);
        setInput("");
        //console.log(response.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  }
  const index = (konum[1] - 1) * 3 + konum[0] - 1;
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {`(${konum[0]}, ${konum[1]})`}</h3>
        <h3 id="steps">{adim} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={sol} id="left">
          SOL
        </button>
        <button onClick={yukari} id="up">
          YUKARI
        </button>
        <button onClick={sag} id="right">
          SAĞ
        </button>
        <button onClick={assagi} id="down">
          AŞAĞI
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
        ></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  );
}
