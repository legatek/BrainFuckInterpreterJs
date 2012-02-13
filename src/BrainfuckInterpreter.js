function BrainfuckInterpreter() {
  var _instructions;
  var _input;
  var dataCells = [30000];
  for (i = 0; i < 30000; i += 1) {
    dataCells[i] = 0;
  }
  var currentCellIndex = 0;
  var _currentInputIndex = 0;
  var _output = [];
  var _loopStartIndices = [];
  var _instrIndex = 0;
   
  return {
    run: function () {
      while(_instrIndex < _instructions.length)
      {
        switch (_instructions[_instrIndex]) {
          case '+':
            dataCells[currentCellIndex]++;          
          break;
          case '-':
            dataCells[currentCellIndex]--;
          break;
          case '>':
            currentCellIndex++;
          break;
          case '<':
            currentCellIndex--;
          break;
          case ',': // Accept a byte character from input
          // TODO: The input is used up at this point, there isn't a way to go backwards.
            dataCells[currentCellIndex] = _input[_currentInputIndex++].charCodeAt(0);
          break;
          case '.': // Output a byte from the current cell
            // Only outputs if it is a valid ASCII character
            if (dataCells[currentCellIndex] > 31 && dataCells[currentCellIndex] < 127)
            _output.push(String.fromCharCode(dataCells[currentCellIndex]));
          break;
          case '[':
            if (dataCells[currentCellIndex] == 0) {
              // Seek forward in the instructions to the matching closing bracket
              var match = false;
              while (!match) {
                match = _instructions[++_instrIndex] == ']';              
              }
            }
            else {
              _loopStartIndices.push(_instrIndex);
            }
          break;
          case ']':
            if (dataCells[currentCellIndex] != 0) {
              _instrIndex = _loopStartIndices[_loopStartIndices.length-1];
            }
            else
            {
              _loopStartIndices.pop(); // Exiting loop; remove the matching loopStartIndex
            }
          break;
        }
        _instrIndex++;
      }
    },
    currentCellValue: function() {
      return dataCells[currentCellIndex];
    },
    setInstructions: function(instructions) {
      _instructions = instructions;
    },
    setInput: function(input) {
      _input = input;
    },
    output: function() {
      return _output.join('');
    }    
  }    
};