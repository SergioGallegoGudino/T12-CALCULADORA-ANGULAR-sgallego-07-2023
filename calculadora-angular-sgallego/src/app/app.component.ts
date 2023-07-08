import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

// Importamos la librería mathjs para realizar las operaciones. A diferencia de la calculadora DOM, aquí
// utilizaremos una librería para que nos haga los calculos de forma automatica

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-angular-sgallego';

  // Creamos dos variables, la primera será todos los números y signos que introduzcamos y la segunda será el resultado
  // de la operación que introduzcamos de forma automática, sin darle al = 
  // Como evaluate calcula una operación a partir de un string y devuelve un valor number, haremos que las variables sean de tipo any
  pantalla:any = "0";
  total:any = "0";

  // Creamos un método que, al hacer click, compruebe el valor del boton 
  comprobarBoton(boton: string){
    // Si el valor es DEL, reiniciaremos ambas variables a 0
    if(boton == "DEL"){
      this.pantalla = "0";
      this.total = "0";
    // Si el boton es =, realizaremos las operaciones en pantalla mediante el método evaluate
    } else if(boton == "="){
      // Pondremos una cadena de texto vacía para asegurarnos de que trate toda la información como string. Esto se hace porque total evaluará el resultado de pantalla, que es una cadena de numeros, lo cual haría que de un error
      this.pantalla = "" + math.evaluate(this.pantalla);
      this.total = "" + math.evaluate(this.pantalla);
    } else{
      // Si el número introducido es 0 y la operación no comienza con "0.", quitaremos el 0 de la operación
      if(this.pantalla === "0" && boton != "."){
        this.pantalla = boton;
        this.total = math.evaluate(this.pantalla);
      } else if(boton=="/" || boton=="+" || boton =="-" || boton=="*"){
        // Si el boton es una operación, no llamaremos al método evaluate y simplemente lo añadiremos a la pantalla, de otra forma daría un error de calculo
        this.pantalla += boton;
      } else{
        // En cualquier otro caso se tratará de un número o una coma
        this.pantalla += boton;
        this.total = math.evaluate(this.pantalla);
      } 
    }
  }

}
