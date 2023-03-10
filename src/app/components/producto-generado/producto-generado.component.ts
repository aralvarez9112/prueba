import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/entidades/Producto';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-producto-generado',
  templateUrl: './producto-generado.component.html',
  styleUrls: ['./producto-generado.component.css']
})
export class ProductoGeneradoComponent implements OnInit {
  imgURL: string
  gtin: string;
  producto: Producto = new Producto();
  mercadoObjetivo = '';
  contenidoNeto = '';
  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.imgURL = "./assets/images/no-image.png";

    this.empresaService.getEmpresa().subscribe(empresa => {
      if (empresa != null) {
        this.activatedRoute.queryParams.subscribe(params => {
          this.gtin = params['gtin'];
        });
        if (this.gtin != null) {
          this.empresaService.obtenerProducto(empresa.rut, this.gtin).subscribe(resp => {
            this.producto = resp.data;
          }, error => {
            console.log(error)
            this.router.navigate(['/pagina/inicio']);
          })
        }else{
          this.router.navigate(['/pagina/inicio']);
        }
       }else{
        this.router.navigate(['/pagina/inicio']);
      }
    })
  }

  generarCodigoBarra() {
    this.showLoader(true);
    //Variable para mostrar las barras:
    const resultBlock = document.getElementById("resultBlock");
    const imageBars = document.getElementById("image");
    const donwloadLink = document.getElementById("downloadLink");
    //API Key obtenida de https://app.pdf.co/
    var apiKey = "hsagastume@gs1uy.org_e4d92b004cd5552f9c1f48abc2aba6bc04adb76895939f294f2d7028c275e9af37a973fe";
    if (apiKey == "") {
      alert("API Key should not be empty.");
      return false;
    }
    // Get barcode type
    var barcodeType = "EAN13";
    // Get barcode value
    var inputValue = this.producto.gtin;
    if (inputValue == null) {
      alert("Barcode Value should not be empty.");
      return false;
    }

    // Prepare URL
    var url = "https://api.pdf.co/v1/barcode/generate?name=barcode.png";
    url += "&type=" + barcodeType; // Set barcode type (symbology)
    url += "&value=" + inputValue; // Set barcode value

    // Prepare request
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("x-api-key", apiKey); // set API Key
    // Asynchronous response handler
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4) {
        // If OK
        if (httpRequest.status == 200) {
          var result = JSON.parse(httpRequest.responseText);
          if (result.error == false) {
            console.log(result.url);
            if (resultBlock != null && imageBars != null && donwloadLink != null) {
              resultBlock.style.display = "block"; // show hidden resultBlock
              imageBars.setAttribute("src", result.url); // Set image link to display
              donwloadLink.setAttribute("href", result.url);
            }
          }
          else {
            console.log("Error con API Barras!");
          }
        }
        // Else display error
        else {
          console.log("Errorrr!!!!!");
          //document.getElementById("errorBlock").style.display = "block"; // show hidden errorBlock
          //document.getElementById("error").innerHTML = "Request failed. Please check you use the correct API key.";
        }
        var loader = document.getElementById("loader");
        if (loader != null) {
          loader.style.display = "none";
        }
      }
    }

    // Send request
    httpRequest.send();

    return true;
  }
  showLoader(isDisplay: boolean) {
    var loader = document.getElementById("loader");

    if (isDisplay && loader != null) {
      loader.style.display = "";
    }
    else if (loader != null) {
      loader.style.display = "none";
    }
  }
}
