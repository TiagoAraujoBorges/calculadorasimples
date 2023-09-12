const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator {
    constructor (previusOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = "";
}


    // adicionando digitos a calculadora
addDigit(digit) {
    // verificando se a operaçao ja possui um ponto (.)

    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return ;
    }

    this.currentOperation = digit;
    this.updateScreen();
}

    // processando todas as operaçoes da calculadora

    processOperation(operation) {

    //primeiro checamos o currentvalue para saber se esta vazio
    if(this.currentOperationText.innerText === "" && operation !== "LIMPAR") {
    // mudança de operação
        if(this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;     
    }

    //pegando o valor atual e o anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation,current, previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation,current, previous);
            break;

        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation,current, previous);
            break;

        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation,current, previous);
            break;
        case "DELETE":
            this.processDelOperator();
            break;
        case "VOLTAR":
            this.processClearCurrentOperator();
            break;
        case "LIMPAR":
            this.processClearOperator();
            break;
        case "=":
            this.processEqualOperator();
            break;
              default:
                return;
    }
}
// mudando os valores na tela
updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null,
    ) {

    if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
    } else { 

    // checagem se o valor é zero, se sim adicionado ao valor atual.

    if(previous === 0) {
        operationValue = current;
    }

    // adicionando o valor atual para o anterior
    
    this.previousOperationText.innerText = `${operationValue} ${operation}`
    this.currentOperationText.innerText = "";

    }
}

    // mudança de operações matemáticas

    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

// deletando os últimos digitos
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // limpando a operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // limpando todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processando as operações com = //
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}


const calc = new calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        }else {
            calc.processOperation(value);
        } 
    });

});