

    
    /*
    
    License
    
    Copyright (c) 2023 Tanzania silivestir assey,wagunda isaac,Minja Ezekiel(Splannes).
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the right
    to use but not copy, modify, merge, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    ** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    ** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    ** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    ** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    ** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    ** SOFTWARE.
    
    
    
    
    
    *
    
    
    **/
    
    
    
    
    let [ezekiel,wagunda,assey]=["minja","isack","silivestir"]
    
    
    
    
    
    
    
    
    
    function tokenizer(input) {
    let current = 0;
    let tokens = [];
    
    while (current < input.length) {
    let char = input[current];
    
    if (/\s/.test(char)) {
    current++;
    continue;
    }
    
    const NUMBER_REGEX = /[0-9]/;
    if (NUMBER_REGEX.test(char)) {
    let value = '';
    while (NUMBER_REGEX.test(char)) {
    value += char;
    char = input[++current];
    }
    tokens.push({ type: 'number', value });
    continue;
    }
    
    const LETTER_REGEX = /#|[a-zA-Z]|,.+=-*\//;
    if (LETTER_REGEX.test(char)) {
    let value = '';
    while (LETTER_REGEX.test(char) || char === '#') {
    value += char;
    char = input[++current];
    }
    
    if (value.startsWith('#')) {
    tokens.push({ type: 'variable', value: value.substring(1) });
    } else if (value==='mwisho'||value==='kwenye'||value==='tafuta'||value === 'kazi' || value === 'onesha' || value=='wakati'||value === 'ikiwa' || value === 'kama'||value=='namba'||value=='sentensi'||value=='wakati') {
    tokens.push({ type: 'keyword', value });
    }
    else if (value==='++'||value==='--'||value==='*='||value==='-='||value==='/='){
    
    
    tokens.push({ type: 'DO', value });
    
    }
    
    
    
    
    else if (value === 'elementi') {
    
    tokens.push({ type: 'elementi', value });
    } else if (value === 'sikiliza') {
    tokens.push({ type: 'sikiliza', value });
    } else {
    tokens.push({ type: 'identifier', value });
    }
    
    continue;
    }
    
    const OPERATOR_REGEX = /[;:+\-*\/=(),<>{.#}"" \n  ]/;
    if (OPERATOR_REGEX.test(char)) {
    tokens.push({ type: 'operator', value: char });
    current++;
    continue;
    }
    
    
    throw new TypeError('Unknown character: ' + char );
    }
    
    return tokens;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function parser(tokens) {
    let current = 0;
    
    
    function parseExpression() {
    let token = tokens[current];
    
    
    
    
    
    
      if(tokens[current].type==='identifier' && tokens[current+1].value==='('){
    
    let args=''
    let name=tokens[current].value;
    
    current+=1;
    if(tokens[current].value=='('){
    current+=1;
    
    
     args=parseArgumentList()
    current++
    }
    current+=2;
    
    return{type:'funcCall',name,args}
    }
    
    
    
   else if (token.type === 'number' || token.type === 'variable'|| token.type==='identifier'||token.type==='"') {
    
    
    let value=''
    if(token.value==='"'){
    value+='"'
    current++
    while(token.value !=='"'){
    value=tokens[current].value
    current++
    }
    value+='"'
    
    
    }
    value=tokens[current].value
    
    
    current+=1;
    
    return { type: 'Literal',value };
    
    
    } 
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'onesha') {
    current++;
    
    let expression=""
    let isString=false
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    if(tokens[current].type==="identifier"){
    
    expression =parseExpression();}
    if(tokens[current].type==="operator" && tokens[current].value==='"'){
    expression=""
    isString=true;
    current++
    while(tokens[current].value!=='"'){
    
    expression+=tokens[current].value
    current++
    
    
    }
    current++
    
    }
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=1;
    
  return { type: 'PrintStatement', value:expression,isString};
    } else {
    throw new SyntaxError('Missing closing parenthesis  ');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    }
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'namba') {
    current++;
    let value,name=tokens[current].value;
    
    current++;
    
    
    if(tokens[current].value=="="){
    
    current++;
    
    value=tokens[current].value
    
    }
    current+=1
    
    return {type:'_D',name,value}
    }
    
    
    
    else if (token.type === 'keyword' && token.value === 'sentensi') {
    current++;
    let name=tokens[current].value;
    let string=""
    current++;
    
    let value
    if(tokens[current].value=="="){
    
    current++;
    }
    
    value=tokens[current].value
    
    
    if (value === '"') {
    
    current++
    
    
    while (tokens[current].value !== '"') {
    string += tokens[current].value
    
    
    current++
    
    }
    
    
    current+=1
    
    
    
    }
    
    
    return {type:'v',name:name,string}
    }
    
    
    
    
    
    
    else if (token.type === 'elementi' && token.value === 'elementi' ) {
    
    
    
    
    
    
    
    
    let elementMethod= token.value;
    current++
    if(tokens[current].value=="("){
    current++;
    
    
    
    let value=tokens[current].value
    
    
    
    if (value === '"') {
    
    
    let string = '';
    let selectorType=''
    
    while (tokens[current++] !== ',') {
    
    selectorType += tokens[current].value;
    
    
    
    break;
    
    }
    
    
    current+=1
    
    while (tokens[current++] !== '"' && tokens[current].value!=',') {
    
    string += tokens[current].value;
    
    
    
    break;
    
    
    
    }
    
    
    let strin,body,args
    
    let method=tokens[current + 3].value
    
    if(method=="."){
    current+=4;
    let methods=tokens[current].value
    if(tokens[current].value=='stailiRangi'||'kontentiNdani'||'kontenti'||'stailiRangiElementi'||'stailiUre'||'stailiUp'||'stailiMwonekano'||'sikilizaTukio'){
    let isD
    let valuex =tokens[current+2].value;
    if(valuex.startsWith('"')){
    isD=true;
    }
    
    if(tokens[current].value=='sikilizaTukio'){
    current+=2;
    
    let value=tokens[current].value
    
    let event="";
    if (value === '"') {
    
    while (tokens[current++] !== ',') {
    
    event+= tokens[current].value;
    
    
    
    break;
    
    }
    
    
    
    current+=1
    
    
    
    
    while (tokens[current++] !== '"' && tokens[current].value!=',') {
    
    
    
    
    break;
    
    
    
    }
    
    current++
    
    strin=tokens[current].value
    if(strin=="kazi"){
    current+=2;
    
    args=parseArgumentList()
    current+=2;
    body=parseExpression()
    
    
    
    
    
    
    
    
    current+=2
    
    
    
    }
    
    
    current+=3
    
    return {type:'elem',selectorType,args,body,event,string,}
    
    }}
    
    
    else{
    
    current+=8
    
    return { type:'Elementi',selectorType,string,methods,valuex}
    
    } 
    
    
    
    }
    
    
    else{
    
    
    
    
    
    
    return{   type:'El',selectorType,string,}
    
    
    }
    
    
    }
    
    
    
    }
    
    
    
    
    }
    
    }
    
    
    
    else if (token.type === 'keyword' && token.value === 'kazi') {
    
  
    current++;
    if (tokens[current].type === 'identifier') {
    let functionName = tokens[current].value;
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    let arguments = parseArgumentList();
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=2;
    
    
    let body=parseExpression();
   
    if(tokens[current].value=="}"){
   
    current+=2}
    return { type: 'FunctionDeclaration', name: functionName, arguments,body };
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } else {
    throw new SyntaxError('Missing function name');
    }
    }
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'chukua') {
    let url=""
    let method=""
    let meta=""
    let body=""
    
    
    
    current+=2;
    if(tokens[current].value=='"'){
    current++
    
    url+='"'
    while(tokens[current].value !=='"'){
    
    
    url+=tokens[current].value
    current++
    
    
    }
    
    url+='"'
    current+=2;
    }
    
    method=tokens[current].value;
    current+=2
    if(tokens[current].value=='{'){
    meta=''
    while(tokens[current].value!=='}'){
    
    meta+=tokens[current].value;
    current++
    
    
    
    }
    
    meta+='}'
    current+=2;
    body=tokens[current].value
    
    
    
    
    current+=2
    
    
    
    if(tokens[current].value=='.'){
    current+=5;
    
    let  args=parseArgumentList()
    current+=2
    let res=''
    if(tokens[current].type=='identifier' && (tokens[current+1].value=='.'||tokens[current].value=='=') && tokens[current].value==args){
    
    while(tokens[current].value!=='}'){
    
    
    res+=tokens[current].value
    
    current++
    }
    
    
    current+=2
    if(tokens[current].value=='.'){
    current+=5
    let  args2=parseArgumentList()
    
    current+=2
    
    if(tokens[current].type=='keyword' && tokens[current].value=='Data' && tokens[current+2].value=='=' && tokens[current+3].value==args2){
    current++
    let res2='var    ';
    while(tokens[current].value!=='}'){
    
    res2+=tokens[current].value
    current++
    
    }
    
    
    current+=2
    
    
    return{type:'fetch',url,method,meta,args,args2,body,res,res2,}
    
    
    
    
    }}}}}
    
    
    
    
    
    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'ikiwa') {
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current+=2
    
    let initName=tokens[current].value
    current+=2
    
    let initVal= tokens[current].value;
    
    let initialization=initName+ '='+ initVal;
    
    
    
    
    current+=2
    let condition=""
    while(tokens[current].value!==';'){
    condition += tokens[current].value;
    
    
    
    current++}
    
    current+=1
    let update =""
    while(tokens[current].value!==')'){
    
    
    update+=tokens[current].value
    current++}
    
    
    
    
    
    
    
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=2;
    
   
    let body = parseExpression();
    
    current++
    

    return { type: 'for',initialization,condition,update,body };
    } 
    
    
    else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    }
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'wakati') {
    let body=""
    current++;
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    
    
    
    let condition =""
    
    while(tokens[current].value!==')'){
    
    condition +=tokens[current].value
    current++}
    
    
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=2;
    
    
    body  = parseExpression();
   
    current+=3
    
    
    return { type: 'while', condition, body };
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } 
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'operator' && token.value === '(' && tokens[current+1].value!==')') {
    
    current+=1
    
    let condition=''
    while(tokens[current].value!==')'){
    condition+=tokens[current].value
    current++
    }
    
    current+=1
    
    let body
    
    if(tokens[current].value==='{'){
    current++
    body=parseExpression()
    
    }
    
    current++
    
    return{type:'ElseIf',body,condition}
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (tokens[current].type === 'operator' ) {
    
    current++
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'operator' && token.value === '(' && tokens[current+1].value===')') {
    
    current+=2
    let body
    
    if(tokens[current].value==='{'){
    current++
    body=parseExpression()
    
    }
    current++
    return{type:'Else',body}
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'kama') {
    
    current++;
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    
    
    
    let condition =""
    while(tokens[current].value!==')'){
    
    condition +=tokens[current].value
    current++
    }
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    
    current+=1;
    current++
    
    
    let body = parseExpression();
    
    
    
    
    current++
    return { type: 'IfStatement', condition:condition,body,};
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } 
    
    
    
    
    
    
    
    
    else {
    throw new SyntaxError('Unexpected token: ' + token.value);
    }
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    function parseArgumentList() {
    let arguments = [];
    
    while (tokens[current].type === 'identifier') {
    arguments.push(tokens[current].value);
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === ',') {
    current++;
    } else {
    break;
    }
    }
   // current++
    
    return arguments;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    function parseStatements() {
    let statements = [];
    
    
    while (current < tokens.length) {
    
    if (tokens[current].type === 'keyword' && tokens[current].value === 'onesha') {
    
    statements.push(parseExpression());
    }
    
    else if (tokens[current].type === 'DO') {
    
    statements.push(parseExpression());
    }
    
    
    
    
    
    
    
    else if (tokens[current].type === 'variable') {
    
    statements.push(parseExpression());
    }
    
    else if (tokens[current].type === 'identifier') {
    statements.push(parseExpression());
    }
    
    else if (tokens[current].value==='mwisho') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type==='operator'&&tokens[current].value===':') {
    statements.push(parseExpression());
    }
    
    
    else if ( tokens[current].type==='keyword' && tokens[current].value==='kwenye') {
    statements.push(parseExpression());
    }
    
    else if (tokens[current].type === 'identifier' && tokens[current+1].value=='(') {
   
    statements.push(parseExpression());
    
    }
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'kazi') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'operator') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'elementi' && tokens[current].value === 'elementi') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'sikiliza' && tokens[current].value === 'sikiliza') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'tafuta') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'identifier' && tokens[current].value === 'kwenye') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'namba') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'wakati') {
    statements.push(parseExpression());
    }
    
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'sentensi') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'ikiwa') {
    statements.push(parseExpression());
    } 
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'kama') {
    statements.push(parseExpression());
    } else {
    throw new SyntaxError('Unexpected token: ' + tokens[current].value);
    }
    }
    
    return statements;
    
    
    
    }
    
    
    return parseStatements();
    }
    
    
    
    
    
    
    
    
    
    function generateCode(ast) {
    
    
    let code = '';
    
    function traverse(node) {
    
   
    
    
    if(node.type=="Literal"){
    
   
    
    
    return code+=node.value;
    
    
    }
    
    else if(node.type=="PrintStatement"){
    if(node.isString){
    
    
   return code+=`  alert("${node.value}");`
    }else{
    
return code+=` alert(${node.value.value});`;
    
    }
    
    }
    
    
    else if(node.type=="_D"){
    
  
    
    return code+=`var ${node.name} =${node.value};`;
    }
    else if(node.type=="v"){
    
   
    
    return code+=`var ${node.name} ="${node.string}";`;
    

    }
    
    
    
    else if(node.type=="FunctionDeclaration"){
    
     
    return code += `function ${node.name}(${node.arguments.join(', ')}) {${traverse(node.body)}} ;`;
    
    }
    
    
    else if(node.type=="funcCall"){
    
   return code += ` ${node.name}(${node.args})`;
   
    
    }
    
    
    
    
    
    
    else if(node.type=="IfStatement"){
    let d=node.body
    
    
    return   code += `if (${node.condition}) {${traverse(node.body)}}`;
    }
    
    
    
    
    else if(node.type=="while"){
    
    
      return code += `while (${node.condition}) {${traverse(node.body)}
      x++}`;
    
   
    }
    
    
    
    
    else if(node.type=="fetch"){
    
    return code+= `fetch(${node.url}, {
    method: '${node.method}',
    headers:${node.meta},
    body: JSON.stringify(${node.body})
    })
    .then(${node.args}=> ${node.res}).then(${node.args2}=> {
    
    ${node.res2}
    })`
    
    
    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(node.type=="Elementi"){
    
    let m=node.methods
    
    let v=""
    v=node.valuex;
    
    
    let sel =node.selectorType;
    
    
    
    
    if(sel=="id"){
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="kontentiNdani"){
    
    
    res='innerHTML+='}
    else if(m=="kontenti"){
    res ='value'}
    else if(m=="sikilizaTukio"){
    
    }else {}
    
    if(m =="kontentiNdani"){
    
    return   code += `document.querySelector("#${node.string}").${res}${v}`;
    }else{
    
    return code +=`document.querySelector("#${node.string}").${res} "${v}"`;}
    }
    else if(sel=="class"){
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="sikilizaTukio"){
    
    }
    
    
    
    
    
    
    else if(m=="konteniNdani"){
    res='innerHTML='}
    else if(m=="kontenti"){
    res ='value'}else{
    }
    
    
    
    return   code += `document.querySelector(".${node.string}").${res}"${v}"`;
    
    }
    else if(sel=="name" ){
    
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="konteniNdani"){
    res='innerHTML +='}
    else if(m=="kontenti"){
    res ='value'}else{
    }
    
    
    return   code += `document.querySelector("${node.string}").${res}"${v}"`;
    
    }
    
    
    }
    
    else if(node.type=="elem"){
    if(node.selectorType=="id"){
    
    
    return code +=`document.querySelector("#${node.string}").addEventListener("${node.event}", function(${node.args.join(', ')}) {${traverse(node.body)}})`;
    }  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(node.type=="Else"){
    
    
    return  code += `else{${traverse(node.body)}}`;
    }
    
    
    
    
    else if(node.type=="ElseIf"){
    
    
    return code += `else if(${node.condition}){${traverse(node.body)}}`;
    
    
    }
    
    
    
    
    
    
    else if(node.type=="for"){
   
    
     return code += `for( var ${node.initialization} ; ${node.condition} ; ${node.update}) {${traverse(node.body)}}`;
    
    }
    
    
    
    
    
    
    
    else{
    
    
    // throw new Error('Unknown construct '+ 
    node.value
    
    }
    
    }
    
    
    ast.forEach(statement => {
    traverse(statement);
    });
    
    return code;
    }
    
    
    
    
    
    
    /*
    
    // Function to compile Kiswahili Script code
    function compileKiswahiliScript(input) {
    
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    let codex=generateCode(ast)
    eval(codex)
    }
    
    // Function to handle Kiswahili Script tags
    function handleKiswahiliScriptTags() {
    const kiswahiliScriptTags = document.querySelectorAll('kiswahiliscript');
    
    kiswahiliScriptTags.forEach(tag => {
    const src = tag.getAttribute('src');
    
    if (src) {
    
    
    fetch(src)
    .then(response => response.text())
    .then(input => compileKiswahiliScript(input))
    .catch(error => console.error("Error loading .kiss file:", error));
    } else {
    // Compile code from the tag's content
    const input = tag.textContent;
    compileKiswahiliScript(input);
    }
    });
    }
    
    
    handleKiswahiliScriptTags();
    
    //for now
    */
    
    
    
    var lineNumbers,lineNumbersHTML,i
    
    
    
    
    
    var outputArea = document.querySelector('#output');
    var codeInput = document.querySelector('.code-input');
    lineNumbers = document.querySelector('.line-numbers');
    var runButton = document.querySelector('.run-button');
    var editButton = document.querySelector('.edit-button');
    
    
    
    
    function xxxx() {
    
    // document.querySelector('#output').style.display="none";
    var lines = codeInput.value.split('\n');
    lineNumbersHTML = '';
    for ( i = 0; i < lines.length; i++) {
    lineNumbersHTML += (i + 1) + '<br>';
    }
    lineNumbers.innerHTML = lineNumbersHTML;
    
    
    
    }
    
    
    
    
    
    
    /*
    
    var runButton = document.querySelector('.run-button')
    
    
    runButton.addEventListener("click",function(){
    
    let input=document.querySelector('.code-input').value;
    
    
    try{
    
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    let codex=generateCode(ast)
    var xxx=  document.querySelector("#output")
    eval(codex)
    }
    catch (error) {
    document.getElementById('output').innerHTML = `<p style="color:red ;position:relative;margin-left:30px;">Error  at position arround line number <span class='a'>${i} </span>  : ${error.message} </p>`;
    }
    
    
    
    })
    
    
    
    document.querySelector('.edit-button').addEventListener("click",function(){
    
    document.querySelector('.code-input').focus();
    
    
    
    })
    
    
    */
    
    
    
    function a(){
    
    
    const declarations = document.getElementById('declarations').value
   
    
    
    if(declarations==="function"){
    
    
    document.querySelector('.code-input').value=`kazi assey(){
    onesha("hello Tanzania naandika kiswahiliscript programm na")
    };
    
    `
    
    }
    
    
    if(declarations==="number"){
    
    
    document.querySelector('.code-input').value=`
    
    
    namba mwaka=2023
    
    onesha(mwaka)
    
    `
    
    }
    
    
    if(declarations==="variable"){
    
    
    document.querySelector('.code-input').value=`
    
    
    sentensi name="Alice"
    
    onesha(name)
    
    `
    
    }
    
    
    xxxx()
    
    
    }
    
    
    
    
    function b(){
    
    const calling = document.getElementById('calling').value
    
    
    
    if(calling==="functionCall"){
    
    
    document.querySelector('.code-input').value+=` \n assey()`
    
    }
    
    if(calling==="onesha"){
    document.querySelector('.code-input').value+=` \n onesha("hay sisi ni Splannes Team tunafanya kiswahiliscript na isaac,Ezekiel,Rama")`
    }
    
    xxxx()
    }
    
    
    
    
    
    
    
    
    function c(){
    
    const ikiwa= document.getElementById('iterations').value
    
    
    
    
    
    
    
    
    if(ikiwa==="ikiwa"){
    
    
    document.querySelector('.code-input').value=`ikiwa(namba a=0;a<10;a++){
    onesha(a)
    }`
    
    }
    
    
    
    
    
    
    
    if(ikiwa==="wakati"){
    
    
    document.querySelector('.code-input').value=`namba x=278
    wakati(x<1000){
    
    
    onesha(x)}
    
    `
    
    }
    
    
    xxxx()
    }
    function d(){
    
    const api = document.getElementById('api').value
    if(api==="chukua api"){
    
    document.querySelector('.code-input').value=`chukua("https://www.openai.com/chatgpt",POST,{vontent-Type:json},body).halafu(kazi(res){
    
    res.json() }).halafu(kazi(data){
    Data text=data.choices[0].message
    })
    onesha(text)
    `
    
    }
    
    xxxx()
    }
    function e(){
    
    const conditions = document.getElementById('conditions').value
    if(conditions==="if"){
    
    
    document.querySelector('.code-input').value=`
    namba mwaka=2023
    kama(mwaka===2023){
    onesha("hello Tanzania")
    }`
    
    }
    if(conditions==="if else"){
    
    
    document.querySelector('.code-input').value=`namba y=278
    kama(y===278){
    onesha("alice")
    }
    (){
    onesha("bob")
    }
    
    `
    
    }
    
    if(conditions==="if else if else"){
    
    
    document.querySelector('.code-input').value=`namba y=278
    kama(y===278){
    onesha("alice")
    }
    (y>1000){
    onesha("bob na alice! hellooo")
    }
    (){
    onesha("karibu bongo")
    
    }
    
    
    `
    
    }
    
    
    xxxx()
    
    
    }
    function f(){
    
    const dom = document.getElementById('dom').value
    if(dom==="color"){
    document.querySelector('.code-input').value=`elementi("id,output").stailiRangiElementi(navy)`
    }
    
    xxxx()}
    
    
    
    
    
    
    var runButton = document.querySelector('.run-button')
    
    
    runButton.addEventListener("click",function(){
    //  var outputArea = document.querySelector('.output-area');
    
    
    
    
    
    
    let input=document.querySelector('.code-input').value;
    
    
    try{
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Function to compile Kiswahili Script code
    
    
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    let codex=generateCode(ast)
    eval(codex)
    
    
    
    
    
    
    
    
    
    
    
    }
    catch (error) {
    document.getElementById('output').innerHTML = `<p style="color:red ;position:relative;margin-left:30px;">Error  at position arround line number <span class='a'>${i} </span>  : ${error.message} </p>`;
    }
    
    
    
    })
    
    
    
    document.querySelector('.edit-button').addEventListener("click",function(){
    
    document.querySelector('.code-input').focus();
    
    
    
    })
    
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    