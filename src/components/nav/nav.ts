import { dispatch } from '../../store/index'
import { Screens } from '../../types/store';
import { navigate } from '../../store/action';

// Definición de un componente personalizado `Nav`

class Nav extends HTMLElement {
   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    // Método para renderizar el contenido del componente

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
              
                    <h1>Vinyl Store</h1>
                    <p id="home">Home</p>
                    <p id="add">Add New Product</p>
                    <p id="edit">Modify Products</p>
              
          
            `;
// Botón para navegar a la pantalla de modificación

            const edit = this.shadowRoot?.querySelector('#edit')
            edit?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.MODIFICAR)); // Cambia la pantalla a "MODIFICAR"
            })

// Botón para navegar a la pantalla principal

            const home = this.shadowRoot?.querySelector('#home')
            home?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.HOME)); // Cambia la pantalla a "HOME"
            })

// Botón para navegar a la pantalla de añadir un nuevo producto

            const add = this.shadowRoot?.querySelector('#add')
            add?.addEventListener('click', () =>  {
                dispatch(navigate(Screens.ADD));  // Cambia la pantalla a "ADD"
            })

        }
        
    }
}

customElements.define("nav-commponent", Nav);
export default Nav;