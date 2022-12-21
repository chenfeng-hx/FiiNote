// 获取元素
var text = document.querySelectorAll('input');
var submit = document.querySelectorAll('button');
var user_input = "";     //用户输入的内容
var user_input_lower = "";    //用户输入内容转化为小写
var plaintext = "";   // 明文
var cryptograph = "";   // 密文
var alphabet_lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//var alphabet_upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var chars = [];   //存放字母对象

//构造字母对象
function ch(character, status){
    this.character = character;
    this.status = status;
}

// 判断是：大写字母返回 1，小写字母返回 0
function status_if(char_index){
    return (65 <= user_input.charCodeAt(char_index) && user_input.charCodeAt(char_index) <= 90)? 1 : 0;
}

// 绑定事件
text[0].addEventListener('blur', function(){
    user_input = text[0].value;
    user_input_lower = user_input.toLowerCase();     //转化为小写
    //console.log(user_input);
    // 防止用户没有输入
    if(user_input != ""){
        for(var i = 0; i < user_input.length; i++){
            chars[i] = ch(user_input[i], status_if(i));
            console.log(chars[i].character, chars[i].status);
        }
    }
});

// 后面第三个字符代替(只需要获取到输入的字符串对应位置字母的ASCLL码，进行加减三操作即可)
submit[0].addEventListener('click', function(){
    plaintext = "";   //初始化
    for(var i = 0; i < user_input.length; i++){
        if(65 <= user_input.charCodeAt(i) && user_input.charCodeAt(i) <= 90 ){
            chars[i] = ch(user_input_lower[i], 1);
        } else{
            chars[i] = ch(user_input_lower[i], 0);
        }
        var j = alphabet.indexOf(user_input[i]);
        //console.log(j);
        //j = ((j + 1 + 26 - 3) % 26) - 1;
        //j = j > 0? j : (j + 26) % 25;   // 去除j-1=-1的情况  error
        j = j - 3 > 0? j - 3 : (j - 3 + 26) % 26;
        //console.log(j);
        plaintext += alphabet[j];
    };
    //判断状态进行加32操作

    //console.log(plaintext);
    text[1].value = plaintext;
});

submit[1].addEventListener('click', function(){
    cryptograph = "";    //初始化
    for(var i = 0; i < user_input.length; i++){
        var alphabet = (65 <= user_input.charCodeAt(i) && user_input.charCodeAt(i) <= 90 )? alphabet_upper : alphabet_lower;
        var j = alphabet.indexOf(user_input[i]);
        j = (j + 3) % 26;
        cryptograph += alphabet[j];
    }
    //console.log(cryptograph);
    text[2].value = cryptograph;
})


//我的设想：将每一个字母存为一个对象，有值（转化为小写或大写），状态：1表示原值为大写，0表示原值为小写，
//可以在转换后加上一个固定值将其进行转换，减少时间复杂度