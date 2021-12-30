import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CalculatorApp';

  charArray = [['%', 'C', 'OFF', 'ON'], ['1', '2', '3', '+'], ['4', '5', '6', '-'], ['7', '8', '9', 'X'], ['0', '.', '=', '/']]
  buttonPressed? :string;
  toptextInScreen = '';
  bottomtextInScreen = '';
  computedResult = false



  computeCalculation(arrs: any[], signs: string[], n: number) {
    if (arrs.length == 1) {return}

    if (n == signs.length) { return}

    
    if (signs[n] == '%') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i].toString().includes('%')) {
                if (isNaN(arrs[i - 1])) {return}
                else {
                    arrs[i - 1] = +arrs[i - 1] / Math.pow(100, arrs[i].length)
                    arrs.splice(i, 1)
                }
            }
        }
    } else if (signs[n] == '/') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] == '/') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {return}
                else {
                    arrs[i - 1] = + arrs[i - 1] / (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } else if (signs[n] == 'X') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] == 'X') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {return}
                else {
                    arrs[i - 1] = + arrs[i - 1] * (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } else if (signs[n] == '-') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] == '-') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {
                    if (i == 0) {
                        arrs[0] = 0 - (+ arrs[1])
                        arrs.splice(1,1)
                    } else {return}
                }
                else {
                    arrs[i - 1] = + arrs[i - 1] - (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } 
    else if (signs[n] == '+') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] == '+') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {
                    if (i == 0) {
                        arrs[0] = (+ arrs[1])
                        arrs.splice(1,1)
                    } else {return}
                }
                else {
                    arrs[i - 1] = + arrs[i - 1] + (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } 
    console.log(arrs)
    this.computeCalculation(arrs, signs, n + 1)
    
}


  onbuttonClick(k: string) {
    console.log("You clicked " + k) 
    this.buttonPressed = k;

    let operators = ['+', '-', 'X', '/']
    let numbers = ['1', '2', '3','4', '5', '6', '7', '8', '9','0']

    if (this.computedResult == true && this.bottomtextInScreen != 'Syntax Error' && ['+', '-', 'X', '/', '%'].includes(k)) {
      this.toptextInScreen = this.bottomtextInScreen
    }
    
    this.toptextInScreen = this.toptextInScreen + k;
   
    if (k == 'OFF') {
      this.toptextInScreen = ''
      this.bottomtextInScreen = ''
      this.computedResult = false
      return;
    }

    if (k == 'ON') {
      this.toptextInScreen = ''
      this.bottomtextInScreen = '0'
      this.computedResult = false
      return;
    }

    if (k == 'C') {
      this.toptextInScreen = ''
      this.bottomtextInScreen = '0'
      this.computedResult = false
      return;
    }

    if (k == '=') {
      console.log(this.toptextInScreen)
      if (['%', 'X', '/'].includes(this.toptextInScreen[0])) {
        this.bottomtextInScreen = 'Syntax Error'
        return
      }
  
      if (['X', '/', '+', '-', '.'].includes(this.toptextInScreen[-1])) {
        this.bottomtextInScreen = 'Syntax Error'
        return
      }
  
      let arr = []
      let strOfnum = ''
      for (let i =0; i < this.toptextInScreen.length; i++) {
        if (this.toptextInScreen[i] == '%') {
          if (this.toptextInScreen[i - 1] != '%' && (!(numbers.includes(this.toptextInScreen[i-1])) || (numbers.includes(this.toptextInScreen[i+1])))) {
          this.bottomtextInScreen = 'Syntax Error'
          return
        } else {
          if (numbers.includes(this.toptextInScreen[i-1])) {
            
            strOfnum != '' ? arr.push(strOfnum) : strOfnum = this.toptextInScreen[i]
            strOfnum = this.toptextInScreen[i]
          } else {
            strOfnum = strOfnum + this.toptextInScreen[i]
          }
        }
      }
  
        if (numbers.includes(this.toptextInScreen[i])) {
          if (!(numbers.includes(this.toptextInScreen[i-1])) && this.toptextInScreen[i-1] != '.') {
            
            strOfnum != '' ? arr.push(strOfnum) : strOfnum = this.toptextInScreen[i]
            strOfnum = this.toptextInScreen[i]
          } else {
            strOfnum = strOfnum + this.toptextInScreen[i]
          }
        }
        
  
        if (operators.includes(this.toptextInScreen[i])) {
          if (operators.includes(this.toptextInScreen[i - 1])) {
            this.bottomtextInScreen = 'Syntax Error'
            return
          } else {
            
            strOfnum != '' ? arr.push(strOfnum) : strOfnum = this.toptextInScreen[i]
            strOfnum = this.toptextInScreen[i]
          }
        }
  
        if (this.toptextInScreen[i] == '.') {
          if (this.toptextInScreen[i-1] == '.') {
            this.bottomtextInScreen = 'Syntax Error'
            return
          }
         else {
          if (numbers.includes(this.toptextInScreen[i-1])) {
            strOfnum = strOfnum + this.toptextInScreen[i]
          } else {
            
            strOfnum != '' ? arr.push(strOfnum) : strOfnum = this.toptextInScreen[i]
            strOfnum = this.toptextInScreen[i]
          }
        }
        
      }

    } arr.push(strOfnum)

      console.log("After Loop: " )
      console.log(arr)

      this.computeCalculation(arr, ['%', '/', 'X', '-', '+'], 0)

      console.log(arr);
      arr.length > 1 ? this.bottomtextInScreen = 'Syntax Error' : this.bottomtextInScreen = arr[0].toString();


      this.computedResult = true
    }
    
    

    
    
    
  }
}
