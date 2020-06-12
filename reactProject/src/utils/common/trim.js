const reg = /^\s+|\s+$/g

export function trim(str){
   return str.replace(reg,"");
}