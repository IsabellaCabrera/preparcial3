import { editSong } from "../../utils/firebase";
import { appState, dispatch } from "../../store";
import { navigate } from "../../store/action";
import { Screens } from "../../types/store";

// Objeto para almacenar temporalmente los datos editados del producto

const editpr = {
    albumname: '',
	author: '',
	price: '',
    stock: '',
	image: '',
}
class EditP extends HTMLElement {
   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

// Método llamado automáticamente cuando el elemento es agregado al DOM

    connectedCallback() {
        this.render();  // Renderiza el contenido inicial del componente
        this.setInputValues(); // Asigna los valores actuales del producto a los campos del formulario
    }

// Asigna los valores actuales del producto a los inputs del formulario

    setInputValues() {
        const currentProduct = appState.currentProduct;
        if (currentProduct && this.shadowRoot) {
            // Asignando el nombre del álbum y el autor
            (this.shadowRoot.querySelector('#albumName') as HTMLInputElement).value = currentProduct.albumname;
            (this.shadowRoot.querySelector('#artistName') as HTMLInputElement).value = currentProduct.author;
    
            // Asegurando que los valores de precio y stock sean cadenas antes de asignarlos
            (this.shadowRoot.querySelector('#price') as HTMLInputElement).value = currentProduct.price.toString(); 
            (this.shadowRoot.querySelector('#stock') as HTMLInputElement).value = currentProduct.stock.toString(); 
    
            // Asignando la imagen
            (this.shadowRoot.querySelector('#imageLink') as HTMLInputElement).value = currentProduct.image;
        }
    }

    // Métodos para manejar cambios en los inputs del formulario

    changeTitle(e: any)  {
        editpr.albumname = e.target.value;
    }
    changeAutor(e: any)  {
        editpr.author = e.target.value;
    }
    changePrice(e: any)  {
        editpr.price = e.target.value;
    }

    changeStock(e: any)  {
        editpr.stock = e.target.value;
    }
    changeImage(e: any) {
        editpr.image = e.target.value;
       
    }

    // Maneja el envío del formulario

    submitForm() {
        if (appState.currentProduct?.id) { // Verifica que el producto tenga un ID válido
            editSong(appState.currentProduct.id, editpr);    // Llama a `editSong` para actualizar el producto en la base de datos
            alert('Vinilo actualizado');
            dispatch(navigate(Screens.HOME)); // Navega a la pantalla principal
        } else {
            console.error('No hay un ID válido de producto para actualizar');
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input type="text" id="albumName" placeholder="Enter album name">
                     <input type="text" id="artistName" placeholder="Enter artist name">
                      <input type="number" id="price" placeholder="Enter price" >
                      <input type="number" id="stock" placeholder="Enter stock quantity">
                       <input type="text" id="imageLink" placeholder="Enter image URL">
                    <button id="submitButton" type="submit">Save Changes</button>
                    <button id="cancel" type="submit">Cancel</button>
                </div>
            `;

         // Asigna eventos a los botones y campos de entrada

            const buttonSubmit = this.shadowRoot?.querySelector("#submitButton")as HTMLButtonElement;
            buttonSubmit.addEventListener('click', this.submitForm);

            const songTitle = this.shadowRoot?.querySelector("#albumName") as HTMLInputElement;
            songTitle.addEventListener('change', this.changeTitle);

            const songArtist = this.shadowRoot?.querySelector("#artistName") as HTMLInputElement;
            songArtist.addEventListener('change', this.changeAutor);

            const songAlbum = this.shadowRoot?.querySelector("#price") as HTMLInputElement;
            songAlbum.addEventListener('change', this.changePrice);

            const songDuration = this.shadowRoot?.querySelector("#stock") as HTMLInputElement;
            songDuration.addEventListener('change', this.changeStock);

            const songImage = this.shadowRoot?.querySelector("#imageLink") as HTMLInputElement;
            songImage.addEventListener('change', this.changeImage);

            const cancelButton = this.shadowRoot?.querySelector('#cancel')
            cancelButton?.addEventListener('click', () => {
               alert('Edicion cancelada')
               dispatch(navigate(Screens.MODIFICAR))
            });
        }
        
    }
}

// Define el nuevo elemento personalizado `edit-commponent` y lo registra en el navegador

customElements.define("edit-commponent", EditP);

// Exporta el componente para usarlo en otros módulos

export default EditP;