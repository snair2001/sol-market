import "bootstrap/dist/css/bootstrap.min.css"
import NFT from "./NFT";
import css from "../styles/NFT.module.css"

function App() {

  let paths = []

  for (let i = 1; i <= 9; i++) {
    paths.push(require(`../images/${i}.png`))
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>The NFT marketplace</h1>
      <div className={css.wrapper}>
        {
          paths.map((img, i) => {
            return <NFT src={img} key={i} />
          })
        }
      </div>
    </div>
  );
}

export default App;
