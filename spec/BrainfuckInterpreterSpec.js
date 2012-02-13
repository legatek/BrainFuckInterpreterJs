describe("BrainfuckInterpreter", function() {
  var brainfuckInterpreter;
  var input;
  
  beforeEach(function() {
    brainfuckInterpreter = new BrainfuckInterpreter();
  });
   
  it("should be able to increment the value of a cell", function() {
    brainfuckInterpreter.setInstructions("+");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(1);        
  });
  
  it("should be able to decrement a value of a cell", function() {
    brainfuckInterpreter.setInstructions("+++-");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(2);
  });
  
  it("should be able to advance to the next data cell", function() {
    brainfuckInterpreter.setInstructions("++>+");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(1);
  });

  it("should be able to retreat to the previous data cell", function() {
    brainfuckInterpreter.setInstructions(">++<+");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(1);
  });
  
  it("should be able to retrieve a byte value from input and store it in a data cell", function() {
    brainfuckInterpreter.setInstructions(",");
    brainfuckInterpreter.setInput("!");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(33);      
  });
  
  it("should be able to output a byte value from a data cell to output (an ASCII value is returned)", function() {
    brainfuckInterpreter.setInstructions(",.");
    brainfuckInterpreter.setInput("A");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.output()).toEqual("A");
  });
  
  it("should be able to process a loop", function() {
    brainfuckInterpreter.setInstructions(",[.-]");
    brainfuckInterpreter.setInput("&");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.output()).toEqual("&%$#\"! ");
  });
  
  it("should support nested loops", function() {
    // Multiples 3 * 4
    brainfuckInterpreter.setInstructions("+++[>++++[>+<-]<-]>>");
    brainfuckInterpreter.run();
    expect(brainfuckInterpreter.currentCellValue()).toEqual(12);
  });  
});