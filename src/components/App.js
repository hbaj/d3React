import Recipes from "./Recipes";
import snoopy from "../images/snoopy.jpg" ; //*************import images NOT working *************
import AllPeople from "./quest"
function App() {
    return (
        <>
            <section className = "snoopy">
                <main>
                    <section>
                        <h1> hola from react</h1>
                
                    </section>
                    <img src={snoopy} alt = "snoopy1" width= "250" />
                    <Recipes/>
                </main>
                
            </section>
            <AllPeople/>
        </>
    )
}

export default App
