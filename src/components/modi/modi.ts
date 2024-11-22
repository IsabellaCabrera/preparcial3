import { dispatch, appState } from "../../store";
import { navigate, getProductsAction } from "../../store/action";
import { Screens } from "../../types/store";
import { deleteSong } from "../../utils/firebase";

// Enumeración que define los atributos observados en el componente
export enum AttributeModi {
    "image" = "image",
    "titlesong" = "titlesong",
    "autor" = "autor",
    "price" = "price",
    "stock" = "stock",
   "idsong" ="idsong"
}

// Definición del componente personalizado `Modi`
class Modi extends HTMLElement {
    idsong?: string;
    image?: string;
    titlesong?: string;
    autor?: string;
    price?: number;
    stock?: number; 

 
// Observa los cambios en los atributos definidos en `AttributeModi`
    static get observedAttributes() {
        return Object.values(AttributeModi);
    }


 // Callback que se ejecuta cuando un atributo observado cambia

    attributeChangedCallback(propName: AttributeModi, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            
            case AttributeModi.price:
                this.price = newValue ? Number(newValue) : undefined;
                break;
                case AttributeModi.stock:
                    this.stock = newValue ? Number(newValue) : undefined;
                    break;
            default:
                this[propName] = newValue;
                break;
        }
        
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

 // Renderiza el contenido del componente en el Shadow DOM

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div class="song">
                    <div class="perfil">
                        <div id="img">
                            <img src="${this.image}" >
                        </div>
                        <div class="texts">
                            <p>${this.titlesong}</p>
                            <p id="autor">${this.autor}</p>
                        </div>
                    </div>
                    <p class="album">${this.price}</p>
                    <p class="duracion">${this.stock}</p>
                    <button id="edit">Editar</button>
                    <button id="delete">Delete</button>
                </div>
            `;


            // Botón para editar el producto
            const editButton = this.shadowRoot.querySelector("#edit");
            editButton?.addEventListener('click', () => this.selectProductForEdit(this.idsong));

            
            // Botón para eliminar el producto
            const deleteButton = this.shadowRoot.querySelector('#delete');
            deleteButton?.addEventListener('click', () => {
                this.deleteProduct(this.idsong); // Elimina el producto
                alert('Vinilo borrado')
            });
            
        }
        
        
    }

    // Método para seleccionar un producto y navegar a la pantalla de edición
    selectProductForEdit(productId: string | undefined) {
        if (productId) {
            const product = appState.products.find(p => p.id === productId);
            if (product) {
                appState.currentProduct = { ...product };
                dispatch(navigate(Screens.EDIT));  
            } else {
                console.error('Producto no encontrado');
            }
        }
    }

    // Método para eliminar un producto

    async deleteProduct(productId: string | undefined) {
        if (productId) {
            try {
                await deleteSong(productId); // Llama a `deleteSong` para eliminar el producto en Firebase
                const action = await getProductsAction(); // Obtiene la lista actualizada de productos
                dispatch(action); // Actualiza el estado global con los productos
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        } else {
            console.error('ID del producto no proporcionado para eliminar.');
        }
    }

}
// Define el nuevo elemento personalizado `modi-commponent` y lo registra en el navegador
customElements.define("modi-commponent", Modi);

// Exporta el componente para usarlo en otros módulos
export default Modi;