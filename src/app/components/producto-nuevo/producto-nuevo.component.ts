import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Bricks } from 'src/app/entidades/Bricks';
import { ContenidoNeto } from 'src/app/entidades/ContenidoNeto';
import { Empresa } from 'src/app/entidades/Empresa';
import { Marca } from 'src/app/entidades/Marca';
import { ParamProducto } from 'src/app/entidades/ParamProducto';
import { Producto } from 'src/app/entidades/Producto';
import { TipoAccion } from 'src/app/entidades/TipoAccion';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UtilService } from 'src/app/services/util.service';
import { ToastService as ToastrService } from 'src/app/services/toastr.service';
import { AppConfig } from 'src/app/app.config';
import { Pais } from 'src/app/entidades/Pais';
import { Codigo } from 'src/app/entidades/Codigo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalSeleccionCodigoComponent } from '../modals/modal-seleccion-codigo/modal-seleccion-codigo.component';
import { ModalAltaSiguienteComponent } from '../modals/modal-alta-siguiente/modal-alta-siguiente.component';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {
  @ViewChild('fileUpload') imageChild: ElementRef;
  esBorrador: boolean = false;
  marcas: Marca[] = []
  subMarcas: Marca[] = [];
  unidadesMedidas: string[] = ['EA', 'kg', 'g', 'mg', 'ug', 'ml', 'l', 'cc', 'm3']
  countries: Pais[] = [{ nombre: "Afganistan", codigo: "AF" },
  { nombre: "Albania", codigo: "AL" },
  { nombre: "Algeria", codigo: "DZ" },
  { nombre: "American Samoa", codigo: "AS" },
  { nombre: "Andorra", codigo: "AD" },
  { nombre: "Angola", codigo: "AO" },
  { nombre: "Anguilla", codigo: "AI" },
  { nombre: "Antarctica", codigo: "AQ" },
  { nombre: "Antigua and Barbuda", codigo: "AG" },
  { nombre: "Argentina", codigo: "AR" },
  { nombre: "Armenia", codigo: "AM" },
  { nombre: "Aruba", codigo: "AW" },
  { nombre: "Australia", codigo: "AU" },
  { nombre: "Austria", codigo: "AT" },
  { nombre: "Azerbaijan", codigo: "AZ" },
  { nombre: "Bahamas (the)", codigo: "BS" },
  { nombre: "Bahrain", codigo: "BH" },
  { nombre: "Bangladesh", codigo: "BD" },
  { nombre: "Barbados", codigo: "BB" },
  { nombre: "Belarus", codigo: "BY" },
  { nombre: "Belgium", codigo: "BE" },
  { nombre: "Belize", codigo: "BZ" },
  { nombre: "Benin", codigo: "BJ" },
  { nombre: "Bermuda", codigo: "BM" },
  { nombre: "Bhutan", codigo: "BT" },
  { nombre: "Bolivia (Plurinational State of)", codigo: "BO" },
  { nombre: "Bonaire, Sint Eustatius and Saba", codigo: "BQ" },
  { nombre: "Bosnia and Herzegovina", codigo: "BA" },
  { nombre: "Botswana", codigo: "BW" },
  { nombre: "Bouvet Island", codigo: "BV" },
  { nombre: "Brazil", codigo: "BR" },
  { nombre: "British Indian Ocean Territory (the)", codigo: "IO" },
  { nombre: "Brunei Darussalam", codigo: "BN" },
  { nombre: "Bulgaria", codigo: "BG" },
  { nombre: "Burkina Faso", codigo: "BF" },
  { nombre: "Burundi", codigo: "BI" },
  { nombre: "Cabo Verde", codigo: "CV" },
  { nombre: "Cambodia", codigo: "KH" },
  { nombre: "Cameroon", codigo: "CM" },
  { nombre: "Canada", codigo: "CA" },
  { nombre: "Cayman Islands (the)", codigo: "KY" },
  { nombre: "Central African Republic (the)", codigo: "CF" },
  { nombre: "Chad", codigo: "TD" },
  { nombre: "Chile", codigo: "CL" },
  { nombre: "China", codigo: "CN" },
  { nombre: "Christmas Island", codigo: "CX" },
  { nombre: "Cocos (Keeling) Islands (the)", codigo: "CC" },
  { nombre: "Colombia", codigo: "CO" },
  { nombre: "Comoros (the)", codigo: "KM" },
  { nombre: "Congo (the Democratic Republic of the)", codigo: "CD" },
  { nombre: "Congo (the)", codigo: "CG" },
  { nombre: "Cook Islands (the)", codigo: "CK" },
  { nombre: "Costa Rica", codigo: "CR" },
  { nombre: "Croatia", codigo: "HR" },
  { nombre: "Cuba", codigo: "CU" },
  { nombre: "Curaçao", codigo: "CW" },
  { nombre: "Cyprus", codigo: "CY" },
  { nombre: "Czechia", codigo: "CZ" },
  { nombre: "Côte d'Ivoire", codigo: "CI" },
  { nombre: "Denmark", codigo: "DK" },
  { nombre: "Djibouti", codigo: "DJ" },
  { nombre: "Dominica", codigo: "DM" },
  { nombre: "Dominican Republic (the)", codigo: "DO" },
  { nombre: "Ecuador", codigo: "EC" },
  { nombre: "Egypt", codigo: "EG" },
  { nombre: "El Salvador", codigo: "SV" },
  { nombre: "Equatorial Guinea", codigo: "GQ" },
  { nombre: "Eritrea", codigo: "ER" },
  { nombre: "Estonia", codigo: "EE" },
  { nombre: "Eswatini", codigo: "SZ" },
  { nombre: "Ethiopia", codigo: "ET" },
  { nombre: "Falkland Islands (the) [Malvinas]", codigo: "FK" },
  { nombre: "Faroe Islands (the)", codigo: "FO" },
  { nombre: "Fiji", codigo: "FJ" },
  { nombre: "Finland", codigo: "FI" },
  { nombre: "France", codigo: "FR" },
  { nombre: "French Guiana", codigo: "GF" },
  { nombre: "French Polynesia", codigo: "PF" },
  { nombre: "French Southern Territories (the)", codigo: "TF" },
  { nombre: "Gabon", codigo: "GA" },
  { nombre: "Gambia (the)", codigo: "GM" },
  { nombre: "Georgia", codigo: "GE" },
  { nombre: "Germany", codigo: "DE" },
  { nombre: "Ghana", codigo: "GH" },
  { nombre: "Gibraltar", codigo: "GI" },
  { nombre: "Greece", codigo: "GR" },
  { nombre: "Greenland", codigo: "GL" },
  { nombre: "Grenada", codigo: "GD" },
  { nombre: "Guadeloupe", codigo: "GP" },
  { nombre: "Guam", codigo: "GU" },
  { nombre: "Guatemala", codigo: "GT" },
  { nombre: "Guernsey", codigo: "GG" },
  { nombre: "Guinea", codigo: "GN" },
  { nombre: "Guinea-Bissau", codigo: "GW" },
  { nombre: "Guyana", codigo: "GY" },
  { nombre: "Haiti", codigo: "HT" },
  { nombre: "Heard Island and McDonald Islands", codigo: "HM" },
  { nombre: "Holy See (the)", codigo: "VA" },
  { nombre: "Honduras", codigo: "HN" },
  { nombre: "Hong Kong", codigo: "HK" },
  { nombre: "Hungary", codigo: "HU" },
  { nombre: "Iceland", codigo: "IS" },
  { nombre: "India", codigo: "IN" },
  { nombre: "Indonesia", codigo: "ID" },
  { nombre: "Iran (Islamic Republic of)", codigo: "IR" },
  { nombre: "Iraq", codigo: "IQ" },
  { nombre: "Ireland", codigo: "IE" },
  { nombre: "Isle of Man", codigo: "IM" },
  { nombre: "Israel", codigo: "IL" },
  { nombre: "Italy", codigo: "IT" },
  { nombre: "Jamaica", codigo: "JM" },
  { nombre: "Japan", codigo: "JP" },
  { nombre: "Jersey", codigo: "JE" },
  { nombre: "Jordan", codigo: "JO" },
  { nombre: "Kazakhstan", codigo: "KZ" },
  { nombre: "Kenya", codigo: "KE" },
  { nombre: "Kiribati", codigo: "KI" },
  { nombre: "Korea (the Democratic People's Republic of)", codigo: "KP" },
  { nombre: "Korea (the Republic of)", codigo: "KR" },
  { nombre: "Kuwait", codigo: "KW" },
  { nombre: "Kyrgyzstan", codigo: "KG" },
  { nombre: "Lao People's Democratic Republic (the)", codigo: "LA" },
  { nombre: "Latvia", codigo: "LV" },
  { nombre: "Lebanon", codigo: "LB" },
  { nombre: "Lesotho", codigo: "LS" },
  { nombre: "Liberia", codigo: "LR" },
  { nombre: "Libya", codigo: "LY" },
  { nombre: "Liechtenstein", codigo: "LI" },
  { nombre: "Lithuania", codigo: "LT" },
  { nombre: "Luxembourg", codigo: "LU" },
  { nombre: "Macao", codigo: "MO" },
  { nombre: "Madagascar", codigo: "MG" },
  { nombre: "Malawi", codigo: "MW" },
  { nombre: "Malaysia", codigo: "MY" },
  { nombre: "Maldives", codigo: "MV" },
  { nombre: "Mali", codigo: "ML" },
  { nombre: "Malta", codigo: "MT" },
  { nombre: "Marshall Islands (the)", codigo: "MH" },
  { nombre: "Martinique", codigo: "MQ" },
  { nombre: "Mauritania", codigo: "MR" },
  { nombre: "Mauritius", codigo: "MU" },
  { nombre: "Mayotte", codigo: "YT" },
  { nombre: "Mexico", codigo: "MX" },
  { nombre: "Micronesia (Federated States of)", codigo: "FM" },
  { nombre: "Moldova (the Republic of)", codigo: "MD" },
  { nombre: "Monaco", codigo: "MC" },
  { nombre: "Mongolia", codigo: "MN" },
  { nombre: "Montenegro", codigo: "ME" },
  { nombre: "Montserrat", codigo: "MS" },
  { nombre: "Morocco", codigo: "MA" },
  { nombre: "Mozambique", codigo: "MZ" },
  { nombre: "Myanmar", codigo: "MM" },
  { nombre: "Namibia", codigo: "NA" },
  { nombre: "Nauru", codigo: "NR" },
  { nombre: "Nepal", codigo: "NP" },
  { nombre: "Netherlands (the)", codigo: "NL" },
  { nombre: "New Caledonia", codigo: "NC" },
  { nombre: "New Zealand", codigo: "NZ" },
  { nombre: "Nicaragua", codigo: "NI" },
  { nombre: "Niger (the)", codigo: "NE" },
  { nombre: "Nigeria", codigo: "NG" },
  { nombre: "Niue", codigo: "NU" },
  { nombre: "Norfolk Island", codigo: "NF" },
  { nombre: "Northern Mariana Islands (the)", codigo: "MK" },
  { nombre: "Norway", codigo: "MP" },
  { nombre: "Oman", codigo: "NO" },
  { nombre: "Pakistan", codigo: "OM" },
  { nombre: "Palau", codigo: "PK" },
  { nombre: "Palestine, State of", codigo: "PW" },
  { nombre: "Panama", codigo: "PS" },
  { nombre: "Papua New Guinea", codigo: "PA" },
  { nombre: "Paraguay", codigo: "PG" },
  { nombre: "Peru", codigo: "PY" },
  { nombre: "Philippines (the)", codigo: "PE" },
  { nombre: "Pitcairn", codigo: "PH" },
  { nombre: "Poland", codigo: "PN" },
  { nombre: "Portugal", codigo: "PL" },
  { nombre: "Puerto Rico", codigo: "PT" },
  { nombre: "Qatar", codigo: "PR" },
  { nombre: "Republic of North Macedonia", codigo: "QA" },
  { nombre: "Romania", codigo: "RO" },
  { nombre: "Russian Federation (the)", codigo: "RU" },
  { nombre: "Rwanda", codigo: "RW" },
  { nombre: "Réunion", codigo: "RE" },
  { nombre: "Saint Barthélemy", codigo: "BL" },
  { nombre: "Saint Helena, Ascension and Tristan da Cunha", codigo: "SH" },
  { nombre: "Saint Kitts and Nevis", codigo: "KN" },
  { nombre: "Saint Lucia", codigo: "LC" },
  { nombre: "Saint Martin (French part)", codigo: "MF" },
  { nombre: "Saint Pierre and Miquelon", codigo: "PM" },
  { nombre: "Saint Vincent and the Grenadines", codigo: "VC" },
  { nombre: "Samoa", codigo: "WS" },
  { nombre: "San Marino", codigo: "SM" },
  { nombre: "Sao Tome and Principe", codigo: "ST" },
  { nombre: "Saudi Arabia", codigo: "SA" },
  { nombre: "Senegal", codigo: "SN" },
  { nombre: "Serbia", codigo: "RS" },
  { nombre: "Seychelles", codigo: "SC" },
  { nombre: "Sierra Leone", codigo: "SL" },
  { nombre: "Singapore", codigo: "SG" },
  { nombre: "Sint Maarten (Dutch part)", codigo: "SX" },
  { nombre: "Slovakia", codigo: "SK" },
  { nombre: "Slovenia", codigo: "SI" },
  { nombre: "Solomon Islands", codigo: "SB" },
  { nombre: "Somalia", codigo: "SO" },
  { nombre: "South Africa", codigo: "ZA" },
  { nombre: "South Georgia and the South Sandwich Islands", codigo: "GS" },
  { nombre: "South Sudan", codigo: "SS" },
  { nombre: "Spain", codigo: "ES" },
  { nombre: "Sri Lanka", codigo: "LK" },
  { nombre: "Sudan (the)", codigo: "SD" },
  { nombre: "Suriname", codigo: "SR" },
  { nombre: "Svalbard and Jan Mayen", codigo: "SJ" },
  { nombre: "Sweden", codigo: "SE" },
  { nombre: "Switzerland", codigo: "CH" },
  { nombre: "Syrian Arab Republic", codigo: "SY" },
  { nombre: "Taiwan", codigo: "TW" },
  { nombre: "Tajikistan", codigo: "TJ" },
  { nombre: "Tanzania, United Republic of", codigo: "TZ" },
  { nombre: "Thailand", codigo: "TH" },
  { nombre: "Timor-Leste", codigo: "TL" },
  { nombre: "Togo", codigo: "TG" },
  { nombre: "Tokelau", codigo: "TK" },
  { nombre: "Tonga", codigo: "TO" },
  { nombre: "Trinidad and Tobago", codigo: "TT" },
  { nombre: "Tunisia", codigo: "TN" },
  { nombre: "Turkey", codigo: "TM" },
  { nombre: "Turkmenistan", codigo: "TC" },
  { nombre: "Turks and Caicos Islands (the)", codigo: "TV" },
  { nombre: "Tuvalu", codigo: "TR" },
  { nombre: "Uganda", codigo: "UG" },
  { nombre: "Ukraine", codigo: "UA" },
  { nombre: "United Arab Emirates (the)", codigo: "AE" },
  { nombre: "United Kingdom of Great Britain and Northern Ireland (the)", codigo: "GB" },
  { nombre: "United States Minor Outlying Islands (the)", codigo: "UM" },
  { nombre: "United States of America (the)", codigo: "US" },
  { nombre: "Uruguay", codigo: "UY" },
  { nombre: "Uzbekistan", codigo: "UZ" },
  { nombre: "Vanuatu", codigo: "VU" },
  { nombre: "Venezuela (Bolivarian Republic of)", codigo: "VE" },
  { nombre: "Viet Nam", codigo: "VN" },
  { nombre: "Virgin Islands (British)", codigo: "VG" },
  { nombre: "Virgin Islands (U.S.)", codigo: "VI" },
  { nombre: "Wallis and Futuna", codigo: "WF" },
  { nombre: "Western Sahara", codigo: "EH" },
  { nombre: "Yemen", codigo: "YE" },
  { nombre: "Zambia", codigo: "ZM" },
  { nombre: "Zimbabwe", codigo: "ZW" },
  { nombre: "Åland Islands", codigo: "AX" },];
  gpcSeleccionado: number;
  bricks: Bricks[] = []
  imgURL: string = './assets/images/no-image.png';
  imagenSelecionada: boolean;
  file: any = null;
  id: string;
  empresa: Empresa;
  productoBorrador: Producto;
  productoNuevo: ParamProducto;
  form: FormGroup
  nuevaMarca: boolean;
  eliminarMarcaSeleccionada: boolean
  nuevaSubMarca: boolean;
  eliminarSubMarcaSeleccionada: boolean;
  descripcionConcatenada = '';
  buscandoGPC: boolean
  fileImagen: File;
  codigoSeleccionadoValor: Codigo = new Codigo;
  codigoSeleccionado: boolean = false;
  modalRef: MatDialogRef<ModalSeleccionCodigoComponent | ModalAltaSiguienteComponent>;
  valido: boolean;
  codigos: Codigo[];
  constructor(private utilService: UtilService,
    private empresaService: EmpresaService,
    private config: AppConfig,
    private imageCompress: NgxImageCompressService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      marca: [null, Validators.required],
      nuevaMarca: [null],
      subMarca: [null],
      nuevaSubMarca: [null],
      descripcion: [null, Validators.required],
      variedad: [null],
      cantidad: [null, Validators.required],
      mercadoObjetivo: [[{ nombre: 'Uruguay', codigo: 'UY' }], Validators.required],
      gpc: [null, Validators.required],
      unidadMedida: [null, Validators.required],
      foto: [null],
      isActive: [null]
    })
  }

  ngOnInit(): void {
    this.empresaService.getEmpresa().subscribe(response => {
      this.empresa = response;
    })
    if (this.empresa != null) {
      const p1 = new Promise((resolve, reject) => {
        this.empresaService.infoAltaProducto(this.empresa.rut).subscribe((response) => {
          this.marcas = response.data.marcas;
          this.subMarcas = response.data.subMarcas;
          this.codigos = response.data.codigos
          resolve(true);
        }, error => {
          reject(true)
          this.toast.error("Error Inesperado");
          console.log(error);
        });
      });
      Promise.all([p1]).then((results) => {
        this.activatedRoute.params.subscribe(params => {
          this.id = params['id'];
        });

        if (this.id != undefined) {
          //Buscar el Producto como Borrador
          this.empresaService.obtenerProductoBorrador(this.empresa.rut, this.id).subscribe((response) => {
            this.productoBorrador = response.data;
            if (this.productoBorrador != null) {
              var marca = null, subMarca = null;
              if (this.productoBorrador.marca) {
                marca = this.marcas.filter(x => x.nombre.toLocaleUpperCase().includes(this.productoBorrador.marca.toLocaleUpperCase()))[0]
              }
              if (this.productoBorrador.subMarca) {
                subMarca = this.subMarcas.filter(x => x.nombre.toLocaleUpperCase().includes(this.productoBorrador.subMarca?.toLocaleUpperCase()))[0]
              }

              this.form = this.fb.group({
                marca: [marca, Validators.required],
                nuevaMarca: [null],
                subMarca: [subMarca],
                nuevaSubMarca: [null],
                descripcion: [this.productoBorrador.descripcion, Validators.required],
                variedad: [this.productoBorrador.variedad],
                cantidad: [this.productoBorrador.contenidoNeto?.cantidad, Validators.required],
                unidadMedida: [this.productoBorrador.contenidoNeto?.unidad, Validators.required],
                mercadoObjetivo: [this.productoBorrador.mercadoObjetivo, Validators.required],
                gpc: [this.productoBorrador.gpc, Validators.required],
                isActive: [this.productoBorrador.estado === 'Desarrollo']
              })
              this.descipcionConcatenadaProducto();
              this.obtenerGPCSelecionado()
              this.esBorrador = true;
              if (this.productoBorrador.foto != null) {
                this.imgURL = this.config.apiBucket + this.productoBorrador.foto;
                this.imagenSelecionada = true;
              }
            }
          }, error => {
            this.toast.error(error.error.data);
            console.log(error);
          })
        }

        if (this.codigos.length > 1) {
          this.seleccionarCodigo();
        } else {
          this.codigoSeleccionado = true;
          this.codigoSeleccionadoValor = this.codigos[0];
        }
      }).catch(error => {
        console.log(error)
        this.router.navigate(['/pagina/inicio']);
      });
    } else { this.router.navigate(['/pagina/inicio']); }
  }
  ngAfterViewInit() {
    this.form.valueChanges.subscribe(value => {
      this.descipcionConcatenadaProducto();
      this.siguientePaso();
    })
    this.form.controls['marca'].valueChanges.subscribe(value => {
      if (value.id == 0) {
        this.nuevaMarca = true;
        this.eliminarMarcaSeleccionada = false;
        this.form.get('nuevaMarca')?.setValue(null)
      } else {
        this.eliminarMarcaSeleccionada = true;
        this.nuevaMarca = false;
      }
    })

    this.form.controls['subMarca'].valueChanges.subscribe(value => {
      if (value.id == 0) {
        this.nuevaSubMarca = true;
        this.eliminarSubMarcaSeleccionada = false;
        this.form.get('nuevaSubMarca')?.setValue(null)
      } else {
        this.eliminarSubMarcaSeleccionada = true;
        this.nuevaSubMarca = false;
      }
    })

    this.form.controls['gpc'].valueChanges.subscribe(value => {
      if (value.length > 2) {
        this.buscarGPC(value);
      }
    })
  }
  cargarInfoEmpresa() {
    this.empresaService.getEmpresa().subscribe(response => {
      this.empresa = response;
    })
  }
  compararMarcasOSubMarcas(Param1: Marca, Param2: Marca): boolean {
    return (Param1 != null && Param2 != null) ? Param1.nombre.toUpperCase().includes(Param2.nombre.toLocaleUpperCase()) : false;
  }
  compararPaises(Param1: Pais, Param2: Pais): boolean {
    return Param1 && Param2 ? Param1.codigo.toUpperCase().includes(Param2.codigo.toLocaleUpperCase()) : false;
  }
  buscarGPC(filtro: string) {
    this.buscandoGPC = true;
    this.utilService.buscarGPCPorDescripcion(filtro).subscribe(response => {
      this.bricks = this.mapearBricks(response.data);
      this.buscandoGPC = false;
    })
  }
  obtenerGPCSelecionado() {
    this.gpcSeleccionado = this.form.get('gpc')?.value;
  }
  mapearBricks(bricks: any[]) {
    return bricks.map(x => new Bricks(x.brickCode, x.brickDescripcion));
  }

  descipcionConcatenadaProducto() {
    this.descripcionConcatenada = '';
    if (this.form.get('marca')?.value != null && this.form.get('marca')?.value.id != 0) {
      this.descripcionConcatenada += this.form.get('marca')?.value.nombre + ' ';
    }
    if (this.form.get('subMarca')?.value != null && this.form.get('subMarca')?.value.id != 0) {
      this.descripcionConcatenada += this.form.get('subMarca')?.value.nombre + ' ';
    }
    if (this.form.get('descripcion')?.value) {
      this.descripcionConcatenada += this.form.get('descripcion')?.value + ' ';
    }
    if (this.form.get('variedad')?.value) {
      this.descripcionConcatenada += this.form.get('variedad')?.value + ' ';
    }
    if (this.form.get('cantidad')?.value) {
      this.descripcionConcatenada += this.form.get('cantidad')?.value + ' '
    }
    if (this.form.get('unidadMedida')?.value) {
      this.descripcionConcatenada += this.form.get('unidadMedida')?.value + ' ';
    }
  }
  siguientePaso() {
    this.valido = this.form.valid && this.codigoSeleccionado;
  }
  adicionarMarca() {
    this.adicionarMarcaOSubMarca(true);
  }
  adicionarSubMarca() {
    this.adicionarMarcaOSubMarca(false);
  }
  adicionarMarcaOSubMarca(tipo: boolean) {
    if (tipo) {
      //marca
      this.empresaService.adicionarMarcaOSubMarca(this.empresa.rut, TipoAccion.Marca, this.form.get('nuevaMarca')?.value).subscribe((response) => {
        if (response.code == 200) {
          let nuevaMarcaAdicionar = new Marca(response.data, this.form.get('nuevaMarca')?.value)
          this.marcas.push(nuevaMarcaAdicionar);
          this.form.get('marca')?.setValue(nuevaMarcaAdicionar);
          this.eliminarMarcaSeleccionada = true;
          this.nuevaMarca = false;
        }
      }, error => {
        this.toast.error("Error", "Error 1");
        console.log(error)
      })
    } else {
      //SubMarca
      this.empresaService.adicionarMarcaOSubMarca(this.empresa.rut, TipoAccion.SubMarca, this.form.get('nuevaSubMarca')?.value).subscribe(response => {
        if (response.code == 200) {
          let nuevaMarca = new Marca(response.data, this.form.get('nuevaSubMarca')?.value)
          this.subMarcas.push(nuevaMarca)
          this.form.get('subMarca')?.setValue(nuevaMarca)
          this.eliminarSubMarcaSeleccionada = true;
          this.nuevaSubMarca = false;
        }
      }, error => {
        this.toast.error("Error", "Error 1");
        console.log(error)
      })
    }

  }
  eliminarMarca() {
    this.eliminarMarcaOSubMarca(true);
  }
  eliminarSubMarca() {
    this.eliminarMarcaOSubMarca(false);
  }
  eliminarMarcaOSubMarca(tipo: boolean) {
    if (tipo) {
      //marca
      this.empresaService.eliminarMarcaOSubMarca(this.empresa.rut, TipoAccion.Marca, this.form.get('marca')?.value.id).subscribe((response) => {
        console.log(response);
        if (response.code == 200) {
          this.marcas = response.data
          this.form.get('marca')?.setValue(null);
          this.eliminarMarcaSeleccionada = false;
        }
      }, error => {
        this.toast.error("Error", "Error 1");
        console.log(error)
      })
    } else {
      //SubMarca
      this.empresaService.eliminarMarcaOSubMarca(this.empresa.rut, TipoAccion.SubMarca, this.form.get('subMarca')?.value.id).subscribe(response => {
        console.log(response);
        if (response.code == 200) {
          this.subMarcas = response.data;
          this.form.get('subMarca')?.setValue(null);
          this.eliminarSubMarcaSeleccionada = false;
        }
      }, error => {
        this.toast.error("Error", "Error 1");
        console.log(error)
      })
    }

  }
  guardarProductoBorrador() {
    this.productoNuevo = this.parametrosAltaProducto();
    this.productoNuevo.estado = "Borrador";

    if (this.esBorrador) {
      this.productoNuevo.fechaCreacion = this.productoBorrador.fechaCreacion;
      if (this.productoBorrador.foto != null) { this.productoNuevo.foto = this.productoBorrador.foto; }
    }
    this.empresaService.altaProductoBorrador(this.empresa.rut, this.productoNuevo).subscribe((response) => {
      if (response.code == 200) {
        if (this.imagenSelecionada && response.data.foto == null) {
          this.cargarImagenProducto(response.data.id, true)
        }
        this.router.navigate(['/pagina/productos-borrador']);
      }
    }, error => {

      this.toast.error("Error Inesperado");
      console.log(error)
    })
  }
  generarProducto() {

    this.productoNuevo = this.parametrosAltaProducto();
    this.empresaService.altaProducto(this.empresa.rut, this.codigoSeleccionadoValor.codigo, this.productoNuevo).subscribe((response) => {
      if (response.code == 200) {
        let productoNuevo = response.data;
        if (this.imagenSelecionada) {
          this.cargarImagenProducto(productoNuevo.gtin, false);
        } else {

          this.router.navigate(['/pagina/producto-generado'], { queryParams: { gtin: productoNuevo.gtin }, replaceUrl: true });
        }
      }
      if (response.code == 400) {
        this.toast.success(response.data);
      }
    }, error => {

      this.toast.error("Error Inesperado");
      console.log(error)
    })
  }

  cargarImagenProducto(gtin: string, esBorrador: boolean) {

    if (this.fileImagen == null) { this.obtenerImagenSelecionada(); }
    this.empresaService.cargarImagenProducto(this.empresa.rut, gtin, esBorrador, this.fileImagen).subscribe((response) => {
      if (response.code == 200) {
        if (!esBorrador) {
          this.router.navigate(['/pagina/producto-generado'], { queryParams: { gtin: gtin }, skipLocationChange: true });
        } else {
          this.router.navigate(['/pagina/productos-borrador']);
        }
      }
    }, error => {
      this.toast.error("Error", "Error 1");
      console.log(error)
    })

  }
  parametrosAltaProducto(): ParamProducto {
    let productoNuevo: ParamProducto = new ParamProducto();
    productoNuevo.id = this.id;
    productoNuevo.descripcion = this.form.get('descripcion')?.value;
    productoNuevo.marca = this.form.get('marca')?.value.nombre;
    productoNuevo.subMarca = this.form.get('subMarca')?.value != null ? this.form.get('subMarca')?.value.nombre : null;
    productoNuevo.variedad = this.form.get('variedad')?.value;
    let contenidoNeto = new ContenidoNeto(this.form.get('cantidad')?.value, this.form.get('unidadMedida')?.value);
    productoNuevo.contenidoNeto = contenidoNeto;
    productoNuevo.gpc = this.form.get('gpc')?.value;
    productoNuevo.mercadoObjetivo = this.form.get('mercadoObjetivo')?.value;
    productoNuevo.estado = this.form.get('isActive')?.value ? "Desarrollo" : "Activo";
    return productoNuevo;
  }
  datosProducto(): Producto {
    let productoNuevo: Producto = new Producto();
    productoNuevo.descripcion = this.form.get('descripcion')?.value;
    productoNuevo.marca = this.form.get('marca')?.value.nombre;
    productoNuevo.subMarca = this.form.get('subMarca')?.value != null ? this.form.get('subMarca')?.value.nombre : null;
    productoNuevo.variedad = this.form.get('variedad')?.value;
    let contenidoNeto = new ContenidoNeto(this.form.get('cantidad')?.value, this.form.get('unidadMedida')?.value);
    productoNuevo.contenidoNeto = contenidoNeto;
    productoNuevo.gpc = this.form.get('gpc')?.value;
    productoNuevo.mercadoObjetivo = this.form.get('mercadoObjetivo')?.value;

    return productoNuevo;
  }
  getBase64Image(img: any) {
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var dataURL = canvas.toDataURL();
    return dataURL;
  }
  obtenerImagenSelecionada() {
    var imageBlob = this.getBase64Image(document.getElementById('imagen'));
    this.fileImagen = new File([imageBlob], 'imagenCargada', { type: 'image/png' });
  }
  onFileSelected(event: any) {
    if (event.target.files[0]) {
      var fileName: string;
      this.file = event.target.files[0];
      fileName = this.file['name'];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          var img = new Image();
          img.onload = () => {
            if ((img.height < 1000 || img.width < 1000)) {
              this.toast.error(
                'La foto tiene que tener dimensiones de 1000x1000 Mpx o superior',
                'OK',
              );
            } else {
              let localURL = event.target.result;
              this.compressImage(localURL, fileName, {
                type: this.file['type'],
                lastModified: this.file['lastModified']
              });
            }
          };
          if (reader.result) {
            img.src = reader.result.toString();
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    // Para que se pueda volver a subir una imagen subida
    // anteriormente pero que haya sido cancelada:
    this.imageChild.nativeElement.value = null;
  }

  compressImage(image: any, fileName: any, fileType: FilePropertyBag) {
    var orientation = -1;
    let size = new Blob([image]).size;
    if (size >= 5000000) {
      this.imageCompress.compressFile(image, orientation, 50, 50).then((result) => {
        this.imgURL = result;
        this.imagenSelecionada = true;
        var imageBlob = this.dataURItoBlob(result.split(',')[1], fileType);
        this.fileImagen = new File([imageBlob], fileName, { type: fileType.type });
      });
    } else if (size >= 3000000) {
      this.imageCompress.compressFile(image, orientation, 75, 75).then((result) => {
        this.imgURL = result;
        this.imagenSelecionada = true;
        const imageBlob = this.dataURItoBlob(result.split(',')[1], fileType);
        this.fileImagen = new File([imageBlob], fileName, { type: fileType.type });
      });
    } else {
      this.imageCompress.compressFile(image, orientation, 100, 100).then((result) => {
        this.imgURL = result;
        this.imagenSelecionada = true;
        const imageBlob = this.dataURItoBlob(result.split(',')[1], fileType);
        this.fileImagen = new File([imageBlob], fileName, { type: fileType.type });
      });
    }
  }

  dataURItoBlob(dataURI: string, fileType: BlobPropertyBag) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: fileType.type });
    return blob;
  }

  removeImage() {
    this.imgURL = '/assets/images/no-image-available.png';
  }

  seleccionarCodigo() {

    this.modalRef = this.dialog.open(ModalSeleccionCodigoComponent, {
      disableClose: true,
      data: {
        titleKey: 'Selección de Prefijos',
        codigos: this.codigos,
      },
    });

    this.modalRef.afterClosed().subscribe((result) => {
      if (result.botton) {
        this.codigoSeleccionado = true;
        this.codigoSeleccionadoValor = result.codigo;
        this.siguientePaso()
      } else {
        if (!this.codigoSeleccionado)
          this.router.navigate(['/pagina/inicio']);
      }
    });
  }

  siguiente() {
    this.modalRef = this.dialog.open(ModalAltaSiguienteComponent, {
      data: {
        titleKey: 'Verifique los Datos',
        descripcionConcatenada: this.descripcionConcatenada,
        gpcSeleccionado: this.gpcSeleccionado,
        imgURL: this.imgURL
      },
    });

    this.modalRef.afterClosed().subscribe((result) => {
      if (result == 'Borrador') {
        this.guardarProductoBorrador();
      }
      if (result == 'Alta') {
        this.generarProducto();
      }
    });
  }
}
